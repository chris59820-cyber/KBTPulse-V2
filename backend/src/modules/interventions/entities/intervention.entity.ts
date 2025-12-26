import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Site } from '../../sites/entities/site.entity';
import { Worksite } from '../../worksites/entities/worksite.entity';

export enum InterventionStatus {
  DIAGNOSED = 'Diagnostiqué',
  TO_PLAN = 'À planifier',
  PLANNED = 'Planifiée',
  LAUNCHED = 'Lancée',
  IN_PROGRESS = 'En-cours',
  COMPLETED = 'Terminée',
  CANCELLED = 'Annulée',
}

export enum InterventionType {
  SCAFFOLDING = 'Échafaudage',
  CALORIFUGE = 'Calorifuge',
}

export enum InterventionNature {
  INSTALLATION = 'Pose',
  REMOVAL = 'Dépose',
}

@Entity('interventions')
export class Intervention extends BaseEntity {
  @Column()
  name: string;

  @Column()
  siteId: string;

  @ManyToOne(() => Site)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Column({ nullable: true })
  sectorId?: string;

  @Column({ nullable: true })
  unitId?: string;

  @Column({ nullable: true })
  buildingId?: string;

  @Column({ nullable: true })
  floorId?: string;

  @Column({ nullable: true })
  equipmentId?: string;

  @Column({
    type: 'text',
  })
  interventionType: InterventionType;

  @Column({
    type: 'text',
  })
  nature: InterventionNature;

  @Column({
    type: 'text',
    default: InterventionStatus.DIAGNOSED,
  })
  status: InterventionStatus;

  @Column({ nullable: true })
  rdcId?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'rdcId' })
  rdc?: User;

  @Column({ nullable: true })
  ceId?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'ceId' })
  ce?: User;

  @Column({ nullable: true })
  responsibleId?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'responsibleId' })
  responsible?: User;

  @Column({ type: 'datetime', nullable: true })
  plannedStartDate?: Date;

  @Column({ type: 'datetime', nullable: true })
  plannedEndDate?: Date;

  @Column({ type: 'datetime', nullable: true })
  actualStartDate?: Date;

  @Column({ type: 'datetime', nullable: true })
  actualEndDate?: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  plannedDuration?: number; // en heures

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  actualDuration?: number; // en heures

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progress: number; // pourcentage

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  amount?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  remainingAmount?: number;

  @Column({ nullable: true })
  codeAffaire?: string;

  @Column({ nullable: true })
  orderNumber?: string;

  @Column({ type: 'text', nullable: true })
  clientContact?: string; // JSON Contact

  @Column({ type: 'text', nullable: true })
  gpsLocation?: string; // JSON {latitude, longitude}

  @Column({ nullable: true })
  worksiteId?: string;

  @ManyToOne(() => Worksite, { nullable: true })
  @JoinColumn({ name: 'worksiteId' })
  worksite?: Worksite;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'intervention_assignments',
    joinColumn: { name: 'interventionId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  assignedUsers?: User[];

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'text', nullable: true })
  miniRex?: string; // Mini retour d'expérience
}
