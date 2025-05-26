import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
export declare class Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    restaurant: Restaurant;
}
