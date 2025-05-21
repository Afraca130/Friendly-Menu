import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
export abstract class BaseController {
  constructor(protected readonly service: any) {}
}
