"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuTranslationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const menu_translation_entity_1 = require("./entities/menu-translation.entity");
const menu_translations_service_1 = require("./menu-translations.service");
const menu_translations_controller_1 = require("./menu-translations.controller");
const config_1 = require("@nestjs/config");
let MenuTranslationsModule = class MenuTranslationsModule {
};
exports.MenuTranslationsModule = MenuTranslationsModule;
exports.MenuTranslationsModule = MenuTranslationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([menu_translation_entity_1.MenuTranslation]), config_1.ConfigModule],
        providers: [menu_translations_service_1.MenuTranslationsService],
        controllers: [menu_translations_controller_1.MenuTranslationsController],
        exports: [menu_translations_service_1.MenuTranslationsService],
    })
], MenuTranslationsModule);
//# sourceMappingURL=menu-translations.module.js.map