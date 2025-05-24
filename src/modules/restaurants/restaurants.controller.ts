import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/restaurant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto, @Request() req) {
    return this.restaurantsService.create(createRestaurantDto, req.user);
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/waiting')
  updateWaiting(
    @Param('id') id: string,
    @Body('increment') increment: boolean,
  ) {
    return this.restaurantsService.updateWaitingCount(+id, increment);
  }
}
