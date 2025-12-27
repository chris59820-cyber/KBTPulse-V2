import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlanningService } from './planning.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('planning')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(
  UserRole.ADMIN,
  UserRole.CAFF,
  UserRole.RDC,
  UserRole.PREPA,
  UserRole.RH,
)
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Get()
  getPlanning(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('userId') userId?: string,
    @Query('rdcId') rdcId?: string,
    @Query('worksiteId') worksiteId?: string,
  ) {
    return this.planningService.getPlanning(
      new Date(startDate),
      new Date(endDate),
      { userId, rdcId, worksiteId },
    );
  }

  @Get('daily')
  getDailyPlanning(
    @Query('date') date: string,
    @Query('userId') userId?: string,
    @Query('rdcId') rdcId?: string,
  ) {
    return this.planningService.getDailyPlanning(new Date(date), { userId, rdcId });
  }

  @Get('available-users')
  getAvailableUsers(
    @Query('date') date: string,
    @Query('perimeterId') perimeterId?: string,
  ) {
    return this.planningService.getAvailableUsers(new Date(date), perimeterId);
  }
}

