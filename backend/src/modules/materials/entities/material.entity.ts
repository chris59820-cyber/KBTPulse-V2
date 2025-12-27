import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

export enum MaterialState {
  NEW = 'neuf',
  GOOD = 'bon',
  USED = 'usé',
  OUT_OF_ORDER = 'HS',
}

export enum MaterialCategory {
  INDIVIDUAL_TOOLS = 'Outillage individuel',
  COLLECTIVE_TOOLS = 'Outillage collectif',
  EPI = 'EPI',
  CONSUMABLES = 'Consommables',
  INVENTORY = 'Inventaire',
  SUPPLIES = 'Fournitures',
}

@Entity('materials')
export class Material extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  reference: string;

  @Column({
    type: 'text',
  })
  category: MaterialCategory;

  @Column({
    type: 'text',
    default: MaterialState.GOOD,
  })
  state: MaterialState;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  acquisitionValue?: number;

  @Column({ nullable: true })
  assignedToUserId?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedToUserId' })
  assignedToUser?: User;

  @Column({ nullable: true })
  assignedToInterventionId?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'date', nullable: true })
  lastMaintenanceDate?: Date;

  @Column({ type: 'date', nullable: true })
  nextMaintenanceDate?: Date;

  @Column({ type: 'text', nullable: true })
  maintenanceHistory?: string; // JSON array
}

