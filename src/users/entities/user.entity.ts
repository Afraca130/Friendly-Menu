import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];
}
