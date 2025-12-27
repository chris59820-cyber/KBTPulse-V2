import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsArray,
} from 'class-validator';
import {
  InterventionType,
  InterventionNature,
  InterventionStatus,
} from '../entities/intervention.entity';

export class CreateInterventionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  siteId: string;

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

  @IsEnum(InterventionType)
  @IsNotEmpty()
  interventionType: InterventionType;

  @IsEnum(InterventionNature)
  @IsNotEmpty()
  nature: InterventionNature;

  @IsEnum(InterventionStatus)
  @IsOptional()
  status?: InterventionStatus;

  @IsString()
  @IsOptional()
  rdcId?: string;

  @IsString()
  @IsOptional()
  ceId?: string;

  @IsString()
  @IsOptional()
  responsibleId?: string;

  @IsDateString()
  @IsOptional()
  plannedStartDate?: Date;

  @IsDateString()
  @IsOptional()
  plannedEndDate?: Date;

  @IsNumber()
  @IsOptional()
  plannedDuration?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  codeAffaire?: string;

  @IsString()
  @IsOptional()
  orderNumber?: string;

  @IsString()
  @IsOptional()
  clientContact?: string;

  @IsString()
  @IsOptional()
  gpsLocation?: string;

  @IsString()
  @IsOptional()
  worksiteId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  assignedUserIds?: string[];
}

