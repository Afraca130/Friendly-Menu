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
exports.WaitingsController = void 0;
const common_1 = require("@nestjs/common");
const waitings_service_1 = require("./waitings.service");
const create_waiting_dto_1 = require("./dto/create-waiting.dto");
const update_waiting_dto_1 = require("./dto/update-waiting.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../users/enums/role.enum");
const swagger_1 = require("@nestjs/swagger");
const waiting_entity_1 = require("./entities/waiting.entity");
let WaitingsController = class WaitingsController {
    waitingsService;
    constructor(waitingsService) {
        this.waitingsService = waitingsService;
    }
    create(createWaitingDto, req) {
        return this.waitingsService.create(createWaitingDto, req.user.id);
    }
    findAll() {
        return this.waitingsService.findAll();
    }
    findMyWaitings(req) {
        return this.waitingsService.findByUser(req.user.id);
    }
    findByRestaurant(restaurantId) {
        return this.waitingsService.findByRestaurant(+restaurantId);
    }
    getWaitingCount(restaurantId) {
        return this.waitingsService.getWaitingCount(+restaurantId);
    }
    findOne(id) {
        return this.waitingsService.findOne(+id);
    }
    update(id, updateWaitingDto) {
        return this.waitingsService.update(+id, updateWaitingDto);
    }
    remove(id) {
        return this.waitingsService.remove(+id);
    }
};
exports.WaitingsController = WaitingsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new waiting entry' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Waiting entry created successfully',
        type: waiting_entity_1.Waiting,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_waiting_dto_1.CreateWaitingDto, Object]),
    __metadata("design:returntype", void 0)
], WaitingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all waiting entries' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all waiting entries',
        type: [waiting_entity_1.Waiting],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WaitingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: "Get current user's waiting entries" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "List of user's waiting entries",
        type: [waiting_entity_1.Waiting],
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WaitingsController.prototype, "findMyWaitings", null);
__decorate([
    (0, common_1.Get)('restaurant/:restaurantId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER),
    (0, swagger_1.ApiOperation)({ summary: 'Get waiting entries for a restaurant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of waiting entries for the restaurant',
        type: [waiting_entity_1.Waiting],
    }),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WaitingsController.prototype, "findByRestaurant", null);
__decorate([
    (0, common_1.Get)('restaurant/:restaurantId/count'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER),
    (0, swagger_1.ApiOperation)({ summary: 'Get waiting count for a restaurant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Current waiting count for the restaurant',
    }),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WaitingsController.prototype, "getWaitingCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific waiting entry' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The waiting entry', type: waiting_entity_1.Waiting }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WaitingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER),
    (0, swagger_1.ApiOperation)({ summary: 'Update a waiting entry' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Waiting entry updated successfully',
        type: waiting_entity_1.Waiting,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_waiting_dto_1.UpdateWaitingDto]),
    __metadata("design:returntype", void 0)
], WaitingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.USER, role_enum_1.Role.OWNER),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a waiting entry' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Waiting entry deleted successfully',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WaitingsController.prototype, "remove", null);
exports.WaitingsController = WaitingsController = __decorate([
    (0, swagger_1.ApiTags)('waitings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('waitings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [waitings_service_1.WaitingsService])
], WaitingsController);
//# sourceMappingURL=waitings.controller.js.map