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
exports.PointsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const point_transaction_entity_1 = require("./entities/point-transaction.entity");
const users_service_1 = require("../users/users.service");
let PointsService = class PointsService {
    pointTransactionsRepository;
    usersService;
    constructor(pointTransactionsRepository, usersService) {
        this.pointTransactionsRepository = pointTransactionsRepository;
        this.usersService = usersService;
    }
    async create(createPointTransactionDto) {
        const user = await this.usersService.findOne(createPointTransactionDto.userId);
        if (createPointTransactionDto.amount < 0 &&
            Math.abs(createPointTransactionDto.amount) > user.points) {
            throw new common_1.BadRequestException('Insufficient points');
        }
        const transaction = this.pointTransactionsRepository.create({
            ...createPointTransactionDto,
            user,
        });
        user.points += createPointTransactionDto.amount;
        await this.usersService.update(user.id, { points: user.points });
        return await this.pointTransactionsRepository.save(transaction);
    }
    async findAll() {
        return await this.pointTransactionsRepository.find({
            relations: ['user'],
        });
    }
    async findOne(id) {
        const transaction = await this.pointTransactionsRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!transaction) {
            throw new common_1.NotFoundException(`PointTransaction with ID ${id} not found`);
        }
        return transaction;
    }
    async update(id, updatePointTransactionDto) {
        const transaction = await this.findOne(id);
        Object.assign(transaction, updatePointTransactionDto);
        return await this.pointTransactionsRepository.save(transaction);
    }
    async remove(id) {
        const result = await this.pointTransactionsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`PointTransaction with ID ${id} not found`);
        }
    }
    async findByUser(userId) {
        return await this.pointTransactionsRepository.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }
    async getBalance(userId) {
        const user = await this.usersService.findOne(userId);
        return user.points;
    }
};
exports.PointsService = PointsService;
exports.PointsService = PointsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(point_transaction_entity_1.PointTransaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], PointsService);
//# sourceMappingURL=points.service.js.map