import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { RestaurantsService } from '../restaurants/restaurants.service';
export declare class OrdersService {
    private ordersRepository;
    private restaurantsService;
    constructor(ordersRepository: Repository<Order>, restaurantsService: RestaurantsService);
    createOrder(user: User, restaurantId: number): Promise<Order>;
    getOrdersByUser(userId: number): Promise<Order[]>;
    getOrdersByRestaurant(restaurantId: number): Promise<Order[]>;
    updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order>;
}
