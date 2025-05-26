import { User } from '../../users/entities/user.entity';
export declare class PointTransaction {
    id: number;
    amount: number;
    description: string;
    createdAt: Date;
    user: User;
}
