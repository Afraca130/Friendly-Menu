import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

export enum WaitingStatus {
  WAITING = 'WAITING',
  ENTERED = 'ENTERED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Waiting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  waitingTime: Date;

  @Column()
  peopleCount: number;

  @Column({
    type: 'enum',
    enum: WaitingStatus,
    default: WaitingStatus.WAITING,
  })
  status: WaitingStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.waitings)
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.waitings)
  restaurant: Restaurant;
}
