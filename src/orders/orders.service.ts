import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import {
  Restaurant,
  RestaurantStatus,
} from '../restaurants/entities/restaurant.entity';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private restaurantsService: RestaurantsService,
  ) {}

  async createOrder(user: User, restaurantId: number): Promise<Order> {
    const restaurant = await this.restaurantsService.findOne(restaurantId);

    // 영업 상태 확인
    if (restaurant.status === RestaurantStatus.CLOSED) {
      throw new BadRequestException('Restaurant is closed');
    }

    if (restaurant.status === RestaurantStatus.BREAK_TIME) {
      // 브레이크 타임일 경우 대기번호만 발급
      const waitingNumber = restaurant.waitingCount + 1;
      await this.restaurantsService.updateWaitingCount(restaurantId, true);

      return this.ordersRepository.save({
        waitingNumber,
        status: OrderStatus.WAITING,
        user,
        restaurant,
      });
    }

    // 대기자가 있는 경우
    if (restaurant.status === RestaurantStatus.WAITING) {
      const waitingNumber = restaurant.waitingCount + 1;
      await this.restaurantsService.updateWaitingCount(restaurantId, true);

      return this.ordersRepository.save({
        waitingNumber,
        status: OrderStatus.WAITING,
        user,
        restaurant,
      });
    }

    // 자리가 있는 경우
    if (restaurant.availableSeats > 0) {
      restaurant.availableSeats -= 1;
      await this.restaurantsService.updateSeats(
        restaurantId,
        restaurant.availableSeats,
      );

      return this.ordersRepository.save({
        waitingNumber: 0,
        status: OrderStatus.CONFIRMED,
        user,
        restaurant,
      });
    }

    throw new BadRequestException('No available seats');
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: ['restaurant'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOrdersByRestaurant(restaurantId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateOrderStatus(
    orderId: number,
    status: OrderStatus,
  ): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['restaurant'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = status;
    return this.ordersRepository.save(order);
  }
}
