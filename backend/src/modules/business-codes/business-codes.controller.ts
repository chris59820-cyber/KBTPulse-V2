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
import { BusinessCodesService } from './business-codes.service';
import { CreateBusinessCodeDto } from './dto/create-business-code.dto';
import { UpdateBusinessCodeDto } from './dto/update-business-code.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('business-codes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.CAFF)
export class BusinessCodesController {
  constructor(private readonly businessCodesService: BusinessCodesService) {}

  @Post()
  create(@Body() createBusinessCodeDto: CreateBusinessCodeDto) {
    return this.businessCodesService.create(createBusinessCodeDto);
  }

  @Get()
  findAll() {
    return this.businessCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessCodesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessCodeDto: UpdateBusinessCodeDto) {
    return this.businessCodesService.update(id, updateBusinessCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessCodesService.remove(id);
  }
}


