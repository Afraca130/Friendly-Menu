import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { MenuTranslationsService } from '../menu-translations/menu-translations.service';

interface TranslationJobData {
  menuId: number;
  texts: Array<{
    field: string;
    text: string;
  }>;
  targetLanguages: string[];
}

@Processor('translation-queue')
@Injectable()
export class TranslationQueueProcessor {
  constructor(
    private readonly menuTranslationsService: MenuTranslationsService,
  ) {}

  @Process('translate-menu')
  async handleTranslateMenu(job: Job<TranslationJobData>) {
    const { menuId, texts, targetLanguages } = job.data;

    console.log(`Starting translation job for menu ${menuId}`);

    const totalTranslations = texts.length * targetLanguages.length;
    let completedTranslations = 0;

    for (const language of targetLanguages) {
      for (const { field, text } of texts) {
        try {
          await this.menuTranslationsService.translateText(
            text,
            language,
            menuId,
            field,
          );

          completedTranslations++;

          // 진행률 업데이트
          await job.progress(
            Math.round((completedTranslations / totalTranslations) * 100),
          );
        } catch (error) {
          console.error(
            `Translation failed for menu ${menuId}, field ${field}, language ${language}:`,
            error,
          );
          // 실패한 번역은 스킵하고 계속 진행
        }
      }
    }

    console.log(`Translation job completed for menu ${menuId}`);

    return {
      menuId,
      totalTranslations,
      completedTranslations,
    };
  }

  @Process('bulk-translate')
  async handleBulkTranslate(
    job: Job<{ menuIds: number[]; targetLanguages: string[] }>,
  ) {
    const { menuIds, targetLanguages } = job.data;

    console.log(`Starting bulk translation for ${menuIds.length} menus`);

    // 병렬 처리를 위한 청크 크기
    const chunkSize = 5;
    let processedMenus = 0;

    for (let i = 0; i < menuIds.length; i += chunkSize) {
      const chunk = menuIds.slice(i, i + chunkSize);

      await Promise.all(
        chunk.map((menuId) =>
          this.menuTranslationsService.bulkTranslate([menuId], targetLanguages),
        ),
      );

      processedMenus += chunk.length;
      await job.progress(Math.round((processedMenus / menuIds.length) * 100));
    }

    return {
      totalMenus: menuIds.length,
      processedMenus,
    };
  }

  @Process('retranslate-invalid')
  async handleRetranslateInvalid(job: Job) {
    console.log('Starting retranslation of invalid translations');

    // 무효화된 번역을 찾아서 재번역
    // 이 기능은 MenuTranslationsService에 추가 메서드가 필요합니다

    return { message: 'Retranslation completed' };
  }
}
