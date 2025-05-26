import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/restaurant.dto';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    create(createRestaurantDto: CreateRestaurantDto, req: any): Promise<import("./entities/restaurant.entity").Restaurant>;
    findAll(): Promise<import("./entities/restaurant.entity").Restaurant[]>;
    findOne(id: string): Promise<import("./entities/restaurant.entity").Restaurant>;
    updateWaiting(id: string, increment: boolean): Promise<import("./entities/restaurant.entity").Restaurant>;
}
