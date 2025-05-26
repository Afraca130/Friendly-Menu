import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
export declare enum OrderStatus {
    WAITING = "WAITING",
    CONFIRMED = "CONFIRMED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class Order {
    id: number;
    waitingNumber: number;
    status: OrderStatus;
    createdAt: Date;
    user: User;
    restaurant: Restaurant;
}
