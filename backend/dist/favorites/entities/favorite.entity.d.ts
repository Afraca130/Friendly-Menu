import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
export declare class Favorite {
    id: number;
    createdAt: Date;
    user: User;
    restaurant: Restaurant;
}
