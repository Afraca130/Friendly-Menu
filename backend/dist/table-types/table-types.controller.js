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
exports.TableTypesController = void 0;
const common_1 = require("@nestjs/common");
const table_types_service_1 = require("./table-types.service");
const create_table_type_dto_1 = require("./dto/create-table-type.dto");
const update_table_type_dto_1 = require("./dto/update-table-type.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../users/enums/role.enum");
let TableTypesController = class TableTypesController {
    tableTypesService;
    constructor(tableTypesService) {
        this.tableTypesService = tableTypesService;
    }
    create(createTableTypeDto) {
        return this.tableTypesService.create(createTableTypeDto);
    }
    findAll() {
        return this.tableTypesService.findAll();
    }
    findOne(id) {
        return this.tableTypesService.findOne(+id);
    }
    findByRestaurant(restaurantId) {
        return this.tableTypesService.findByRestaurant(+restaurantId);
    }
    update(id, updateTableTypeDto) {
        return this.tableTypesService.update(+id, updateTableTypeDto);
    }
    remove(id) {
        return this.tableTypesService.remove(+id);
    }
};
exports.TableTypesController = TableTypesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_table_type_dto_1.CreateTableTypeDto]),
    __metadata("design:returntype", void 0)
], TableTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TableTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TableTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('restaurant/:restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TableTypesController.prototype, "findByRestaurant", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_table_type_dto_1.UpdateTableTypeDto]),
    __metadata("design:returntype", void 0)
], TableTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TableTypesController.prototype, "remove", null);
exports.TableTypesController = TableTypesController = __decorate([
    (0, common_1.Controller)('table-types'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [table_types_service_1.TableTypesService])
], TableTypesController);
//# sourceMappingURL=table-types.controller.js.map