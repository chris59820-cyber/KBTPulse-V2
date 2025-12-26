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
import { WorksitesService } from './worksites.service';
import { CreateWorksiteDto } from './dto/create-worksite.dto';
import { UpdateWorksiteDto } from './dto/update-worksite.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('worksites')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(
  UserRole.ADMIN,
  UserRole.CAFF,
  UserRole.RDC,
  UserRole.PREPA,
  UserRole.CE,
  UserRole.RH,
)
export class WorksitesController {
  constructor(private readonly worksitesService: WorksitesService) {}

  @Post()
  create(@Body() createWorksiteDto: CreateWorksiteDto) {
    return this.worksitesService.create(createWorksiteDto);
  }

  @Get()
  findAll() {
    return this.worksitesService.findAll();
  }

  @Get('statistics')
  getStatistics() {
    return this.worksitesService.getStatistics();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.worksitesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorksiteDto: UpdateWorksiteDto) {
    return this.worksitesService.update(id, updateWorksiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.worksitesService.remove(id);
  }
}
