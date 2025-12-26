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
import { PerimetersService } from './perimeters.service';
import { CreatePerimeterDto } from './dto/create-perimeter.dto';
import { UpdatePerimeterDto } from './dto/update-perimeter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('perimeters')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.CAFF)
export class PerimetersController {
  constructor(private readonly perimetersService: PerimetersService) {}

  @Post()
  create(@Body() createPerimeterDto: CreatePerimeterDto) {
    return this.perimetersService.create(createPerimeterDto);
  }

  @Get()
  findAll() {
    return this.perimetersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perimetersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerimeterDto: UpdatePerimeterDto) {
    return this.perimetersService.update(id, updatePerimeterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perimetersService.remove(id);
  }
}
