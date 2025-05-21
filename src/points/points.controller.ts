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
import { PointsService } from './points.service';
import { CreatePointTransactionDto } from './dto/create-point-transaction.dto';
import { UpdatePointTransactionDto } from './dto/update-point-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@Controller('points')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createPointTransactionDto: CreatePointTransactionDto) {
    return this.pointsService.create(createPointTransactionDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.pointsService.findAll();
  }

  @Get('my')
  @Roles(Role.USER)
  findMyTransactions(@Request() req) {
    return this.pointsService.findByUser(req.user.id);
  }

  @Get('my/balance')
  @Roles(Role.USER)
  getMyBalance(@Request() req) {
    return this.pointsService.getBalance(req.user.id);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.pointsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updatePointTransactionDto: UpdatePointTransactionDto,
  ) {
    return this.pointsService.update(+id, updatePointTransactionDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.pointsService.remove(+id);
  }
}
