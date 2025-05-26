import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Order } from '../../orders/entities/order.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Waiting } from '../../waitings/entities/waiting.entity';
import { Review } from '../../reviews/entities/review.entity';
import { PointTransaction } from '../../points/entities/point-transaction.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
export declare enum JoinType {
    EMAIL = "EMAIL",
    KAKAO = "KAKAO"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    isActive: boolean;
    joinType: JoinType;
    kakaoId: string;
    phoneNumber: string;
    points: number;
    createdAt: Date;
    updatedAt: Date;
    restaurants: Restaurant[];
    orders: Order[];
    reservations: Reservation[];
    waitings: Waiting[];
    reviews: Review[];
    pointTransactions: PointTransaction[];
    favorites: Favorite[];
}
