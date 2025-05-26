import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { MenuTranslation } from './entities/menu-translation.entity';
import { ConfigService } from '@nestjs/config';
import { BaseService } from '../../common/services/base.service';
import OpenAI from 'openai';
import * as deepl from 'deepl-node';

@Injectable()
export class MenuTranslationsService extends BaseService {
  private openai: OpenAI;
  private deepl: deepl.Translator | null = null;
  private primaryTranslator: string;

  constructor(
    @InjectRepository(MenuTranslation)
    private translationsRepository: Repository<MenuTranslation>,
    private configService: ConfigService,
  ) {
    super();

    // OpenAI 설정
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });

    // DeepL 설정 (선택적)
    const deeplApiKey = this.configService.get<string>('DEEPL_API_KEY');
    if (deeplApiKey) {
      this.deepl = new deepl.Translator(deeplApiKey);
    }

    // 기본 번역기 설정
    this.primaryTranslator = this.configService.get<string>(
      'PRIMARY_TRANSLATOR',
      'openai',
    );
  }

  async translateText(
    text: string,
    targetLanguage: string,
    menuId?: number,
    field?: string,
  ): Promise<MenuTranslation> {
    return this.handleAsync(async () => {
      // 캐시 확인
      if (menuId && field) {
        const cachedTranslation = await this.translationsRepository.findOne({
          where: {
            menu: { id: menuId },
            targetLanguage,
            field,
            isInvalid: false,
          },
        });

        if (cachedTranslation) {
          // 사용 통계 업데이트
          cachedTranslation.usageCount += 1;
          cachedTranslation.lastUsedAt = new Date();
          return this.translationsRepository.save(cachedTranslation);
        }
      }

      // 번역 수행
      let translatedText: string;
      let translatedBy: string;
      let metadata: any = {};

      if (this.primaryTranslator === 'deepl' && this.deepl) {
        try {
          const result = await this.translateWithDeepL(text, targetLanguage);
          translatedText = result.text;
          translatedBy = 'deepl';
          metadata = result.metadata;
        } catch (error) {
          console.error(
            'DeepL translation failed, falling back to OpenAI:',
            error,
          );
          const result = await this.translateWithOpenAI(
            text,
            targetLanguage,
            field,
          );
          translatedText = result.text;
          translatedBy = 'openai';
          metadata = result.metadata;
        }
      } else {
        const result = await this.translateWithOpenAI(
          text,
          targetLanguage,
          field,
        );
        translatedText = result.text;
        translatedBy = 'openai';
        metadata = result.metadata;
      }

      // 번역 결과 저장
      const translation = this.translationsRepository.create({
        originalText: text,
        translatedText,
        targetLanguage,
        field: field || 'general',
        usageCount: 1,
        lastUsedAt: new Date(),
        translatedBy,
        metadata,
        ...(menuId && { menu: { id: menuId } }),
      });

      return this.translationsRepository.save(translation);
    }, 'Translation failed');
  }

  private async translateWithOpenAI(
    text: string,
    targetLanguage: string,
    field?: string,
  ): Promise<{ text: string; metadata: any }> {
    const languageNames: { [key: string]: string } = {
      en: 'English',
      ja: 'Japanese',
      'zh-CN': 'Simplified Chinese',
      'zh-TW': 'Traditional Chinese',
      ko: 'Korean',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      it: 'Italian',
      pt: 'Portuguese',
      ru: 'Russian',
      ar: 'Arabic',
      hi: 'Hindi',
      th: 'Thai',
      vi: 'Vietnamese',
    };

    const systemPrompt =
      field === 'name'
        ? `You are a professional menu translator specializing in culinary terminology. Translate menu item names to ${languageNames[targetLanguage] || targetLanguage} while preserving the essence and appeal of the dish. Consider cultural context and local food preferences. Keep translations concise and appetizing.`
        : `You are a professional menu translator. Translate the following restaurant menu description to ${languageNames[targetLanguage] || targetLanguage}. Maintain the appetizing nature of the description while ensuring cultural appropriateness. Include any allergen or dietary information accurately.`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Translate this ${field || 'text'}: "${text}"`,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const translatedText = completion.choices[0].message.content?.trim() || '';

    // 문화적 맥락이나 대체 번역 제안을 위한 추가 요청 (선택적)
    let culturalNotes = '';
    if (field === 'name') {
      try {
        const culturalCompletion = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'Provide brief cultural notes or serving suggestions for this dish in the target culture if relevant.',
            },
            {
              role: 'user',
              content: `Dish: "${text}" translated to ${languageNames[targetLanguage]}: "${translatedText}"`,
            },
          ],
          temperature: 0.5,
          max_tokens: 150,
        });
        culturalNotes =
          culturalCompletion.choices[0].message.content?.trim() || '';
      } catch (error) {
        console.error('Failed to get cultural notes:', error);
      }
    }

    return {
      text: translatedText,
      metadata: {
        model: 'gpt-4-turbo-preview',
        culturalNotes: culturalNotes || undefined,
      },
    };
  }

  private async translateWithDeepL(
    text: string,
    targetLanguage: string,
  ): Promise<{ text: string; metadata: any }> {
    if (!this.deepl) {
      throw new Error('DeepL translator not initialized');
    }

    // DeepL 언어 코드 매핑
    const deeplLanguageMap: { [key: string]: deepl.TargetLanguageCode } = {
      'zh-CN': 'zh',
      'zh-TW': 'zh',
      // 다른 언어 매핑 추가
    };

    const targetLang = (deeplLanguageMap[targetLanguage] ||
      targetLanguage) as deepl.TargetLanguageCode;

    const result = await this.deepl.translateText(text, null, targetLang);

    return {
      text: result.text,
      metadata: {
        service: 'deepl',
      },
    };
  }

  async verifyTranslation(
    id: number,
    verified: boolean,
  ): Promise<MenuTranslation> {
    return this.handleAsync(async () => {
      const translation = await this.translationsRepository.findOne({
        where: { id },
      });

      if (!translation) {
        throw new NotFoundException('Translation not found');
      }

      translation.isVerified = verified;
      return this.translationsRepository.save(translation);
    }, 'Failed to verify translation');
  }

  async getUnverifiedTranslations(): Promise<MenuTranslation[]> {
    return this.handleAsync(async () => {
      return this.translationsRepository.find({
        where: { isVerified: false, isInvalid: false },
        relations: ['menu'],
        order: { createdAt: 'DESC' },
        take: 100, // 한 번에 100개까지만 조회
      });
    }, 'Failed to fetch unverified translations');
  }

  async invalidateTranslations(
    menuId: number,
    fields: string[],
  ): Promise<void> {
    await this.translationsRepository.update(
      {
        menu: { id: menuId },
        field: In(fields),
      },
      { isInvalid: true },
    );
  }

  async getTranslationStats(): Promise<any> {
    const stats = await this.translationsRepository
      .createQueryBuilder('translation')
      .select('translation.targetLanguage', 'language')
      .addSelect('translation.isVerified', 'verified')
      .addSelect('COUNT(*)', 'count')
      .groupBy('translation.targetLanguage')
      .addGroupBy('translation.isVerified')
      .getRawMany();

    return stats;
  }

  async bulkTranslate(
    menuIds: number[],
    targetLanguages: string[],
  ): Promise<void> {
    // 메뉴 정보 조회
    const menus = await this.translationsRepository.manager
      .createQueryBuilder('menu', 'Menu')
      .whereInIds(menuIds)
      .getMany();

    const translationPromises = [];

    for (const menu of menus) {
      for (const language of targetLanguages) {
        // name 번역
        if (menu.name) {
          translationPromises.push(
            this.translateText(menu.name, language, menu.id, 'name'),
          );
        }
        // description 번역
        if (menu.description) {
          translationPromises.push(
            this.translateText(
              menu.description,
              language,
              menu.id,
              'description',
            ),
          );
        }
      }
    }

    // 병렬 처리 (한 번에 10개씩)
    const chunkSize = 10;
    for (let i = 0; i < translationPromises.length; i += chunkSize) {
      const chunk = translationPromises.slice(i, i + chunkSize);
      await Promise.allSettled(chunk);
    }
  }
}
