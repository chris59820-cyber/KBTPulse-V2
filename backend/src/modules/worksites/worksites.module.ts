import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorksitesService } from './worksites.service';
import { WorksitesController } from './worksites.controller';
import { Worksite } from './entities/worksite.entity';
import { User } from '../users/entities/user.entity';
import { Site } from '../sites/entities/site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Worksite, User, Site])],
  controllers: [WorksitesController],
  providers: [WorksitesService],
  exports: [WorksitesService],
})
export class WorksitesModule {}
