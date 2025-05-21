import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Menu } from '../../menus/entities/menu.entity';

@Entity()
export class MenuTranslation {
  @PrimaryGeneratedColumn()
  id: number;

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
