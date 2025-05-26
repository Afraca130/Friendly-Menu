import { Menu } from '../../menus/entities/menu.entity';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';
import { TableType } from '../../table-types/entities/table-type.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Waiting } from '../../waitings/entities/waiting.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
export declare enum RestaurantStatus {
    MANY_SEATS = "MANY_SEATS",
    NORMAL = "NORMAL",
    WAITING = "WAITING",
    CLOSED = "CLOSED",
    BREAK_TIME = "BREAK_TIME"
}
export declare class Restaurant {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    description: string;
    businessHours: string;
    imageUrl: string;
    isActive: boolean;
    openTime: string;
    closeTime: string;
    breakStartTime: string;
    breakEndTime: string;
    waitingCount: number;
    status: RestaurantStatus;
    totalSeats: number;
    availableSeats: number;
    createdAt: Date;
    updatedAt: Date;
    menus: Menu[];
    orders: Order[];
    owner: User;
    tableTypes: TableType[];
    reservations: Reservation[];
    waitings: Waiting[];
    reviews: Review[];
    favorites: Favorite[];
}
