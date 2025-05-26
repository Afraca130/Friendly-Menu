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
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("./entities/reservation.entity");
const table_types_service_1 = require("../table-types/table-types.service");
let ReservationsService = class ReservationsService {
    reservationsRepository;
    tableTypesService;
    constructor(reservationsRepository, tableTypesService) {
        this.reservationsRepository = reservationsRepository;
        this.tableTypesService = tableTypesService;
    }
    async create(createReservationDto, userId) {
        const tableType = await this.tableTypesService.findOne(createReservationDto.tableTypeId);
        if (createReservationDto.peopleCount > tableType.capacity) {
            throw new common_1.BadRequestException('Number of people exceeds table capacity');
        }
        const reservation = this.reservationsRepository.create({
            ...createReservationDto,
            user: { id: userId },
            tableType,
            restaurant: { id: createReservationDto.restaurantId },
        });
        return await this.reservationsRepository.save(reservation);
    }
    async findAll() {
        return await this.reservationsRepository.find({
            relations: ['user', 'restaurant', 'tableType'],
        });
    }
    async findOne(id) {
        const reservation = await this.reservationsRepository.findOne({
            where: { id },
            relations: ['user', 'restaurant', 'tableType'],
        });
        if (!reservation) {
            throw new common_1.NotFoundException(`Reservation with ID ${id} not found`);
        }
        return reservation;
    }
    async update(id, updateReservationDto) {
        const reservation = await this.findOne(id);
        Object.assign(reservation, updateReservationDto);
        return await this.reservationsRepository.save(reservation);
    }
    async remove(id) {
        const result = await this.reservationsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Reservation with ID ${id} not found`);
        }
    }
    async findByUser(userId) {
        return await this.reservationsRepository.find({
            where: { user: { id: userId } },
            relations: ['restaurant', 'tableType'],
        });
    }
    async findByRestaurant(restaurantId) {
        return await this.reservationsRepository.find({
            where: { restaurant: { id: restaurantId } },
            relations: ['user', 'tableType'],
        });
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        table_types_service_1.TableTypesService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map