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
  Request,
} from '@nestjs/common';
import { AbsencesService } from './absences.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('absences')
@UseGuards(JwtAuthGuard)
export class AbsencesController {
  constructor(private readonly absencesService: AbsencesService) {}

  @Post()
  create(@Request() req, @Body() createAbsenceDto: CreateAbsenceDto) {
    return this.absencesService.create({
      ...createAbsenceDto,
      userId: req.user.userId,
    });
  }

  @Get()
  findAll(@Query('userId') userId?: string, @Request() req?) {
    // Les utilisateurs ne voient que leurs propres absences sauf si ils ont les droits
    const targetUserId =
      userId && (req.user.role === UserRole.RDC || req.user.role === UserRole.CAFF || req.user.role === UserRole.RH)
        ? userId
        : req.user.userId;
    return this.absencesService.findAll(targetUserId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.absencesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbsenceDto: UpdateAbsenceDto) {
    return this.absencesService.update(id, updateAbsenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.absencesService.remove(id);
  }

  @Post(':id/validate')
  @UseGuards(RolesGuard)
  @Roles(UserRole.RDC, UserRole.CAFF, UserRole.RH)
  validate(
    @Param('id') id: string,
    @Body('approved') approved: boolean,
    @Request() req,
  ) {
    return this.absencesService.validate(id, req.user.userId, approved);
  }
}
