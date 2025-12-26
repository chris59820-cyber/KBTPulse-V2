import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateInterventionDto } from './dto/update-intervention.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { InterventionStatus } from './entities/intervention.entity';

@Controller('interventions')
@UseGuards(JwtAuthGuard)
export class InterventionsController {
  constructor(private readonly interventionsService: InterventionsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(
    UserRole.ADMIN,
    UserRole.CAFF,
    UserRole.RDC,
    UserRole.PREPA,
    UserRole.CE,
  )
  create(@Body() createInterventionDto: CreateInterventionDto) {
    return this.interventionsService.create(createInterventionDto);
  }

  @Get()
  findAll(
    @Query('status') status?: InterventionStatus,
    @Query('rdcId') rdcId?: string,
    @Query('ceId') ceId?: string,
    @Query('worksiteId') worksiteId?: string,
  ) {
    return this.interventionsService.findAll({ status, rdcId, ceId, worksiteId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interventionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(
    UserRole.ADMIN,
    UserRole.CAFF,
    UserRole.RDC,
    UserRole.PREPA,
    UserRole.CE,
  )
  update(@Param('id') id: string, @Body() updateInterventionDto: UpdateInterventionDto) {
    return this.interventionsService.update(id, updateInterventionDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CAFF)
  remove(@Param('id') id: string) {
    return this.interventionsService.remove(id);
  }

  @Patch(':id/progress')
  updateProgress(@Param('id') id: string, @Body('progress') progress: number) {
    return this.interventionsService.updateProgress(id, progress);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(
    UserRole.ADMIN,
    UserRole.CAFF,
    UserRole.RDC,
    UserRole.PREPA,
    UserRole.CE,
  )
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: InterventionStatus,
  ) {
    return this.interventionsService.updateStatus(id, status);
  }

  @Post(':id/assign')
  @UseGuards(RolesGuard)
  @Roles(
    UserRole.ADMIN,
    UserRole.CAFF,
    UserRole.RDC,
    UserRole.PREPA,
    UserRole.CE,
  )
  assignUsers(
    @Param('id') id: string,
    @Body('userIds') userIds: string[],
  ) {
    return this.interventionsService.assignUsers(id, userIds);
  }
}
