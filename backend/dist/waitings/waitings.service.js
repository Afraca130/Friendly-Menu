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
exports.WaitingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const waiting_entity_1 = require("./entities/waiting.entity");
let WaitingsService = class WaitingsService {
    waitingsRepository;
    constructor(waitingsRepository) {
        this.waitingsRepository = waitingsRepository;
    }
    async create(createWaitingDto, userId) {
        const waiting = this.waitingsRepository.create({
            ...createWaitingDto,
            user: { id: userId },
            restaurant: { id: createWaitingDto.restaurantId },
        });
        return await this.waitingsRepository.save(waiting);
    }
    async findAll() {
        return await this.waitingsRepository.find({
            relations: ['user', 'restaurant'],
        });
    }
    async findOne(id) {
        const waiting = await this.waitingsRepository.findOne({
            where: { id },
            relations: ['user', 'restaurant'],
        });
        if (!waiting) {
            throw new common_1.NotFoundException(`Waiting with ID ${id} not found`);
        }
        return waiting;
    }
    async update(id, updateWaitingDto) {
        const waiting = await this.findOne(id);
        Object.assign(waiting, updateWaitingDto);
        return await this.waitingsRepository.save(waiting);
    }
    async remove(id) {
        const result = await this.waitingsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Waiting with ID ${id} not found`);
        }
    }
    async findByUser(userId) {
        return await this.waitingsRepository.find({
            where: { user: { id: userId } },
            relations: ['restaurant'],
        });
    }
    async findByRestaurant(restaurantId) {
        return await this.waitingsRepository.find({
            where: { restaurant: { id: restaurantId } },
            relations: ['user'],
        });
    }
    async getWaitingCount(restaurantId) {
        return await this.waitingsRepository.count({
            where: {
                restaurant: { id: restaurantId },
                status: 'WAITING',
            },
        });
    }
};
exports.WaitingsService = WaitingsService;
exports.WaitingsService = WaitingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(waiting_entity_1.Waiting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WaitingsService);
//# sourceMappingURL=waitings.service.js.map