import { PartialType } from '@nestjs/mapped-types';
import { CreateWaitingDto } from './create-waiting.dto';

export class UpdateWaitingDto extends PartialType(CreateWaitingDto) {}
