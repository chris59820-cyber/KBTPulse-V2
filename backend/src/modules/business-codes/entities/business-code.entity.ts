import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Perimeter } from '../../perimeters/entities/perimeter.entity';

export enum WorkType {
  DESAMIANTAGE = 'Désamiantage',
  ECHAFAUDAGE = 'Échafaudage',
  ISOLATION = 'Isolation',
  PROTECTION_PASSIVE_INCENDIE = 'Protection Passive Incendie',
  TRAVAUX_SUR_CORDE = 'Travaux sur Corde',
}

export enum DocumentType {
  BORDEREAU = 'Bordereau',
  PROJET = 'Projet',
}

@Entity('business_codes')
export class BusinessCode extends BaseEntity {
  @Column()
  codeNumber: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  amount?: number;

  @Column({ type: 'text', nullable: true })
  workType?: string;

  @Column({ nullable: true })
  rdcId?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'rdcId' })
  rdc?: User;

  @Column({ default: false })
  isContractCode: boolean;

  @Column({ type: 'text', nullable: true })
  contractType?: string; // Type de contrat (ex: Maintenance)

  @Column({ type: 'text', nullable: true })
  documentType?: string; // Type d'affaires (Bordereau ou Projet)

  @Column({ type: 'text', nullable: true })
  priceType?: string; // Type de prix (ex: Forfait)

  @Column({ nullable: true })
  perimeterId?: string;

  @ManyToOne(() => Perimeter, { nullable: true })
  @JoinColumn({ name: 'perimeterId' })
  perimeter?: Perimeter;

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;
}

