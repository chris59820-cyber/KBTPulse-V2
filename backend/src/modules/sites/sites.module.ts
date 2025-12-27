import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { Site } from './entities/site.entity';
import { SiteSector } from './entities/site-sector.entity';
import { SiteUnit } from './entities/site-unit.entity';
import { SiteBuilding } from './entities/site-building.entity';
import { SiteFloor } from './entities/site-floor.entity';
import { SiteEquipment } from './entities/site-equipment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Site,
      SiteSector,
      SiteUnit,
      SiteBuilding,
      SiteFloor,
      SiteEquipment,
    ]),
  ],
  controllers: [SitesController],
  providers: [SitesService],
  exports: [SitesService],
})
export class SitesModule {}

