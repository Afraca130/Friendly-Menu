import { OrdersService } from './orders.service';
import { OrderStatus } from './entities/order.entity';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(req: any, restaurantId: string): Promise<import("./entities/order.entity").Order>;
    getMyOrders(req: any): Promise<import("./entities/order.entity").Order[]>;
    getRestaurantOrders(restaurantId: string): Promise<import("./entities/order.entity").Order[]>;
    updateOrderStatus(orderId: string, status: OrderStatus): Promise<import("./entities/order.entity").Order>;
}
