import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Order } from '../../orders/entities/order.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Waiting } from '../../waitings/entities/waiting.entity';
import { Review } from '../../reviews/entities/review.entity';
import { PointTransaction } from '../../points/entities/point-transaction.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

export enum JoinType {
  EMAIL = 'EMAIL',
  KAKAO = 'KAKAO',
}

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: JoinType,
    default: JoinType.EMAIL,
  })
  joinType: JoinType;

  @Column({ nullable: true })
  kakaoId: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  points: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Waiting, (waiting) => waiting.user)
  waitings: Waiting[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(
    () => PointTransaction,
    (pointTransaction) => pointTransaction.user,
  )
  pointTransactions: PointTransaction[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];
}
