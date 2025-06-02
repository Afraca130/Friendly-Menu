import { Restaurant } from '../entities/restaurant.entity';
import { IRestaurantRepository } from '../repositories/restaurant.repository.interface';

export class RestaurantService {
  constructor(private readonly restaurantRepository: IRestaurantRepository) {}

  async createRestaurant(data: Partial<Restaurant>): Promise<Restaurant> {
    return this.restaurantRepository.create(data);
  }

  async getRestaurantById(id: string): Promise<Restaurant | null> {
    return this.restaurantRepository.findById(id);
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantRepository.findAll();
  }

  async updateRestaurant(
    id: string,
    data: Partial<Restaurant>,
  ): Promise<Restaurant> {
    return this.restaurantRepository.update(id, data);
  }

  async deleteRestaurant(id: string): Promise<void> {
    return this.restaurantRepository.delete(id);
  }

  async searchRestaurants(name: string): Promise<Restaurant[]> {
    return this.restaurantRepository.searchByName(name);
  }

  async getRestaurantsByCuisine(cuisine: string): Promise<Restaurant[]> {
    return this.restaurantRepository.findByCuisine(cuisine);
  }

  async getRestaurantsByPriceRange(priceRange: string): Promise<Restaurant[]> {
    return this.restaurantRepository.findByPriceRange(priceRange);
  }

  async getRestaurantsByRating(minRating: number): Promise<Restaurant[]> {
    return this.restaurantRepository.findByRating(minRating);
  }
}
