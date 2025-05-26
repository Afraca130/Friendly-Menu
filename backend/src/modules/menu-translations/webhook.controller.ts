import {
  Controller,
  Post,
  Body,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { createHmac } from 'crypto';
import { ConfigService } from '@nestjs/config';

interface McpTranslationWebhookPayload {
  event:
    | 'translation.completed'
    | 'translation.failed'
    | 'translation.verified';
  menuId: number;
  field: string;
  sourceLanguage: string;
  targetLanguage: string;
  originalText: string;
  translatedText?: string;
  error?: string;
  metadata?: {
    confidence?: number;
    alternativeTranslations?: string[];
    culturalNotes?: string;
  };
}

@ApiTags('webhooks')
@Controller('webhooks/mcp')
export class TranslationWebhookController {
  private webhookSecret: string;

  constructor(
    @InjectQueue('translation-queue') private translationQueue: Queue,
    private configService: ConfigService,
  ) {
    this.webhookSecret =
      this.configService.get<string>('MCP_WEBHOOK_SECRET') || '';
  }

  @Post('translation')
  @ApiOperation({ summary: 'Handle MCP translation webhook' })
  @ApiHeader({
    name: 'x-mcp-signature',
    description: 'HMAC signature for webhook validation',
    required: true,
  })
  async handleTranslationWebhook(
    @Body() payload: McpTranslationWebhookPayload,
    @Headers('x-mcp-signature') signature: string,
  ) {
    // 서명 검증
    if (!this.verifyWebhookSignature(payload, signature)) {
      throw new HttpException('Invalid signature', HttpStatus.UNAUTHORIZED);
    }

    console.log('Received MCP translation webhook:', payload.event);

    switch (payload.event) {
      case 'translation.completed':
        await this.handleTranslationCompleted(payload);
        break;

      case 'translation.failed':
        await this.handleTranslationFailed(payload);
        break;

      case 'translation.verified':
        await this.handleTranslationVerified(payload);
        break;

      default:
        throw new HttpException('Unknown event type', HttpStatus.BAD_REQUEST);
    }

    return { received: true };
  }

  private verifyWebhookSignature(payload: any, signature: string): boolean {
    const expectedSignature = createHmac('sha256', this.webhookSecret)
      .update(JSON.stringify(payload))
      .digest('hex');

    return signature === `sha256=${expectedSignature}`;
  }

  private async handleTranslationCompleted(
    payload: McpTranslationWebhookPayload,
  ) {
    // 번역 완료 처리 로직
    // 예: 번역 결과를 DB에 저장하거나 캐시 업데이트
    console.log(
      `Translation completed for menu ${payload.menuId}, field ${payload.field}`,
    );
  }

  private async handleTranslationFailed(payload: McpTranslationWebhookPayload) {
    // 번역 실패 처리 로직
    // 예: 재시도 큐에 추가
    console.error(
      `Translation failed for menu ${payload.menuId}, field ${payload.field}: ${payload.error}`,
    );

    // 재시도 큐에 추가
    await this.translationQueue.add(
      'translate-menu',
      {
        menuId: payload.menuId,
        texts: [{ field: payload.field, text: payload.originalText }],
        targetLanguages: [payload.targetLanguage],
      },
      {
        delay: 5000, // 5초 후 재시도
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      },
    );
  }

  private async handleTranslationVerified(
    payload: McpTranslationWebhookPayload,
  ) {
    // 번역 검증 완료 처리
    console.log(
      `Translation verified for menu ${payload.menuId}, field ${payload.field}`,
    );
  }
}
