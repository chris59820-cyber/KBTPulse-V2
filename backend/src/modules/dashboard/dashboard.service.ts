import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Worksite } from '../worksites/entities/worksite.entity';
import { Intervention } from '../interventions/entities/intervention.entity';
import { Material } from '../materials/entities/material.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Document } from '../documents/entities/document.entity';
import { LessThanOrEqual } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Worksite)
    private worksiteRepository: Repository<Worksite>,
    @InjectRepository(Intervention)
    private interventionRepository: Repository<Intervention>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async getDashboardStats(perimeterId?: string) {
    const usersWhere: any = { isActive: true };
    if (perimeterId) usersWhere.perimeterId = perimeterId;

    const users = await this.userRepository.find({ where: usersWhere });
    const worksites = await this.worksiteRepository.find();
    const interventions = await this.interventionRepository.find();
    const materials = await this.materialRepository.find();
    const vehicles = await this.vehicleRepository.find();

    // Statistiques des interventions par statut
    const interventionsByStatus = interventions.reduce(
      (acc, intervention) => {
        acc[intervention.status] = (acc[intervention.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Documents expirant (dans les 30 prochains jours)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    const expiringDocuments = await this.documentRepository.count({
      where: {
        expirationDate: LessThanOrEqual(expirationDate),
      },
    });

    return {
      users: {
        total: users.length,
        byFunction: this.groupByFunction(users),
      },
      worksites: {
        total: worksites.length,
        byStatus: this.groupByStatus(worksites),
      },
      interventions: {
        total: interventions.length,
        byStatus: interventionsByStatus,
      },
      materials: {
        total: materials.length,
        available: materials.filter((m) => !m.assignedToUserId && !m.assignedToInterventionId).length,
      },
      vehicles: {
        total: vehicles.length,
        assigned: vehicles.filter((v) => v.assignedToUserId).length,
      },
      alerts: {
        expiringDocuments,
      },
    };
  }

  private groupByFunction(users: User[]): Record<string, number> {
    return users.reduce((acc, user) => {
      const func = user.profile?.function || 'Non défini';
      acc[func] = (acc[func] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private groupByStatus(worksites: Worksite[]): Record<string, number> {
    return worksites.reduce((acc, worksite) => {
      acc[worksite.status] = (acc[worksite.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}
