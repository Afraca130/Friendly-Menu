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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Waiting } from './entities/waiting.entity';

@ApiTags('waitings')
@ApiBearerAuth()
@Controller('waitings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WaitingsController {
  constructor(private readonly waitingsService: WaitingsService) {}

  @Post()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Create a new waiting entry' })
  @ApiResponse({
    status: 201,
    description: 'Waiting entry created successfully',
    type: Waiting,
  })
  create(@Body() createWaitingDto: CreateWaitingDto, @Request() req: any) {
    return this.waitingsService.create(createWaitingDto, req.user.id);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all waiting entries' })
  @ApiResponse({
    status: 200,
    description: 'List of all waiting entries',
    type: [Waiting],
  })
  findAll() {
    return this.waitingsService.findAll();
  }

  @Get('my')
  @Roles(Role.USER)
  @ApiOperation({ summary: "Get current user's waiting entries" })
  @ApiResponse({
    status: 200,
    description: "List of user's waiting entries",
    type: [Waiting],
  })
  findMyWaitings(@Request() req: any) {
    return this.waitingsService.findByUser(req.user.id);
  }

  @Get('restaurant/:restaurantId')
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Get waiting entries for a restaurant' })
  @ApiResponse({
    status: 200,
    description: 'List of waiting entries for the restaurant',
    type: [Waiting],
  })
  findByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.waitingsService.findByRestaurant(+restaurantId);
  }

  @Get('restaurant/:restaurantId/count')
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Get waiting count for a restaurant' })
  @ApiResponse({
    status: 200,
    description: 'Current waiting count for the restaurant',
  })
  getWaitingCount(@Param('restaurantId') restaurantId: string) {
    return this.waitingsService.getWaitingCount(+restaurantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific waiting entry' })
  @ApiResponse({ status: 200, description: 'The waiting entry', type: Waiting })
  findOne(@Param('id') id: string) {
    return this.waitingsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Update a waiting entry' })
  @ApiResponse({
    status: 200,
    description: 'Waiting entry updated successfully',
    type: Waiting,
  })
  update(@Param('id') id: string, @Body() updateWaitingDto: UpdateWaitingDto) {
    return this.waitingsService.update(+id, updateWaitingDto);
  }

  @Delete(':id')
  @Roles(Role.USER, Role.OWNER)
  @ApiOperation({ summary: 'Delete a waiting entry' })
  @ApiResponse({
    status: 200,
    description: 'Waiting entry deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.waitingsService.remove(+id);
  }
}
