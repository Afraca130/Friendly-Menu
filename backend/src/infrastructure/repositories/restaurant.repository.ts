import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../../core/domain/entities/restaurant.entity';
import { IRestaurantRepository } from '../../core/domain/repositories/restaurant.repository.interface';

@Injectable()
export class RestaurantRepository implements IRestaurantRepository {
  constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<Restaurant>,
  ) {}

  async findById(id: string): Promise<Restaurant | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Restaurant[]> {
    return this.repository.find();
  }

  async create(data: Partial<Restaurant>): Promise<Restaurant> {
    const restaurant = this.repository.create(data);
    return this.repository.save(restaurant);
  }

  async update(id: string, data: Partial<Restaurant>): Promise<Restaurant> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByCuisine(cuisine: string): Promise<Restaurant[]> {
    return this.repository.find({ where: { cuisine } });
  }

  async findByPriceRange(priceRange: string): Promise<Restaurant[]> {
    return this.repository.find({ where: { priceRange } });
  }

  async searchByName(name: string): Promise<Restaurant[]> {
    return this.repository
      .createQueryBuilder('restaurant')
      .where('restaurant.name ILIKE :name', { name: `%${name}%` })
      .getMany();
  }

  async findByRating(minRating: number): Promise<Restaurant[]> {
    return this.repository
      .createQueryBuilder('restaurant')
      .where('restaurant.rating >= :minRating', { minRating })
      .getMany();
  }
}
