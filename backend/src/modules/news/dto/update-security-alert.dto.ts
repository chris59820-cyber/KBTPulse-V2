import { PartialType } from '@nestjs/mapped-types';
import { CreateSecurityAlertDto } from './create-security-alert.dto';

export class UpdateSecurityAlertDto extends PartialType(CreateSecurityAlertDto) {}



