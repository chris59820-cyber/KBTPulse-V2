import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerimetersService } from './perimeters.service';
import { PerimetersController } from './perimeters.controller';
import { Perimeter } from './entities/perimeter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perimeter])],
  controllers: [PerimetersController],
  providers: [PerimetersService],
  exports: [PerimetersService],
})
export class PerimetersModule {}
