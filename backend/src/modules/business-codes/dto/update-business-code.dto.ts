import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessCodeDto } from './create-business-code.dto';

export class UpdateBusinessCodeDto extends PartialType(CreateBusinessCodeDto) {}


