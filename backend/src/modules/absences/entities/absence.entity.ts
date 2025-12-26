import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

export enum AbsenceType {
  CP = 'CP', // Congés payés
  RTT = 'RTT', // Réduction du temps de travail
  REST = 'Repos', // Repos compensateur
  RC = 'RC', // Repos compensateur
  RL = 'RL', // Repos légal
  EF = 'EF', // Événement familial
  SICK = 'Maladie', // Arrêt maladie
  AT = 'AT', // Accident du travail
  TRAINING = 'Formation', // Formation professionnelle
  UNJUSTIFIED = 'Absence injustifiée',
}

export enum AbsenceStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('absences')
export class Absence extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'text',
  })
  type: AbsenceType;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  duration: number; // en jours ou heures

  @Column({ type: 'text', nullable: true })
  comments?: string;

  @Column({
    type: 'text',
    default: AbsenceStatus.PENDING,
  })
  status: AbsenceStatus;

  @Column({ nullable: true })
  justification?: string; // URL du document justificatif

  @Column({ nullable: true })
  validatedBy?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'validatedBy' })
  validator?: User;

  @Column({ type: 'datetime', nullable: true })
  validatedAt?: Date;
}
