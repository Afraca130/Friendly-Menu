import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Waiting } from './entities/waiting.entity';
import { WaitingsService } from './waitings.service';
import { WaitingsController } from './waitings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Waiting])],
  controllers: [WaitingsController],
  providers: [WaitingsService],
  exports: [WaitingsService],
})
export class WaitingsModule {}
