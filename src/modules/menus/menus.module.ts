import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { Menu } from './entities/menu.entity';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MenuTranslationsModule } from '../menu-translations/menu-translations.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    MenuTranslationsModule,
    ConfigModule,
    BullModule.registerQueue({
      name: 'translation-queue',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      },
    }),
  ],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}
