import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { MenuTranslation } from '../../menu-translations/entities/menu-translation.entity';
import { BaseEntity } from '../../../common/entities/base.entity';
import { MenuCategory, DietaryRestriction } from '../dto/create-menu.dto';

@Entity()
@Index(['restaurant', 'isAvailable']) // 레스토랑별 활성 메뉴 조회 최적화
@Index(['category', 'isAvailable']) // 카테고리별 조회 최적화
export class Menu extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('text')
  description: string;

  @Column()
  imageUrl: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({
    type: 'enum',
    enum: MenuCategory,
    nullable: true,
  })
  category: MenuCategory;

  @Column('simple-array', { nullable: true })
  dietaryRestrictions: DietaryRestriction[];

  @Column('simple-array', { nullable: true })
  allergens: string[];

  @Column({ nullable: true })
  calories: number;

  @Column({ nullable: true })
  preparationTime: number; // in minutes

  @Column({ nullable: true })
  spicyLevel: number; // 0-5 scale

  @Column({ default: 'ko', length: 10 })
  sourceLanguage: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  orderCount: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number; // 평균 평점

  @Column({ default: 0 })
  ratingCount: number; // 평점 개수

  @Column({ type: 'json', nullable: true })
  nutritionInfo: {
    protein?: number;
    carbohydrates?: number;
    fat?: number;
    fiber?: number;
    sodium?: number;
    sugar?: number;
  };

  @Column({ type: 'json', nullable: true })
  customFields: Record<string, any>; // 레스토랑별 커스텀 필드

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @OneToMany(() => MenuTranslation, (translation) => translation.menu, {
    cascade: true,
  })
  translations: MenuTranslation[];
}
