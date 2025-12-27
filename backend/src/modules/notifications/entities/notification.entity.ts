import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

export enum NotificationType {
  DOCUMENT_EXPIRING = 'document_expiring',
  LEAVE_VALIDATION = 'leave_validation',
  FORMATION_VALIDATION = 'formation_validation',
  NEW_ASSIGNMENT = 'new_assignment',
  PLANNING_MODIFIED = 'planning_modified',
  MESSAGE = 'message',
  SECURITY_ALERT = 'security_alert',
  INTERVENTION_STATUS_CHANGED = 'intervention_status_changed',
  OTHER = 'other',
}

@Entity('notifications')
export class Notification extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'text',
  })
  type: NotificationType;

  @Column({ default: false })
  read: boolean;

  @Column({ type: 'datetime', nullable: true })
  readAt?: Date;

  @Column({ type: 'text', nullable: true })
  link?: string; // URL vers la ressource liée

  @Column({ type: 'text', nullable: true })
  metadata?: string; // JSON pour données supplémentaires
}

