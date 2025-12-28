import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

export enum TimesheetType {
  PRODUCTION = 'production',
  OTHER = 'autre',
  STAFF = 'staff',
}

@Entity('timesheets')
export class Timesheet extends BaseEntity {
  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  hours: number;

  @Column({
    type: 'text',
  })
  type: TimesheetType;

  @Column({ nullable: true })
  codeAffaire?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  travelKm?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  mealAllowance?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  bonus?: number;

  @Column({ type: 'text', nullable: true })
  comments?: string;

  @Column({ default: false })
  validated: boolean;

  @Column({ nullable: true })
  validatedBy?: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'validatedBy' })
  validator?: User;

  @Column({ type: 'datetime', nullable: true })
  validatedAt?: Date;
}


