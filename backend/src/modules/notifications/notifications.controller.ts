import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UpdateNotificationPreferenceDto } from './dto/update-notification-preference.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationType } from './entities/notification.entity';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(
    @Request() req,
    @Query('read') read?: boolean,
    @Query('type') type?: NotificationType,
  ) {
    return this.notificationsService.findAll(req.user.userId, { read, type });
  }

  @Get('unread-count')
  getUnreadCount(@Request() req) {
    return this.notificationsService.findUnreadCount(req.user.userId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @Request() req) {
    return this.notificationsService.markAsRead(id, req.user.userId);
  }

  @Patch('read-all')
  markAllAsRead(@Request() req) {
    return this.notificationsService.markAllAsRead(req.user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    return this.notificationsService.delete(id, req.user.userId);
  }

  @Get('preferences')
  getPreferences(@Request() req) {
    return this.notificationsService.getAllPreferences(req.user.userId);
  }

  @Patch('preferences/:type')
  updatePreference(
    @Param('type') type: NotificationType,
    @Body() updateDto: UpdateNotificationPreferenceDto,
    @Request() req,
  ) {
    return this.notificationsService.updatePreference(
      req.user.userId,
      type,
      updateDto,
    );
  }
}
