import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intervention } from './entities/intervention.entity';
import { InterventionAssignment } from './entities/intervention-assignment.entity';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateInterventionDto } from './dto/update-intervention.dto';
import { InterventionStatus } from './entities/intervention.entity';
import { NotificationSchedulerService } from '../notifications/services/notification-scheduler.service';

@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private interventionRepository: Repository<Intervention>,
    @InjectRepository(InterventionAssignment)
    private assignmentRepository: Repository<InterventionAssignment>,
    private notificationScheduler: NotificationSchedulerService,
  ) {}

  async create(
    createInterventionDto: CreateInterventionDto,
  ): Promise<Intervention> {
    const intervention = this.interventionRepository.create(createInterventionDto);
    const saved = await this.interventionRepository.save(intervention);

    // Assigner les utilisateurs si fournis
    if (createInterventionDto.assignedUserIds?.length) {
      await this.assignUsers(saved.id, createInterventionDto.assignedUserIds);
      
      // Notifier les utilisateurs assignés
      for (const userId of createInterventionDto.assignedUserIds) {
        await this.notificationScheduler.notifyNewAssignment(
          userId,
          saved.id,
          saved.name,
        );
      }
    }

    return this.findOne(saved.id);
  }

  async findAll(filters?: {
    status?: InterventionStatus;
    rdcId?: string;
    ceId?: string;
    worksiteId?: string;
    perimeterId?: string;
  }): Promise<Intervention[]> {
    const where: any = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.rdcId) where.rdcId = filters.rdcId;
    if (filters?.ceId) where.ceId = filters.ceId;
    if (filters?.worksiteId) where.worksiteId = filters.worksiteId;

    let query = this.interventionRepository
      .createQueryBuilder('intervention')
      .leftJoinAndSelect('intervention.site', 'site')
      .leftJoinAndSelect('intervention.rdc', 'rdc')
      .leftJoinAndSelect('rdc.profile', 'rdcProfile')
      .leftJoinAndSelect('intervention.ce', 'ce')
      .leftJoinAndSelect('ce.profile', 'ceProfile')
      .leftJoinAndSelect('intervention.responsible', 'responsible')
      .leftJoinAndSelect('responsible.profile', 'responsibleProfile')
      .leftJoinAndSelect('intervention.worksite', 'worksite')
      .leftJoinAndSelect('intervention.assignedUsers', 'assignedUsers')
      .leftJoinAndSelect('assignedUsers.profile', 'assignedUsersProfile')
      .leftJoinAndSelect('assignedUsers.perimeter', 'assignedUsersPerimeter');

    // Appliquer les filtres de base
    if (filters?.status) {
      query = query.andWhere('intervention.status = :status', { status: filters.status });
    }
    if (filters?.rdcId) {
      query = query.andWhere('intervention.rdcId = :rdcId', { rdcId: filters.rdcId });
    }
    if (filters?.ceId) {
      query = query.andWhere('intervention.ceId = :ceId', { ceId: filters.ceId });
    }
    if (filters?.worksiteId) {
      query = query.andWhere('intervention.worksiteId = :worksiteId', { worksiteId: filters.worksiteId });
    }

    // Filtrer par périmètre si spécifié
    if (filters?.perimeterId) {
      query = query.andWhere(
        '(rdc.perimeterId = :perimeterId OR ce.perimeterId = :perimeterId OR responsible.perimeterId = :perimeterId OR assignedUsers.perimeterId = :perimeterId)',
        { perimeterId: filters.perimeterId }
      );
    }

    return query.orderBy('intervention.createdAt', 'DESC').getMany();
  }

  async findOne(id: string): Promise<Intervention> {
    const intervention = await this.interventionRepository.findOne({
      where: { id },
      relations: [
        'site',
        'rdc',
        'rdc.profile',
        'ce',
        'ce.profile',
        'responsible',
        'responsible.profile',
        'worksite',
        'assignedUsers',
        'assignedUsers.profile',
        'assignedUsers.perimeter',
      ],
    });
    if (!intervention) {
      throw new NotFoundException(`Intervention with ID ${id} not found`);
    }
    return intervention;
  }

  async update(
    id: string,
    updateInterventionDto: UpdateInterventionDto,
  ): Promise<Intervention> {
    const intervention = await this.findOne(id);
    Object.assign(intervention, updateInterventionDto);

    if (updateInterventionDto.assignedUserIds) {
      // Supprimer les anciennes assignations
      await this.assignmentRepository.delete({ interventionId: id });
      // Créer les nouvelles assignations
      await this.assignUsers(id, updateInterventionDto.assignedUserIds);
    }

    return this.interventionRepository.save(intervention);
  }

  async remove(id: string): Promise<void> {
    const intervention = await this.findOne(id);
    await this.interventionRepository.remove(intervention);
  }

  async assignUsers(
    interventionId: string,
    userIds: string[],
  ): Promise<void> {
    const assignments = userIds.map((userId) =>
      this.assignmentRepository.create({
        interventionId,
        userId,
        role: 'Intervenant' as any,
      }),
    );
    await this.assignmentRepository.save(assignments);
  }

  async updateProgress(
    id: string,
    progress: number,
  ): Promise<Intervention> {
    const intervention = await this.findOne(id);
    intervention.progress = progress;
    if (intervention.amount && progress >= 0 && progress <= 100) {
      intervention.remainingAmount =
        intervention.amount * (1 - progress / 100);
    }
    return this.interventionRepository.save(intervention);
  }

  async updateStatus(
    id: string,
    status: InterventionStatus,
  ): Promise<Intervention> {
    const intervention = await this.findOne(id);
    const oldStatus = intervention.status;
    intervention.status = status;

    if (status === InterventionStatus.LAUNCHED && !intervention.actualStartDate) {
      intervention.actualStartDate = new Date();
    }
    if (
      status === InterventionStatus.COMPLETED &&
      !intervention.actualEndDate
    ) {
      intervention.actualEndDate = new Date();
    }

    const saved = await this.interventionRepository.save(intervention);

    // Notifier les utilisateurs assignés du changement de statut
    if (oldStatus !== status && intervention.assignedUsers) {
      for (const user of intervention.assignedUsers) {
        await this.notificationScheduler.notifyInterventionStatusChange(
          user.id,
          id,
          intervention.name,
          status,
        );
      }
    }

    return saved;
  }
}
