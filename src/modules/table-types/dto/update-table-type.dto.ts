import { PartialType } from '@nestjs/mapped-types';
import { CreateTableTypeDto } from './create-table-type.dto';

export class UpdateTableTypeDto extends PartialType(CreateTableTypeDto) {}
