import { Menu } from '../../menus/entities/menu.entity';
export declare class MenuTranslation {
    id: number;
    originalText: string;
    translatedText: string;
    targetLanguage: string;
    isVerified: boolean;
    lastUsedAt: Date;
    usageCount: number;
    createdAt: Date;
    updatedAt: Date;
    menu: Menu;
}
