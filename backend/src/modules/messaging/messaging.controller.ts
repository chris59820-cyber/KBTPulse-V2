import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messaging')
@UseGuards(JwtAuthGuard)
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post('conversations')
  createConversation(@Body() createConversationDto: CreateConversationDto) {
    return this.messagingService.createConversation(createConversationDto);
  }

  @Get('conversations')
  getConversations(@Request() req) {
    return this.messagingService.findConversations(req.user.userId);
  }

  @Get('conversations/:id')
  getConversation(@Param('id') id: string, @Request() req) {
    return this.messagingService.findConversation(id, req.user.userId);
  }

  @Get('conversations/:id/messages')
  getMessages(@Param('id') id: string, @Request() req) {
    return this.messagingService.findMessages(id, req.user.userId);
  }

  @Post('conversations/:id/messages')
  createMessage(
    @Param('id') id: string,
    @Body() createMessageDto: CreateMessageDto,
    @Request() req,
  ) {
    return this.messagingService.createMessage(id, req.user.userId, createMessageDto);
  }

  @Patch('messages/:id')
  updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @Request() req,
  ) {
    return this.messagingService.updateMessage(id, req.user.userId, updateMessageDto);
  }

  @Delete('messages/:id')
  deleteMessage(@Param('id') id: string, @Request() req) {
    return this.messagingService.deleteMessage(id, req.user.userId);
  }

  @Post('conversations/:id/read')
  markAsRead(@Param('id') id: string, @Request() req) {
    return this.messagingService.markAsRead(id, req.user.userId);
  }

  @Get('unread-count')
  getUnreadCount(@Request() req) {
    return this.messagingService.getUnreadCount(req.user.userId);
  }
}


