import { IBaseRepository } from './base.repository.interface';
import { Restaurant } from '../entities/restaurant.entity';

export interface IRestaurantRepository extends IBaseRepository<Restaurant> {
  findByCuisine(cuisine: string): Promise<Restaurant[]>;
  findByPriceRange(priceRange: string): Promise<Restaurant[]>;
  searchByName(name: string): Promise<Restaurant[]>;
  findByRating(minRating: number): Promise<Restaurant[]>;
}
