import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantRepository } from '../../infrastructure/repositories/restaurant.repository';
import { RestaurantController } from '../../interfaces/controllers/restaurant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    {
      provide: 'IRestaurantRepository',
      useClass: RestaurantRepository,
    },
  ],
  exports: [RestaurantService],
})
export class RestaurantModule {}
