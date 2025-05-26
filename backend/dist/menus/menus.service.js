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
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_entity_1 = require("./entities/menu.entity");
let MenusService = class MenusService {
    menusRepository;
    constructor(menusRepository) {
        this.menusRepository = menusRepository;
    }
    async create(createMenuDto, restaurant) {
        const menu = this.menusRepository.create({
            ...createMenuDto,
            restaurant,
        });
        return this.menusRepository.save(menu);
    }
    async findAll(restaurantId) {
        return this.menusRepository.find({
            where: { restaurant: { id: restaurantId } },
            relations: ['restaurant'],
        });
    }
    async findOne(id) {
        const menu = await this.menusRepository.findOne({
            where: { id },
            relations: ['restaurant'],
        });
        if (!menu) {
            throw new common_1.NotFoundException(`Menu with ID ${id} not found`);
        }
        return menu;
    }
    async update(id, updateMenuDto) {
        const menu = await this.findOne(id);
        Object.assign(menu, updateMenuDto);
        return this.menusRepository.save(menu);
    }
    async remove(id) {
        const menu = await this.findOne(id);
        await this.menusRepository.remove(menu);
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_entity_1.Menu)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MenusService);
//# sourceMappingURL=menus.service.js.map