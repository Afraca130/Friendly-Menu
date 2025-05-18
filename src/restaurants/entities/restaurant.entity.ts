import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Menu } from '../../menus/entities/menu.entity';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';

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

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus: Menu[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  @ManyToOne(() => User, (user) => user.restaurants)
  owner: User;
}
