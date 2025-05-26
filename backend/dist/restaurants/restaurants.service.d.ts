import { Repository } from 'typeorm';
import { Restaurant, RestaurantStatus } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/restaurant.dto';
import { User } from '../users/entities/user.entity';
export declare class RestaurantsService {
    private restaurantsRepository;
    constructor(restaurantsRepository: Repository<Restaurant>);
    create(createRestaurantDto: CreateRestaurantDto, owner: User): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    findOne(id: number): Promise<Restaurant>;
    updateWaitingCount(id: number, increment: boolean): Promise<Restaurant>;
    updateSeats(id: number, availableSeats: number): Promise<Restaurant>;
    updateStatus(id: number, status: RestaurantStatus): Promise<Restaurant>;
}
