import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { NotificationType } from './notification.entity';

export enum NotificationChannel {
  PUSH = 'push',
  EMAIL = 'email',
  SMS = 'sms',
}

@Entity('notification_preferences')
export class NotificationPreference extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'text',
  })
  type: NotificationType;

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'text', nullable: true })
  channels?: string; // JSON array de NotificationChannel

  @Column({ nullable: true })
  startTime?: string; // Format HH:mm

  @Column({ nullable: true })
  endTime?: string; // Format HH:mm

  @Column({ default: false })
  soundEnabled: boolean;
}


