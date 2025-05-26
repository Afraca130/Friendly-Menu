import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { TableType } from '../../table-types/entities/table-type.entity';
export declare enum ReservationStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED"
}
export declare class Reservation {
    id: number;
    reservationTime: Date;
    peopleCount: number;
    status: ReservationStatus;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    restaurant: Restaurant;
    tableType: TableType;
}
