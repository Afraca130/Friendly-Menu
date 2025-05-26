import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TableTypesService } from './table-types.service';
import { CreateTableTypeDto } from './dto/create-table-type.dto';
import { UpdateTableTypeDto } from './dto/update-table-type.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('table-types')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TableTypesController {
  constructor(private readonly tableTypesService: TableTypesService) {}

  @Post()
  @Roles(Role.OWNER)
  create(@Body() createTableTypeDto: CreateTableTypeDto) {
    return this.tableTypesService.create(createTableTypeDto);
  }

  @Get()
  findAll() {
    return this.tableTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableTypesService.findOne(+id);
  }

  @Get('restaurant/:restaurantId')
  findByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.tableTypesService.findByRestaurant(+restaurantId);
  }

  @Patch(':id')
  @Roles(Role.OWNER)
  update(
    @Param('id') id: string,
    @Body() updateTableTypeDto: UpdateTableTypeDto,
  ) {
    return this.tableTypesService.update(+id, updateTableTypeDto);
  }

  @Delete(':id')
  @Roles(Role.OWNER)
  remove(@Param('id') id: string) {
    return this.tableTypesService.remove(+id);
  }
}
