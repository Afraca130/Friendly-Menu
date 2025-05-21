import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { MenuTranslationsService } from './menu-translations.service';
import { MenuTranslation } from './entities/menu-translation.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as SwaggerResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BaseController } from '../common/controllers/base.controller';

@ApiTags('menu-translations')
@ApiBearerAuth()
@Controller('menu-translations')
export class MenuTranslationsController extends BaseController {
  constructor(private readonly translationsService: MenuTranslationsService) {
    super(translationsService);
  }

  @Post('translate')
  @ApiOperation({ summary: 'Translate menu text' })
  @SwaggerResponse({
    status: 200,
    description: 'Text translated successfully',
    type: MenuTranslation,
  })
  @SwaggerResponse({
    status: 400,
    description: 'Invalid input or translation failed',
  })
  async translateText(
    @Body() body: { text: string; targetLanguage: string },
  ): Promise<MenuTranslation> {
    return this.translationsService.translateText(
      body.text,
      body.targetLanguage,
    );
  }

  @Put(':id/verify')
  @ApiOperation({ summary: 'Verify a translation' })
  @SwaggerResponse({
    status: 200,
    description: 'Translation verified successfully',
    type: MenuTranslation,
  })
  @SwaggerResponse({
    status: 404,
    description: 'Translation not found',
  })
  async verifyTranslation(
    @Param('id') id: number,
    @Body() body: { verified: boolean },
  ): Promise<MenuTranslation> {
    return this.translationsService.verifyTranslation(id, body.verified);
  }

  @Get('unverified')
  @ApiOperation({ summary: 'Get all unverified translations' })
  @SwaggerResponse({
    status: 200,
    description: 'List of unverified translations',
    type: [MenuTranslation],
  })
  async getUnverifiedTranslations(): Promise<MenuTranslation[]> {
    return this.translationsService.getUnverifiedTranslations();
  }
}
