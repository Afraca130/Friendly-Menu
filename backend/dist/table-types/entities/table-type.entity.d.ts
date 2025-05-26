import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
export declare class TableType {
    id: number;
    typeName: string;
    capacity: number;
    createdAt: Date;
    updatedAt: Date;
    restaurant: Restaurant;
    reservations: Reservation[];
}
