import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WaitingsService } from './waitings.service';
import { CreateWaitingDto } from './dto/create-waiting.dto';
import { UpdateWaitingDto } from './dto/update-waiting.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('waitings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WaitingsController {
  constructor(private readonly waitingsService: WaitingsService) {}

  @Post()
  @Roles(Role.USER)
  create(@Body() createWaitingDto: CreateWaitingDto, @Request() req) {
    return this.waitingsService.create(createWaitingDto, req.user.id);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.waitingsService.findAll();
  }

  @Get('my')
  @Roles(Role.USER)
  findMyWaitings(@Request() req) {
    return this.waitingsService.findByUser(req.user.id);
  }

  @Get('restaurant/:restaurantId')
  @Roles(Role.OWNER)
  findByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.waitingsService.findByRestaurant(+restaurantId);
  }

  @Get('restaurant/:restaurantId/count')
  @Roles(Role.OWNER)
  getWaitingCount(@Param('restaurantId') restaurantId: string) {
    return this.waitingsService.getWaitingCount(+restaurantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waitingsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.OWNER)
  update(@Param('id') id: string, @Body() updateWaitingDto: UpdateWaitingDto) {
    return this.waitingsService.update(+id, updateWaitingDto);
  }

  @Delete(':id')
  @Roles(Role.USER, Role.OWNER)
  remove(@Param('id') id: string) {
    return this.waitingsService.remove(+id);
  }
}
