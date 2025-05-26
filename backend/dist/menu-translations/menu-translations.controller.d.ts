import { MenuTranslationsService } from './menu-translations.service';
import { MenuTranslation } from './entities/menu-translation.entity';
import { BaseController } from '../common/controllers/base.controller';
export declare class MenuTranslationsController extends BaseController {
    private readonly translationsService;
    constructor(translationsService: MenuTranslationsService);
    translateText(body: {
        text: string;
        targetLanguage: string;
    }): Promise<MenuTranslation>;
    verifyTranslation(id: number, body: {
        verified: boolean;
    }): Promise<MenuTranslation>;
    getUnverifiedTranslations(): Promise<MenuTranslation[]>;
}
