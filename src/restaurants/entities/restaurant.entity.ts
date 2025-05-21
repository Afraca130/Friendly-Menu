import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Menu } from '../../menus/entities/menu.entity';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';
import { TableType } from '../../table-types/entities/table-type.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { Waiting } from '../../waitings/entities/waiting.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';

export enum RestaurantStatus {
  MANY_SEATS = 'MANY_SEATS',
  NORMAL = 'NORMAL',
  WAITING = 'WAITING',
  CLOSED = 'CLOSED',
  BREAK_TIME = 'BREAK_TIME',
}

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column('text')
  description: string;

  @Column()
  businessHours: string;

  @Column()
  imageUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'time' })
  openTime: string;

  @Column({ type: 'time' })
  closeTime: string;

  @Column({ type: 'time', nullable: true })
  breakStartTime: string;

  @Column({ type: 'time', nullable: true })
  breakEndTime: string;

  @Column({ type: 'int', default: 0 })
  waitingCount: number;

  @Column({
    type: 'enum',
    enum: RestaurantStatus,
    default: RestaurantStatus.CLOSED,
  })
  status: RestaurantStatus;

  @Column({ type: 'int', default: 0 })
  totalSeats: number;

  @Column({ type: 'int', default: 0 })
  availableSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus: Menu[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  @ManyToOne(() => User, (user) => user.restaurants)
  owner: User;

  @OneToMany(() => TableType, (tableType) => tableType.restaurant)
  tableTypes: TableType[];

  @OneToMany(() => Reservation, (reservation) => reservation.restaurant)
  reservations: Reservation[];

  @OneToMany(() => Waiting, (waiting) => waiting.restaurant)
  waitings: Waiting[];

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];

  @OneToMany(() => Favorite, (favorite) => favorite.restaurant)
  favorites: Favorite[];
}
