import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { BaseEntity } from '../../common/entities/base.entity';

export enum WaitingStatus {
  WAITING = 'WAITING',
  ENTERED = 'ENTERED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Waiting extends BaseEntity {
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
