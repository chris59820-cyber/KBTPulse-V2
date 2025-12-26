import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Site } from '../../sites/entities/site.entity';

export enum WorksiteStatus {
  OPEN = 'Ouvert',
  IN_PROGRESS = 'En cours',
  CLOSED = 'Clôturé',
}

@Entity('worksites')
export class Worksite extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  rdcId?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'rdcId' })
  rdc?: User;

  @Column({
    type: 'text',
    default: WorksiteStatus.OPEN,
  })
  status: WorksiteStatus;

  // Informations de localisation
  @Column({ nullable: true })
  siteId?: string;

  @ManyToOne(() => Site, { nullable: true })
  @JoinColumn({ name: 'siteId' })
  site?: Site;

  @Column({ nullable: true })
  sectorId?: string; // SiteSector ID

  @Column({ nullable: true })
  unitId?: string; // SiteUnit ID

  @Column({ nullable: true })
  buildingId?: string; // SiteBuilding ID

  @Column({ nullable: true })
  floorId?: string; // SiteFloor ID

  @Column({ nullable: true })
  equipmentId?: string; // SiteEquipment ID

  @Column({ nullable: true })
  worksiteSector?: string; // Secteur du chantier (différent du secteur du site)

  @Column({ type: 'text', nullable: true })
  gpsLocation?: string; // JSON {latitude, longitude}

  @Column({ type: 'text', nullable: true })
  clientContact?: string; // JSON Contact {name, phone, email}

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  quoteAmount?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  orderAmount?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  incurredCosts?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  remainingWork?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  budgetVariance?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  profitability?: number;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;
}
