import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('sites')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(
  UserRole.ADMIN,
  UserRole.CAFF,
  UserRole.RDC,
  UserRole.PREPA,
  UserRole.CE,
  UserRole.RH,
)
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  create(@Body() createSiteDto: CreateSiteDto) {
    return this.sitesService.create(createSiteDto);
  }

  @Get()
  findAll() {
    return this.sitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sitesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
    return this.sitesService.update(id, updateSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sitesService.remove(id);
  }

  // Hiérarchie
  @Post(':siteId/sectors')
  createSector(@Param('siteId') siteId: string, @Body('name') name: string) {
    return this.sitesService.createSector(siteId, name);
  }

  @Post('sectors/:sectorId/units')
  createUnit(@Param('sectorId') sectorId: string, @Body('name') name: string) {
    return this.sitesService.createUnit(sectorId, name);
  }

  @Post('units/:unitId/buildings')
  createBuilding(@Param('unitId') unitId: string, @Body('name') name: string) {
    return this.sitesService.createBuilding(unitId, name);
  }

  @Post('buildings/:buildingId/floors')
  createFloor(@Param('buildingId') buildingId: string, @Body('name') name: string) {
    return this.sitesService.createFloor(buildingId, name);
  }

  @Post('floors/:floorId/equipments')
  createEquipment(@Param('floorId') floorId: string, @Body('name') name: string) {
    return this.sitesService.createEquipment(floorId, name);
  }

  @Get(':siteId/structure')
  getSiteStructure(@Param('siteId') siteId: string) {
    return this.sitesService.getSiteStructure(siteId);
  }
}

