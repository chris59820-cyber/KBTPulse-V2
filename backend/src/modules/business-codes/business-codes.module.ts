import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCodesService } from './business-codes.service';
import { BusinessCodesController } from './business-codes.controller';
import { BusinessCode } from './entities/business-code.entity';
import { User } from '../users/entities/user.entity';
import { Perimeter } from '../perimeters/entities/perimeter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessCode, User, Perimeter])],
  controllers: [BusinessCodesController],
  providers: [BusinessCodesService],
  exports: [BusinessCodesService],
})
export class BusinessCodesModule {}

