import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { VehicleType } from '../entities/vehicle.entity';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  registration: string;

  @IsEnum(VehicleType)
  @IsNotEmpty()
  type: VehicleType;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  assignedToUserId?: string;

  @IsString()
  @IsOptional()
  assignedToInterventionId?: string;

  @IsNumber()
  @IsOptional()
  mileage?: number;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  inspectionReport?: string;

  @IsDateString()
  @IsOptional()
  lastRevisionDate?: Date;

  @IsDateString()
  @IsOptional()
  nextRevisionDate?: Date;

  @IsString()
  @IsOptional()
  notes?: string;
}


