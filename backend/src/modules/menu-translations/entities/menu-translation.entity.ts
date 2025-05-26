import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
} from 'typeorm';
import { Menu } from '../../menus/entities/menu.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
@Unique(['menu', 'targetLanguage', 'field']) // 메뉴, 언어, 필드 조합은 유니크해야 함
@Index(['menu', 'targetLanguage']) // 조회 성능 향상을 위한 인덱스
@Index(['targetLanguage', 'isVerified']) // 검증된 번역 조회를 위한 인덱스
export class MenuTranslation extends BaseEntity {
  @Column()
  originalText: string;

  @Column('text')
  translatedText: string;

  @Column({ length: 10 })
  targetLanguage: string;

  @Column({ length: 50 })
  field: string; // 'name', 'description' 등 번역된 필드 구분

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isInvalid: boolean; // 원본이 변경되어 재번역이 필요한 경우

  @Column({ type: 'timestamp', nullable: true })
  lastUsedAt: Date;

  @Column({ default: 0 })
  usageCount: number;

  @Column({ nullable: true })
  translatedBy: string; // 'openai', 'deepl', 'google', 'manual' 등

  @Column({ type: 'json', nullable: true })
  metadata: {
    model?: string;
    confidence?: number;
    alternativeTranslations?: string[];
    culturalNotes?: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Menu, (menu) => menu.translations, { onDelete: 'CASCADE' })
  menu: Menu;
}
