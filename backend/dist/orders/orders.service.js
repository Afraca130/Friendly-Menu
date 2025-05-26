"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const restaurant_entity_1 = require("../restaurants/entities/restaurant.entity");
const restaurants_service_1 = require("../restaurants/restaurants.service");
let OrdersService = class OrdersService {
    ordersRepository;
    restaurantsService;
    constructor(ordersRepository, restaurantsService) {
        this.ordersRepository = ordersRepository;
        this.restaurantsService = restaurantsService;
    }
    async createOrder(user, restaurantId) {
        const restaurant = await this.restaurantsService.findOne(restaurantId);
        if (restaurant.status === restaurant_entity_1.RestaurantStatus.CLOSED) {
            throw new common_1.BadRequestException('Restaurant is closed');
        }
        if (restaurant.status === restaurant_entity_1.RestaurantStatus.BREAK_TIME) {
            const waitingNumber = restaurant.waitingCount + 1;
            await this.restaurantsService.updateWaitingCount(restaurantId, true);
            return this.ordersRepository.save({
                waitingNumber,
                status: order_entity_1.OrderStatus.WAITING,
                user,
                restaurant,
            });
        }
        if (restaurant.status === restaurant_entity_1.RestaurantStatus.WAITING) {
            const waitingNumber = restaurant.waitingCount + 1;
            await this.restaurantsService.updateWaitingCount(restaurantId, true);
            return this.ordersRepository.save({
                waitingNumber,
                status: order_entity_1.OrderStatus.WAITING,
                user,
                restaurant,
            });
        }
        if (restaurant.availableSeats > 0) {
            restaurant.availableSeats -= 1;
            await this.restaurantsService.updateSeats(restaurantId, restaurant.availableSeats);
            return this.ordersRepository.save({
                waitingNumber: 0,
                status: order_entity_1.OrderStatus.CONFIRMED,
                user,
                restaurant,
            });
        }
        throw new common_1.BadRequestException('No available seats');
    }
    async getOrdersByUser(userId) {
        return this.ordersRepository.find({
            where: { user: { id: userId } },
            relations: ['restaurant'],
            order: { createdAt: 'DESC' },
        });
    }
    async getOrdersByRestaurant(restaurantId) {
        return this.ordersRepository.find({
            where: { restaurant: { id: restaurantId } },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
    async updateOrderStatus(orderId, status) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['restaurant'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        order.status = status;
        return this.ordersRepository.save(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        restaurants_service_1.RestaurantsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map