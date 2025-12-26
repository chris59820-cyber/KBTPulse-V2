import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateSiteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  sector?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsNumber()
  @IsOptional()
  gpsLatitude?: number;

  @IsNumber()
  @IsOptional()
  gpsLongitude?: number;

  @IsString()
  @IsOptional()
  guardPostGps?: string;

  @IsString()
  @IsOptional()
  meetingPoints?: string;

  @IsString()
  @IsOptional()
  emergencyNumber?: string;

  @IsString()
  @IsOptional()
  requiredDocuments?: string;

  @IsString()
  @IsOptional()
  requiredTrainings?: string;

  @IsString()
  @IsOptional()
  specificEquipment?: string;

  @IsString()
  @IsOptional()
  specificEquipmentText?: string;

  @IsString()
  @IsOptional()
  otherEquipmentText?: string;
}
