import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { Intervention } from '../interventions/entities/intervention.entity';
import { Absence } from '../absences/entities/absence.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Intervention, Absence, User])],
  controllers: [PlanningController],
  providers: [PlanningService],
  exports: [PlanningService],
})
export class PlanningModule {}
