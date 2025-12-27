import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from './entities/news.entity';
import { SecurityAlert } from './entities/security-alert.entity';
import { Perimeter } from '../perimeters/entities/perimeter.entity';
import { Worksite } from '../worksites/entities/worksite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([News, SecurityAlert, Perimeter, Worksite]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}


