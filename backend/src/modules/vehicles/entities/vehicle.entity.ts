import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

export enum VehicleType {
  CAR = 'Voiture',
  TRUCK = 'Camion',
  MACHINERY = 'Engin',
}

@Entity('vehicles')
export class Vehicle extends BaseEntity {
  @Column({ unique: true })
  registration: string;

  @Column({
    type: 'text',
  })
  type: VehicleType;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  model?: string;

  @Column({ nullable: true })
  assignedToUserId?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedToUserId' })
  assignedToUser?: User;

  @Column({ nullable: true })
  assignedToInterventionId?: string;

  @Column({ type: 'date', nullable: true })
  assignmentDate?: Date;

  @Column({ type: 'date', nullable: true })
  returnDate?: Date;

  @Column({ type: 'integer', nullable: true })
  mileage?: number;

  @Column({ nullable: true })
  photo?: string; // Chemin vers le fichier photo

  @Column({ nullable: true })
  inspectionReport?: string; // Chemin vers le fichier de constat

  @Column({ type: 'text', nullable: true })
  maintenanceHistory?: string; // JSON array

  @Column({ type: 'date', nullable: true })
  lastRevisionDate?: Date;

  @Column({ type: 'date', nullable: true })
  nextRevisionDate?: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}


