import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { RestaurantService } from '../../core/domain/services/restaurant.service';
import { Restaurant } from '../../core/domain/entities/restaurant.entity';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async createRestaurant(
    @Body() data: Partial<Restaurant>,
  ): Promise<Restaurant> {
    return this.restaurantService.createRestaurant(data);
  }

  @Get(':id')
  async getRestaurant(@Param('id') id: string): Promise<Restaurant | null> {
    return this.restaurantService.getRestaurantById(id);
  }

  @Get()
  async getAllRestaurants(
    @Query('cuisine') cuisine?: string,
    @Query('priceRange') priceRange?: string,
    @Query('minRating') minRating?: number,
    @Query('search') search?: string,
  ): Promise<Restaurant[]> {
    if (search) {
      return this.restaurantService.searchRestaurants(search);
    }
    if (cuisine) {
      return this.restaurantService.getRestaurantsByCuisine(cuisine);
    }
    if (priceRange) {
      return this.restaurantService.getRestaurantsByPriceRange(priceRange);
    }
    if (minRating) {
      return this.restaurantService.getRestaurantsByRating(minRating);
    }
    return this.restaurantService.getAllRestaurants();
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id') id: string,
    @Body() data: Partial<Restaurant>,
  ): Promise<Restaurant> {
    return this.restaurantService.updateRestaurant(id, data);
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: string): Promise<void> {
    return this.restaurantService.deleteRestaurant(id);
  }
}
