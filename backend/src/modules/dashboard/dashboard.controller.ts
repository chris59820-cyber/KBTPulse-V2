import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(
  UserRole.ADMIN,
  UserRole.CAFF,
  UserRole.RDC,
  UserRole.PREPA,
  UserRole.CE,
  UserRole.RH,
)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly usersService: UsersService,
  ) {}

  @Get('stats')
  async getStats(
    @Query('perimeterId') perimeterId?: string,
    @CurrentUser() currentUser?: any,
  ) {
    // Récupérer l'utilisateur complet pour obtenir le périmètre favori
    let effectivePerimeterId = perimeterId;
    if (!effectivePerimeterId && currentUser?.userId) {
      try {
        const user = await this.usersService.findOne(currentUser.userId);
        effectivePerimeterId = user.favoritePerimeterId || undefined;
      } catch (error) {
        // Ignorer l'erreur et continuer sans filtre
      }
    }
    return this.dashboardService.getDashboardStats(effectivePerimeterId);
  }
}


