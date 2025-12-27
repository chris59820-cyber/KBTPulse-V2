import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateBusinessCodeDto {
  @IsString()
  @IsNotEmpty()
  codeNumber: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  workType?: string;

  @IsString()
  @IsOptional()
  rdcId?: string;

  @IsBoolean()
  @IsOptional()
  isContractCode?: boolean;

  @IsString()
  @IsOptional()
  contractType?: string;

  @IsString()
  @IsOptional()
  documentType?: string;

  @IsString()
  @IsOptional()
  priceType?: string;

  @IsString()
  @IsOptional()
  perimeterId?: string;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;
}

