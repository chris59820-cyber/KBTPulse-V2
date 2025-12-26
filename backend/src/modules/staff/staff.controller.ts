import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('staff')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(
  UserRole.ADMIN,
  UserRole.CAFF,
  UserRole.RDC,
  UserRole.PREPA,
  UserRole.CE,
  UserRole.RH,
)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get('statistics')
  getStatistics(@Query('perimeterId') perimeterId?: string) {
    return this.staffService.getStaffStatistics(perimeterId);
  }

  @Get('organigramme')
  getOrganigramme(@Query('perimeterId') perimeterId?: string) {
    return this.staffService.getOrganigramme(perimeterId);
  }
}
