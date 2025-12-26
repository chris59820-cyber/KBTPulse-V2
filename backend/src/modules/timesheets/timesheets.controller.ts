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
import { TimesheetsService } from './timesheets.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('timesheets')
@UseGuards(JwtAuthGuard)
export class TimesheetsController {
  constructor(private readonly timesheetsService: TimesheetsService) {}

  @Post()
  create(@Request() req, @Body() createTimesheetDto: CreateTimesheetDto) {
    return this.timesheetsService.create({
      ...createTimesheetDto,
      userId: req.user.userId,
    });
  }

  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('codeAffaire') codeAffaire?: string,
    @Request() req?,
  ) {
    const targetUserId =
      userId && (req.user.role === UserRole.RDC || req.user.role === UserRole.CAFF)
        ? userId
        : req.user.userId;
    return this.timesheetsService.findAll(
      targetUserId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      codeAffaire,
    );
  }

  @Get('weekly')
  getWeeklySummary(
    @Query('userId') userId: string,
    @Query('weekStart') weekStart: string,
    @Request() req,
  ) {
    const targetUserId =
      userId && (req.user.role === UserRole.RDC || req.user.role === UserRole.CAFF)
        ? userId
        : req.user.userId;
    return this.timesheetsService.getWeeklySummary(
      targetUserId,
      new Date(weekStart),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timesheetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimesheetDto: UpdateTimesheetDto) {
    return this.timesheetsService.update(id, updateTimesheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesheetsService.remove(id);
  }

  @Post(':id/validate')
  @UseGuards(RolesGuard)
  @Roles(UserRole.RDC, UserRole.CAFF)
  validate(@Param('id') id: string, @Request() req) {
    return this.timesheetsService.validate(id, req.user.userId);
  }
}
