import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Menu } from '../../menus/entities/menu.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class MenuTranslation extends BaseEntity {
  @Column()
  originalText: string;

  @Column()
  translatedText: string;

  @Column()
  targetLanguage: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastUsedAt: Date;

  @Column({ default: 0 })
  usageCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Menu, (menu) => menu.translations)
  menu: Menu;
}
