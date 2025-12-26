import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { MaterialCategory, MaterialState } from '../entities/material.entity';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsEnum(MaterialCategory)
  @IsNotEmpty()
  category: MaterialCategory;

  @IsEnum(MaterialState)
  @IsOptional()
  state?: MaterialState;

  @IsNumber()
  @IsOptional()
  acquisitionValue?: number;

  @IsString()
  @IsOptional()
  assignedToUserId?: string;

  @IsString()
  @IsOptional()
  assignedToInterventionId?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsDateString()
  @IsOptional()
  lastMaintenanceDate?: Date;

  @IsDateString()
  @IsOptional()
  nextMaintenanceDate?: Date;
}
