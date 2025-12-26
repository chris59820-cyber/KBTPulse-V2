import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

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
