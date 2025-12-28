import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { DocumentType } from '../entities/document.entity';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: DocumentType;

  @IsDateString()
  @IsOptional()
  expirationDate?: Date;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  interventionId?: string;
}


