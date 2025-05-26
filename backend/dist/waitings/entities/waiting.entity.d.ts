import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
export declare enum WaitingStatus {
    WAITING = "WAITING",
    ENTERED = "ENTERED",
    CANCELLED = "CANCELLED"
}
export declare class Waiting {
    id: number;
    waitingTime: Date;
    peopleCount: number;
    status: WaitingStatus;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    restaurant: Restaurant;
}
