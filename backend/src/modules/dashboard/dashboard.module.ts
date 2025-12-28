import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { User } from '../users/entities/user.entity';
import { Worksite } from '../worksites/entities/worksite.entity';
import { Intervention } from '../interventions/entities/intervention.entity';
import { Material } from '../materials/entities/material.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Document } from '../documents/entities/document.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Worksite,
      Intervention,
      Material,
      Vehicle,
      Document,
    ]),
    UsersModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}


