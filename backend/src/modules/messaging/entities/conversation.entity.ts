import { Entity, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Message } from './message.entity';

export enum ConversationType {
  INDIVIDUAL = 'individual',
  GROUP = 'group',
}

export enum ConversationGroupType {
  INTERVENTION = 'intervention',
  TEAM = 'team',
  WORKSITE = 'worksite',
  PERIMETER = 'perimeter',
  RDC = 'rdc',
}

@Entity('conversations')
export class Conversation extends BaseEntity {
  @Column()
  name: string;

  @Column({
    type: 'text',
    default: ConversationType.INDIVIDUAL,
  })
  type: ConversationType;

  @Column({
    type: 'text',
    nullable: true,
  })
  groupType?: ConversationGroupType;

  @Column({ nullable: true })
  groupId?: string; // ID de l'intervention, équipe, etc.

  @ManyToMany(() => User)
  @JoinTable({
    name: 'conversation_participants',
    joinColumn: { name: 'conversationId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  participants: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @Column({ nullable: true })
  lastMessageId?: string;

  @Column({ type: 'datetime', nullable: true })
  lastMessageAt?: Date;

  @Column({ default: false })
  archived: boolean;
}


