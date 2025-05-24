import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuTranslation } from './entities/menu-translation.entity';
import { MenuTranslationsService } from './menu-translations.service';
import { MenuTranslationsController } from './menu-translations.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([MenuTranslation]), ConfigModule],
  providers: [MenuTranslationsService],
  controllers: [MenuTranslationsController],
  exports: [MenuTranslationsService],
})
export class MenuTranslationsModule {}
