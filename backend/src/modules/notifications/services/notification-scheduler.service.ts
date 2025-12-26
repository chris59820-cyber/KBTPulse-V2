import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../documents/entities/document.entity';
import { NotificationsService } from '../notifications.service';
import { NotificationType } from '../entities/notification.entity';

@Injectable()
export class NotificationSchedulerService implements OnModuleInit {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    private notificationsService: NotificationsService,
  ) {}

  onModuleInit() {
    // Vérifier les documents expirants au démarrage
    this.checkExpiringDocuments();
  }

  /**
   * Vérifie les documents expirants tous les jours à 8h
   */
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async checkExpiringDocuments() {
    const today = new Date();
    const daysToCheck = [30, 15, 7];

    for (const days of daysToCheck) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + days);

      // Documents expirant dans exactement X jours
      const startDate = new Date(targetDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(targetDate);
      endDate.setHours(23, 59, 59, 999);

      const expiringDocuments = await this.documentRepository
        .createQueryBuilder('document')
        .where('document.expirationDate >= :startDate', { startDate })
        .andWhere('document.expirationDate <= :endDate', { endDate })
        .andWhere('document.expirationDate IS NOT NULL')
        .getMany();

      for (const document of expiringDocuments) {
        if (document.userId) {
          await this.notificationsService.create(document.userId, {
            title: `Document expirant dans ${days} jour(s)`,
            message: `Le document "${document.name}" expire le ${new Date(document.expirationDate!).toLocaleDateString('fr-FR')}`,
            type: NotificationType.DOCUMENT_EXPIRING,
            link: `/documents/${document.id}`,
            metadata: JSON.stringify({
              documentId: document.id,
              expirationDate: document.expirationDate,
              daysRemaining: days,
            }),
          });
        }
      }
    }
  }

  /**
   * Crée une notification pour une nouvelle affectation
   */
  async notifyNewAssignment(
    userId: string,
    interventionId: string,
    interventionName: string,
  ) {
    await this.notificationsService.create(userId, {
      title: 'Nouvelle affectation',
      message: `Vous avez été affecté à l'intervention "${interventionName}"`,
      type: NotificationType.NEW_ASSIGNMENT,
      link: `/interventions/${interventionId}`,
      metadata: JSON.stringify({ interventionId }),
    });
  }

  /**
   * Crée une notification pour un changement de statut d'intervention
   */
  async notifyInterventionStatusChange(
    userId: string,
    interventionId: string,
    interventionName: string,
    newStatus: string,
  ) {
    await this.notificationsService.create(userId, {
      title: 'Changement de statut',
      message: `L'intervention "${interventionName}" est maintenant "${newStatus}"`,
      type: NotificationType.INTERVENTION_STATUS_CHANGED,
      link: `/interventions/${interventionId}`,
      metadata: JSON.stringify({ interventionId, newStatus }),
    });
  }

  /**
   * Crée une notification pour une modification du planning
   */
  async notifyPlanningModified(
    userId: string,
    interventionId: string,
    interventionName: string,
  ) {
    await this.notificationsService.create(userId, {
      title: 'Planning modifié',
      message: `Le planning de l'intervention "${interventionName}" a été modifié`,
      type: NotificationType.PLANNING_MODIFIED,
      link: `/interventions/${interventionId}`,
      metadata: JSON.stringify({ interventionId }),
    });
  }

  /**
   * Crée une notification pour une demande de validation
   */
  async notifyValidationRequest(
    userId: string,
    type: 'leave' | 'formation',
    itemId: string,
    itemName: string,
  ) {
    await this.notificationsService.create(userId, {
      title: `Demande de validation - ${type === 'leave' ? 'Congé' : 'Formation'}`,
      message: `Une demande de ${type === 'leave' ? 'congé' : 'formation'} nécessite votre validation : "${itemName}"`,
      type:
        type === 'leave'
          ? NotificationType.LEAVE_VALIDATION
          : NotificationType.FORMATION_VALIDATION,
      link: type === 'leave' ? `/absences/${itemId}` : `/formations/${itemId}`,
      metadata: JSON.stringify({ type, itemId }),
    });
  }
}

