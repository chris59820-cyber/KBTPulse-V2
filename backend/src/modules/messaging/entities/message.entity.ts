import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Conversation } from './conversation.entity';

@Entity('messages')
export class Message extends BaseEntity {
  @Column()
  conversationId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation;

  @Column()
  senderId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  attachments?: string; // JSON array de fichiers

  @Column({ type: 'text', nullable: true })
  location?: string; // JSON {latitude, longitude}

  @Column({ type: 'text', nullable: true })
  reactions?: string; // JSON object {emoji: [userId]}

  @Column({ default: false })
  pinned: boolean;

  @Column({ type: 'text', nullable: true })
  readBy?: string; // JSON array de userIds qui ont lu

  @Column({ type: 'datetime', nullable: true })
  readAt?: Date;
}

