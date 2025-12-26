import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterventionsService } from './interventions.service';
import { InterventionsController } from './interventions.controller';
import { Intervention } from './entities/intervention.entity';
import { InterventionAssignment } from './entities/intervention-assignment.entity';
import { User } from '../users/entities/user.entity';
import { Site } from '../sites/entities/site.entity';
import { Worksite } from '../worksites/entities/worksite.entity';
import { DocumentsModule } from '../documents/documents.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Intervention,
      InterventionAssignment,
      User,
      Site,
      Worksite,
    ]),
    DocumentsModule,
    NotificationsModule,
  ],
  controllers: [InterventionsController],
  providers: [InterventionsService],
  exports: [InterventionsService],
})
export class InterventionsModule {}
