import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    const conversation = this.conversationRepository.create(createConversationDto);
    return this.conversationRepository.save(conversation);
  }

  async findConversations(userId: string): Promise<Conversation[]> {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.participants', 'participant')
      .where('participant.id = :userId', { userId })
      .andWhere('conversation.archived = :archived', { archived: false })
      .leftJoinAndSelect('conversation.participants', 'participants')
      .orderBy('conversation.lastMessageAt', 'DESC')
      .getMany();
  }

  async findConversation(id: string, userId: string): Promise<Conversation> {
    const conversation = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.participants', 'participant')
      .where('conversation.id = :id', { id })
      .andWhere('participant.id = :userId', { userId })
      .leftJoinAndSelect('conversation.participants', 'participants')
      .getOne();

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }
    return conversation;
  }

  async createMessage(
    conversationId: string,
    senderId: string,
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
    });
    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${conversationId} not found`);
    }

    const message = this.messageRepository.create({
      ...createMessageDto,
      conversationId,
      senderId,
    });
    const saved = await this.messageRepository.save(message);

    // Mettre à jour la conversation
    conversation.lastMessageId = saved.id;
    conversation.lastMessageAt = new Date();
    await this.conversationRepository.save(conversation);

    return saved;
  }

  async findMessages(
    conversationId: string,
    userId: string,
  ): Promise<Message[]> {
    // Vérifier que l'utilisateur est participant
    await this.findConversation(conversationId, userId);

    return this.messageRepository.find({
      where: { conversationId },
      relations: ['sender'],
      order: { createdAt: 'ASC' },
    });
  }

  async updateMessage(
    id: string,
    userId: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id, senderId: userId },
    });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    Object.assign(message, updateMessageDto);
    return this.messageRepository.save(message);
  }

  async deleteMessage(id: string, userId: string): Promise<void> {
    const message = await this.messageRepository.findOne({
      where: { id, senderId: userId },
    });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    await this.messageRepository.remove(message);
  }

  async markAsRead(conversationId: string, userId: string): Promise<void> {
    // Marquer tous les messages non lus comme lus
    await this.messageRepository
      .createQueryBuilder()
      .update(Message)
      .set({ readAt: new Date() })
      .where('conversationId = :conversationId', { conversationId })
      .andWhere('senderId != :userId', { userId })
      .andWhere('readAt IS NULL')
      .execute();
  }

  async getUnreadCount(userId: string): Promise<number> {
    // Compter les messages non lus dans les conversations de l'utilisateur
    const conversations = await this.findConversations(userId);
    const conversationIds = conversations.map((c) => c.id);

    if (conversationIds.length === 0) return 0;

    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.conversation', 'conversation')
      .leftJoin('conversation.participants', 'participant')
      .where('conversation.id IN (:...ids)', { ids: conversationIds })
      .andWhere('message.senderId != :userId', { userId })
      .andWhere('message.readAt IS NULL')
      .getCount();
  }
}
