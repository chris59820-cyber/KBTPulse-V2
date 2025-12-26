import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatePerimeterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

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
  workingHours?: string;

  @IsString()
  @IsOptional()
  receptionHours?: string; // JSON {start: "08:00", end: "17:00"}

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsString()
  @IsOptional()
  dateFormat?: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  language?: string;
}
