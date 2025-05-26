import { Repository } from 'typeorm';
import { MenuTranslation } from './entities/menu-translation.entity';
import { ConfigService } from '@nestjs/config';
import { BaseService } from '../common/services/base.service';
export declare class MenuTranslationsService extends BaseService {
    private translationsRepository;
    private configService;
    private openai;
    constructor(translationsRepository: Repository<MenuTranslation>, configService: ConfigService);
    translateText(text: string, targetLanguage: string): Promise<MenuTranslation>;
    verifyTranslation(id: number, verified: boolean): Promise<MenuTranslation>;
    getUnverifiedTranslations(): Promise<MenuTranslation[]>;
}
