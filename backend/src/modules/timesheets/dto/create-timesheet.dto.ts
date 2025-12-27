import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { TimesheetType } from '../entities/timesheet.entity';

export class CreateTimesheetDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  hours: number;

  @IsEnum(TimesheetType)
  @IsNotEmpty()
  type: TimesheetType;

  @IsString()
  @IsOptional()
  codeAffaire?: string;

  @IsNumber()
  @IsOptional()
  travelKm?: number;

  @IsNumber()
  @IsOptional()
  mealAllowance?: number;

  @IsNumber()
  @IsOptional()
  bonus?: number;

  @IsString()
  @IsOptional()
  comments?: string;
}

