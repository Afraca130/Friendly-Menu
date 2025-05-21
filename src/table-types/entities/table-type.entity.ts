import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity()
export class TableType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  typeName: string;

  @Column()
  capacity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.tableTypes)
  restaurant: Restaurant;

  @OneToMany(() => Reservation, (reservation) => reservation.tableType)
  reservations: Reservation[];
}
