import { IsBoolean, IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateNotificationPreferenceDto {
  @IsBoolean()
  @IsOptional()
  enabled?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  channels?: string[];

  @IsString()
  @IsOptional()
  startTime?: string;

  @IsString()
  @IsOptional()
  endTime?: string;

  @IsBoolean()
  @IsOptional()
  soundEnabled?: boolean;
}


