import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PerimetersModule } from './modules/perimeters/perimeters.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { AbsencesModule } from './modules/absences/absences.module';
import { StaffModule } from './modules/staff/staff.module';
import { TimesheetsModule } from './modules/timesheets/timesheets.module';
import { SitesModule } from './modules/sites/sites.module';
import { WorksitesModule } from './modules/worksites/worksites.module';
import { InterventionsModule } from './modules/interventions/interventions.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { PlanningModule } from './modules/planning/planning.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PerimetersModule,
    ProfilesModule,
    DocumentsModule,
    AbsencesModule,
    StaffModule,
    TimesheetsModule,
    SitesModule,
    WorksitesModule,
    InterventionsModule,
    MaterialsModule,
    VehiclesModule,
    NotificationsModule,
    MessagingModule,
    PlanningModule,
    DashboardModule,
    NewsModule,
  ],
})
export class AppModule {}