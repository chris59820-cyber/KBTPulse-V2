import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Timesheet } from './entities/timesheet.entity';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';

@Injectable()
export class TimesheetsService {
  constructor(
    @InjectRepository(Timesheet)
    private timesheetRepository: Repository<Timesheet>,
  ) {}

  async create(createTimesheetDto: CreateTimesheetDto): Promise<Timesheet> {
    const timesheet = this.timesheetRepository.create(createTimesheetDto);
    return this.timesheetRepository.save(timesheet);
  }

  async findAll(
    userId?: string,
    startDate?: Date,
    endDate?: Date,
    codeAffaire?: string,
  ): Promise<Timesheet[]> {
    const where: any = {};
    if (userId) where.userId = userId;
    if (codeAffaire) where.codeAffaire = codeAffaire;
    if (startDate && endDate) {
      where.date = Between(startDate, endDate);
    } else if (startDate) {
      where.date = Between(startDate, startDate);
    }

    return this.timesheetRepository.find({
      where,
      relations: ['user', 'validator'],
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Timesheet> {
    const timesheet = await this.timesheetRepository.findOne({
      where: { id },
      relations: ['user', 'validator'],
    });
    if (!timesheet) {
      throw new NotFoundException(`Timesheet with ID ${id} not found`);
    }
    return timesheet;
  }

  async update(
    id: string,
    updateTimesheetDto: UpdateTimesheetDto,
  ): Promise<Timesheet> {
    const timesheet = await this.findOne(id);
    Object.assign(timesheet, updateTimesheetDto);
    return this.timesheetRepository.save(timesheet);
  }

  async remove(id: string): Promise<void> {
    const timesheet = await this.findOne(id);
    await this.timesheetRepository.remove(timesheet);
  }

  async validate(id: string, validatorId: string): Promise<Timesheet> {
    const timesheet = await this.findOne(id);
    timesheet.validated = true;
    timesheet.validatedBy = validatorId;
    timesheet.validatedAt = new Date();
    return this.timesheetRepository.save(timesheet);
  }

  async getWeeklySummary(userId: string, weekStart: Date): Promise<any> {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const timesheets = await this.findAll(userId, weekStart, weekEnd);

    const totalHours = timesheets.reduce(
      (sum, ts) => sum + parseFloat(ts.hours.toString()),
      0,
    );
    const totalTravelKm = timesheets.reduce(
      (sum, ts) => sum + (parseFloat(ts.travelKm?.toString() || '0')),
      0,
    );
    const totalMealAllowance = timesheets.reduce(
      (sum, ts) => sum + (parseFloat(ts.mealAllowance?.toString() || '0')),
      0,
    );
    const totalBonus = timesheets.reduce(
      (sum, ts) => sum + (parseFloat(ts.bonus?.toString() || '0')),
      0,
    );

    return {
      weekStart,
      weekEnd,
      totalHours,
      totalTravelKm,
      totalMealAllowance,
      totalBonus,
      timesheets,
    };
  }
}
