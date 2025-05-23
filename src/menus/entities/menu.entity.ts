import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { MenuTranslation } from '../../menu-translations/entities/menu-translation.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Menu extends BaseEntity {
  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('text')
  description: string;

  @Column()
  imageUrl: string;

  @Column({ default: true })
  isAvailable: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus)
  restaurant: Restaurant;

  @OneToMany(() => MenuTranslation, (translation) => translation.menu)
  translations: MenuTranslation[];
}
