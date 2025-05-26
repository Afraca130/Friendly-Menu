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
exports.MenuTranslationsController = void 0;
const common_1 = require("@nestjs/common");
const menu_translations_service_1 = require("./menu-translations.service");
const menu_translation_entity_1 = require("./entities/menu-translation.entity");
const swagger_1 = require("@nestjs/swagger");
const base_controller_1 = require("../common/controllers/base.controller");
let MenuTranslationsController = class MenuTranslationsController extends base_controller_1.BaseController {
    translationsService;
    constructor(translationsService) {
        super(translationsService);
        this.translationsService = translationsService;
    }
    async translateText(body) {
        return this.translationsService.translateText(body.text, body.targetLanguage);
    }
    async verifyTranslation(id, body) {
        return this.translationsService.verifyTranslation(id, body.verified);
    }
    async getUnverifiedTranslations() {
        return this.translationsService.getUnverifiedTranslations();
    }
};
exports.MenuTranslationsController = MenuTranslationsController;
__decorate([
    (0, common_1.Post)('translate'),
    (0, swagger_1.ApiOperation)({ summary: 'Translate menu text' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Text translated successfully',
        type: menu_translation_entity_1.MenuTranslation,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid input or translation failed',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuTranslationsController.prototype, "translateText", null);
__decorate([
    (0, common_1.Put)(':id/verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify a translation' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Translation verified successfully',
        type: menu_translation_entity_1.MenuTranslation,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Translation not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MenuTranslationsController.prototype, "verifyTranslation", null);
__decorate([
    (0, common_1.Get)('unverified'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all unverified translations' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of unverified translations',
        type: [menu_translation_entity_1.MenuTranslation],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MenuTranslationsController.prototype, "getUnverifiedTranslations", null);
exports.MenuTranslationsController = MenuTranslationsController = __decorate([
    (0, swagger_1.ApiTags)('menu-translations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('menu-translations'),
    __metadata("design:paramtypes", [menu_translations_service_1.MenuTranslationsService])
], MenuTranslationsController);
//# sourceMappingURL=menu-translations.controller.js.map