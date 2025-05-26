import { Entity, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
export class Favorite extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.favorites)
  restaurant: Restaurant;
}
