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
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('materials')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(
  UserRole.ADMIN,
  UserRole.CAFF,
  UserRole.RDC,
  UserRole.PREPA,
  UserRole.CE,
  UserRole.RH,
)
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('state') state?: string,
    @Query('assignedToUserId') assignedToUserId?: string,
    @Query('assignedToInterventionId') assignedToInterventionId?: string,
  ) {
    return this.materialsService.findAll({
      category,
      state,
      assignedToUserId,
      assignedToInterventionId,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }

  @Get('reference/:reference')
  findByReference(@Param('reference') reference: string) {
    return this.materialsService.findByReference(reference);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialDto: UpdateMaterialDto) {
    return this.materialsService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialsService.remove(id);
  }

  @Post(':id/assign-user')
  assignToUser(@Param('id') id: string, @Body('userId') userId: string | null) {
    return this.materialsService.assignToUser(id, userId);
  }

  @Post(':id/assign-intervention')
  assignToIntervention(
    @Param('id') id: string,
    @Body('interventionId') interventionId: string | null,
  ) {
    return this.materialsService.assignToIntervention(id, interventionId);
  }
}

