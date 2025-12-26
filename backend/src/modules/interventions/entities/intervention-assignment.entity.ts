import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Intervention } from './intervention.entity';
import { User } from '../../users/entities/user.entity';

export enum AssignmentRole {
  TEAM_LEADER = 'Chef d\'équipe',
  INTERVENTION_REFERENT = 'Référent intervention',
  MOS_RESPONSIBLE = 'Responsable MOS',
  INTERVENANT = 'Intervenant',
}

@Entity('intervention_assignments')
export class InterventionAssignment extends BaseEntity {
  @Column()
  interventionId: string;

  @ManyToOne(() => Intervention)
  @JoinColumn({ name: 'interventionId' })
  intervention: Intervention;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'text',
  })
  role: AssignmentRole;
}
