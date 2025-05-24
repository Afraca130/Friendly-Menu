import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuTranslation } from './entities/menu-translation.entity';
import { Configuration, OpenAIApi } from 'openai';
import { ConfigService } from '@nestjs/config';
import { BaseService } from '../../common/services/base.service';

@Injectable()
export class MenuTranslationsService extends BaseService {
  private openai: OpenAIApi;

  constructor(
    @InjectRepository(MenuTranslation)
    private translationsRepository: Repository<MenuTranslation>,
    private configService: ConfigService,
  ) {
    super();
    const configuration = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(configuration);
  }

  async translateText(
    text: string,
    targetLanguage: string,
  ): Promise<MenuTranslation> {
    return this.handleAsync(async () => {
      // Check cache first
      const cachedTranslation = await this.translationsRepository.findOne({
        where: {
          originalText: text,
          targetLanguage,
        },
      });

      if (cachedTranslation) {
        // Update usage statistics
        cachedTranslation.usageCount += 1;
        cachedTranslation.lastUsedAt = new Date();
        return this.translationsRepository.save(cachedTranslation);
      }

      // If not in cache, translate using OpenAI
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Translate the following text to ${targetLanguage}. Maintain the original meaning and context.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
      });

      const translatedText = completion.data.choices[0].message.content;

      // Save to database
      const translation = this.translationsRepository.create({
        originalText: text,
        translatedText,
        targetLanguage,
        usageCount: 1,
        lastUsedAt: new Date(),
      });

      return this.translationsRepository.save(translation);
    }, 'Translation failed');
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
        where: { isVerified: false },
        order: { createdAt: 'DESC' },
      });
    }, 'Failed to fetch unverified translations');
  }
}
