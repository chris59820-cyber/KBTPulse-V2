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
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('vehicles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(
  UserRole.ADMIN,
  UserRole.CAFF,
  UserRole.RDC,
  UserRole.PREPA,
  UserRole.CE,
  UserRole.RH,
)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll(
    @Query('type') type?: string,
    @Query('assignedToUserId') assignedToUserId?: string,
    @Query('assignedToInterventionId') assignedToInterventionId?: string,
  ) {
    return this.vehiclesService.findAll({
      type,
      assignedToUserId,
      assignedToInterventionId,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Get('registration/:registration')
  findByRegistration(@Param('registration') registration: string) {
    return this.vehiclesService.findByRegistration(registration);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }

  @Post(':id/assign-user')
  assignToUser(
    @Param('id') id: string,
    @Body('userId') userId: string | null,
    @Body('photo') photo?: string,
    @Body('inspectionReport') inspectionReport?: string,
  ) {
    return this.vehiclesService.assignToUser(id, userId, photo, inspectionReport);
  }

  @Post(':id/assign-intervention')
  assignToIntervention(
    @Param('id') id: string,
    @Body('interventionId') interventionId: string | null,
  ) {
    return this.vehiclesService.assignToIntervention(id, interventionId);
  }
}

