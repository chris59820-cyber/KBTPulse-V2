import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { NewsCategory } from '../entities/news.entity';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsEnum(NewsCategory)
  @IsNotEmpty()
  category: NewsCategory;

  @IsString()
  @IsOptional()
  perimeterId?: string;

  @IsString()
  @IsOptional()
  worksiteId?: string;

  @IsOptional()
  publishedAt?: Date;
}

