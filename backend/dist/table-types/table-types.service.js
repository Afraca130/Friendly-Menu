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
exports.TableTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const table_type_entity_1 = require("./entities/table-type.entity");
let TableTypesService = class TableTypesService {
    tableTypesRepository;
    constructor(tableTypesRepository) {
        this.tableTypesRepository = tableTypesRepository;
    }
    async create(createTableTypeDto) {
        const tableType = this.tableTypesRepository.create(createTableTypeDto);
        return await this.tableTypesRepository.save(tableType);
    }
    async findAll() {
        return await this.tableTypesRepository.find();
    }
    async findOne(id) {
        const tableType = await this.tableTypesRepository.findOne({
            where: { id },
        });
        if (!tableType) {
            throw new common_1.NotFoundException(`TableType with ID ${id} not found`);
        }
        return tableType;
    }
    async update(id, updateTableTypeDto) {
        const tableType = await this.findOne(id);
        Object.assign(tableType, updateTableTypeDto);
        return await this.tableTypesRepository.save(tableType);
    }
    async remove(id) {
        const result = await this.tableTypesRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`TableType with ID ${id} not found`);
        }
    }
    async findByRestaurant(restaurantId) {
        return await this.tableTypesRepository.find({
            where: { restaurant: { id: restaurantId } },
        });
    }
};
exports.TableTypesService = TableTypesService;
exports.TableTypesService = TableTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(table_type_entity_1.TableType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TableTypesService);
//# sourceMappingURL=table-types.service.js.map