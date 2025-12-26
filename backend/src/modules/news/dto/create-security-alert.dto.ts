import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { AlertSeverity } from '../entities/security-alert.entity';

export class CreateSecurityAlertDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(AlertSeverity)
  @IsNotEmpty()
  severity: AlertSeverity;

  @IsString()
  @IsOptional()
  perimeterId?: string;

  @IsOptional()
  expiresAt?: Date;
}

