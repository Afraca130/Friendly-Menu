import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
export class TableType extends BaseEntity {
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
