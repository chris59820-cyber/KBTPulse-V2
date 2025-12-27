import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationPreferenceDto } from './dto/update-notification-preference.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationPreference)
    private preferenceRepository: Repository<NotificationPreference>,
  ) {}

  async create(
    userId: string,
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    // Vérifier les préférences utilisateur
    const preference = await this.getPreference(userId, createNotificationDto.type);
    if (!preference || !preference.enabled) {
      // Ne pas créer la notification si elle est désactivée
      return null;
    }

    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      userId,
    });
    return this.notificationRepository.save(notification);
  }

  async findAll(
    userId: string,
    filters?: { read?: boolean; type?: NotificationType },
  ): Promise<Notification[]> {
    const where: any = { userId };
    if (filters?.read !== undefined) where.read = filters.read;
    if (filters?.type) where.type = filters.type;

    return this.notificationRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findUnreadCount(userId: string): Promise<number> {
    return this.notificationRepository.count({
      where: { userId, read: false },
    });
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id, userId },
    });
    if (notification) {
      notification.read = true;
      notification.readAt = new Date();
      return this.notificationRepository.save(notification);
    }
    return null;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.update(
      { userId, read: false },
      { read: true, readAt: new Date() },
    );
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.notificationRepository.delete({ id, userId });
  }

  async getPreference(
    userId: string,
    type: NotificationType,
  ): Promise<NotificationPreference | null> {
    return this.preferenceRepository.findOne({
      where: { userId, type },
    });
  }

  async updatePreference(
    userId: string,
    type: NotificationType,
    updateDto: UpdateNotificationPreferenceDto,
  ): Promise<NotificationPreference> {
    let preference = await this.getPreference(userId, type);
    if (!preference) {
      preference = this.preferenceRepository.create({ userId, type });
    }
    Object.assign(preference, updateDto);
    return this.preferenceRepository.save(preference);
  }

  async getAllPreferences(userId: string): Promise<NotificationPreference[]> {
    return this.preferenceRepository.find({
      where: { userId },
    });
  }
}

