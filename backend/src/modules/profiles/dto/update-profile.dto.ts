import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContractType } from '../../users/entities/user-profile.entity';

export class EmergencyContactDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  relationship?: string;
}

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  function?: string;

  @IsString()
  @IsOptional()
  matricule?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsDateString()
  @IsOptional()
  dateOfHire?: Date;

  @IsString()
  @IsOptional()
  contractType?: ContractType;

  @IsNumber()
  @IsOptional()
  coefficient?: number;

  @IsNumber()
  @IsOptional()
  hourlyRate?: number;

  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @ValidateNested()
  @Type(() => EmergencyContactDto)
  @IsOptional()
  emergencyContact?: EmergencyContactDto;

  @IsNumber()
  @IsOptional()
  kmFromHome?: number;

  @IsNumber()
  @IsOptional()
  kmAllowance?: number;

  @IsString()
  @IsOptional()
  dosimetry?: string;
}
