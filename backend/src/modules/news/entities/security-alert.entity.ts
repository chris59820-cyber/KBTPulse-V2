import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Perimeter } from '../../perimeters/entities/perimeter.entity';

export enum AlertSeverity {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

@Entity('security_alerts')
export class SecurityAlert extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'text',
  })
  severity: AlertSeverity;

  @Column({ nullable: true })
  perimeterId?: string;

  @ManyToOne(() => Perimeter, { nullable: true })
  @JoinColumn({ name: 'perimeterId' })
  perimeter?: Perimeter;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'datetime', nullable: true })
  expiresAt?: Date;
}


