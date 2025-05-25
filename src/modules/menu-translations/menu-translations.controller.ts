import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MenuTranslationsService } from './menu-translations.service';
import { MenuTranslation } from './entities/menu-translation.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as SwaggerResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';

@ApiTags('menu-translations')
@ApiBearerAuth()
@Controller('menu-translations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenuTranslationsController {
  constructor(private readonly translationsService: MenuTranslationsService) {}

  @Post('translate')
  @Roles(Role.OWNER, Role.ADMIN)
  @ApiOperation({ summary: 'Translate menu text' })
  @SwaggerResponse({
    status: 200,
    description: 'Text translated successfully',
    type: MenuTranslation,
  })
  async translateText(
    @Body()
    body: {
      text: string;
      targetLanguage: string;
      menuId?: number;
      field?: string;
    },
  ): Promise<MenuTranslation> {
    return this.translationsService.translateText(
      body.text,
      body.targetLanguage,
      body.menuId,
      body.field,
    );
  }

  @Post('bulk-translate')
  @Roles(Role.OWNER, Role.ADMIN)
  @ApiOperation({ summary: 'Bulk translate multiple menus' })
  @SwaggerResponse({
    status: 200,
    description: 'Bulk translation initiated successfully',
  })
  async bulkTranslate(
    @Body() body: { menuIds: number[]; targetLanguages: string[] },
  ): Promise<{ message: string }> {
    await this.translationsService.bulkTranslate(
      body.menuIds,
      body.targetLanguages,
    );

    return {
      message: `Initiated translation for ${body.menuIds.length} menus into ${body.targetLanguages.length} languages`,
    };
  }

  @Put(':id/verify')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Verify a translation' })
  @SwaggerResponse({
    status: 200,
    description: 'Translation verified successfully',
    type: MenuTranslation,
  })
  async verifyTranslation(
    @Param('id') id: number,
    @Body() body: { verified: boolean },
  ): Promise<MenuTranslation> {
    return this.translationsService.verifyTranslation(id, body.verified);
  }

  @Get('unverified')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all unverified translations' })
  @ApiQuery({ name: 'language', required: false })
  @SwaggerResponse({
    status: 200,
    description: 'List of unverified translations',
    type: [MenuTranslation],
  })
  async getUnverifiedTranslations(
    @Query('language') language?: string,
  ): Promise<MenuTranslation[]> {
    return this.translationsService.getUnverifiedTranslations();
  }

  @Get('stats')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get translation statistics' })
  @SwaggerResponse({
    status: 200,
    description: 'Translation statistics',
  })
  async getTranslationStats(): Promise<any> {
    return this.translationsService.getTranslationStats();
  }

  @Post('invalidate')
  @Roles(Role.OWNER, Role.ADMIN)
  @ApiOperation({ summary: 'Invalidate translations for updated menu items' })
  @SwaggerResponse({
    status: 200,
    description: 'Translations invalidated successfully',
  })
  async invalidateTranslations(
    @Body() body: { menuId: number; fields: string[] },
  ): Promise<{ message: string }> {
    await this.translationsService.invalidateTranslations(
      body.menuId,
      body.fields,
    );

    return {
      message: `Invalidated translations for menu ${body.menuId} fields: ${body.fields.join(', ')}`,
    };
  }
}
