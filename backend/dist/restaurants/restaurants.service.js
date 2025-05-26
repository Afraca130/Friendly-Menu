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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("./entities/restaurant.entity");
let RestaurantsService = class RestaurantsService {
    restaurantsRepository;
    constructor(restaurantsRepository) {
        this.restaurantsRepository = restaurantsRepository;
    }
    async create(createRestaurantDto, owner) {
        const restaurant = this.restaurantsRepository.create({
            ...createRestaurantDto,
            owner,
            availableSeats: createRestaurantDto.totalSeats,
        });
        return this.restaurantsRepository.save(restaurant);
    }
    async findAll() {
        return this.restaurantsRepository.find({
            relations: ['menus', 'owner'],
        });
    }
    async findOne(id) {
        const restaurant = await this.restaurantsRepository.findOne({
            where: { id },
            relations: ['menus', 'owner'],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurant with ID ${id} not found`);
        }
        return restaurant;
    }
    async updateWaitingCount(id, increment) {
        const restaurant = await this.findOne(id);
        restaurant.waitingCount += increment ? 1 : -1;
        if (restaurant.waitingCount > 0) {
            restaurant.status = restaurant_entity_1.RestaurantStatus.WAITING;
        }
        else if (restaurant.availableSeats > restaurant.totalSeats * 0.7) {
            restaurant.status = restaurant_entity_1.RestaurantStatus.MANY_SEATS;
        }
        else {
            restaurant.status = restaurant_entity_1.RestaurantStatus.NORMAL;
        }
        return this.restaurantsRepository.save(restaurant);
    }
    async updateSeats(id, availableSeats) {
        const restaurant = await this.findOne(id);
        restaurant.availableSeats = availableSeats;
        if (restaurant.waitingCount > 0) {
            restaurant.status = restaurant_entity_1.RestaurantStatus.WAITING;
        }
        else if (availableSeats > restaurant.totalSeats * 0.7) {
            restaurant.status = restaurant_entity_1.RestaurantStatus.MANY_SEATS;
        }
        else {
            restaurant.status = restaurant_entity_1.RestaurantStatus.NORMAL;
        }
        return this.restaurantsRepository.save(restaurant);
    }
    async updateStatus(id, status) {
        const restaurant = await this.findOne(id);
        restaurant.status = status;
        return this.restaurantsRepository.save(restaurant);
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map