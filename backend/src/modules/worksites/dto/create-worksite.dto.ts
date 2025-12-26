import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { WorksiteStatus } from '../entities/worksite.entity';

export class CreateWorksiteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  rdcId?: string;

  @IsEnum(WorksiteStatus)
  @IsOptional()
  status?: WorksiteStatus;

  // Informations de localisation
  @IsString()
  @IsOptional()
  siteId?: string;

  @IsString()
  @IsOptional()
  sectorId?: string;

  @IsString()
  @IsOptional()
  unitId?: string;

  @IsString()
  @IsOptional()
  buildingId?: string;

  @IsString()
  @IsOptional()
  floorId?: string;

  @IsString()
  @IsOptional()
  equipmentId?: string;

  @IsString()
  @IsOptional()
  worksiteSector?: string;

  @IsString()
  @IsOptional()
  gpsLocation?: string; // JSON {latitude, longitude}

  @IsString()
  @IsOptional()
  clientContact?: string; // JSON Contact {name, phone, email}

  @IsNumber()
  @IsOptional()
  quoteAmount?: number;

  @IsNumber()
  @IsOptional()
  orderAmount?: number;

  @IsNumber()
  @IsOptional()
  incurredCosts?: number;

  @IsNumber()
  @IsOptional()
  remainingWork?: number;

  @IsNumber()
  @IsOptional()
  budgetVariance?: number;

  @IsNumber()
  @IsOptional()
  profitability?: number;

  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;
}
