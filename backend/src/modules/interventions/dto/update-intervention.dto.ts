import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateInterventionDto } from './create-intervention.dto';

export class UpdateInterventionDto extends PartialType(CreateInterventionDto) {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  assignedUserIds?: string[];
}
