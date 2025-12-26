import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Intervention, InterventionStatus } from '../interventions/entities/intervention.entity';
import { Absence } from '../absences/entities/absence.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(Intervention)
    private interventionRepository: Repository<Intervention>,
    @InjectRepository(Absence)
    private absenceRepository: Repository<Absence>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getPlanning(
    startDate: Date,
    endDate: Date,
    filters?: {
      userId?: string;
      rdcId?: string;
      worksiteId?: string;
    },
  ) {
    const interventions = await this.interventionRepository.find({
      where: {
        plannedStartDate: Between(startDate, endDate),
        ...(filters?.userId
          ? { assignedUsers: { id: filters.userId } }
          : {}),
        ...(filters?.rdcId ? { rdcId: filters.rdcId } : {}),
        ...(filters?.worksiteId ? { worksiteId: filters.worksiteId } : {}),
      },
      relations: ['site', 'rdc', 'ce', 'responsible', 'assignedUsers'],
    });

    const absences = await this.absenceRepository.find({
      where: {
        startDate: Between(startDate, endDate),
        status: 'approved' as any,
        ...(filters?.userId ? { userId: filters.userId } : {}),
      },
      relations: ['user'],
    });

    return {
      interventions,
      absences,
      dateRange: { startDate, endDate },
    };
  }

  async getDailyPlanning(date: Date, filters?: { userId?: string; rdcId?: string }) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.getPlanning(startOfDay, endOfDay, filters);
  }

  async getAvailableUsers(date: Date, perimeterId?: string): Promise<User[]> {
    // Récupérer les utilisateurs disponibles (non en congé, non affectés à une intervention)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const absences = await this.absenceRepository.find({
      where: {
        startDate: Between(startOfDay, endOfDay),
        status: 'approved' as any,
      },
    });

    const absentUserIds = absences.map((a) => a.userId);

    const interventions = await this.interventionRepository
      .createQueryBuilder('intervention')
      .leftJoin('intervention.assignedUsers', 'user')
      .where('intervention.plannedStartDate <= :endDate', { endDate: endOfDay })
      .andWhere('intervention.plannedEndDate >= :startDate', { startDate: startOfDay })
      .andWhere('intervention.status != :status', { status: InterventionStatus.CANCELLED })
      .getMany();

    const assignedUserIds = new Set<string>();
    interventions.forEach((intervention) => {
      intervention.assignedUsers?.forEach((user) => {
        assignedUserIds.add(user.id);
      });
    });

    const where: any = {};
    if (perimeterId) where.perimeterId = perimeterId;
    where.isActive = true;

    const allUsers = await this.userRepository.find({
      where,
      relations: ['profile'],
    });

    return allUsers.filter(
      (user) => !absentUserIds.includes(user.id) && !assignedUserIds.has(user.id),
    );
  }
}
