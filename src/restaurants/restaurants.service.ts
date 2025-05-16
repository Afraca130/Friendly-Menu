import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/restaurant.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  async create(
    createRestaurantDto: CreateRestaurantDto,
    owner: User,
  ): Promise<Restaurant> {
    const restaurant = this.restaurantsRepository.create({
      ...createRestaurantDto,
      owner,
    });
    return this.restaurantsRepository.save(restaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantsRepository.find({
      relations: ['menus', 'owner'],
    });
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.findOne({
      where: { id },
      relations: ['menus', 'owner'],
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async updateWaitingCount(
    id: number,
    increment: boolean,
  ): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    restaurant.waitingCount += increment ? 1 : -1;
    return this.restaurantsRepository.save(restaurant);
  }
}
