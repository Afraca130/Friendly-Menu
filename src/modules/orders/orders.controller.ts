import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrderStatus } from './entities/order.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('restaurant/:restaurantId')
  createOrder(@Request() req, @Param('restaurantId') restaurantId: string) {
    return this.ordersService.createOrder(req.user, +restaurantId);
  }

  @Get('my-orders')
  getMyOrders(@Request() req) {
    return this.ordersService.getOrdersByUser(req.user.id);
  }

  @Get('restaurant/:restaurantId')
  getRestaurantOrders(@Param('restaurantId') restaurantId: string) {
    return this.ordersService.getOrdersByRestaurant(+restaurantId);
  }

  @Post(':orderId/status')
  updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body('status') status: OrderStatus,
  ) {
    return this.ordersService.updateOrderStatus(+orderId, status);
  }
}
