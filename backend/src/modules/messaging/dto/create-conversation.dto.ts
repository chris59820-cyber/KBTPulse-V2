import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ConversationType, ConversationGroupType } from '../entities/conversation.entity';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ConversationType)
  @IsOptional()
  type?: ConversationType;

  @IsEnum(ConversationGroupType)
  @IsOptional()
  groupType?: ConversationGroupType;

  @IsString()
  @IsOptional()
  groupId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  participantIds: string[];
}
