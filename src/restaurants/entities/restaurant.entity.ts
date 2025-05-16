import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Menu } from '../../menus/entities/menu.entity';
import { User } from '../../users/entities/user.entity';

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

  @Column({ type: 'int', default: 0 })
  waitingCount: number;

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus: Menu[];

  @ManyToOne(() => User, (user) => user.restaurants)
  owner: User;
}
