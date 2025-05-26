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
exports.MenuTranslationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_translation_entity_1 = require("./entities/menu-translation.entity");
const openai_1 = require("openai");
const config_1 = require("@nestjs/config");
const base_service_1 = require("../common/services/base.service");
let MenuTranslationsService = class MenuTranslationsService extends base_service_1.BaseService {
    translationsRepository;
    configService;
    openai;
    constructor(translationsRepository, configService) {
        super();
        this.translationsRepository = translationsRepository;
        this.configService = configService;
        const configuration = new openai_1.Configuration({
            apiKey: this.configService.get('OPENAI_API_KEY'),
        });
        this.openai = new openai_1.OpenAIApi(configuration);
    }
    async translateText(text, targetLanguage) {
        return this.handleAsync(async () => {
            const cachedTranslation = await this.translationsRepository.findOne({
                where: {
                    originalText: text,
                    targetLanguage,
                },
            });
            if (cachedTranslation) {
                cachedTranslation.usageCount += 1;
                cachedTranslation.lastUsedAt = new Date();
                return this.translationsRepository.save(cachedTranslation);
            }
            const completion = await this.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional translator. Translate the following text to ${targetLanguage}. Maintain the original meaning and context.`,
                    },
                    {
                        role: 'user',
                        content: text,
                    },
                ],
            });
            const translatedText = completion.data.choices[0].message.content;
            const translation = this.translationsRepository.create({
                originalText: text,
                translatedText,
                targetLanguage,
                usageCount: 1,
                lastUsedAt: new Date(),
            });
            return this.translationsRepository.save(translation);
        }, 'Translation failed');
    }
    async verifyTranslation(id, verified) {
        return this.handleAsync(async () => {
            const translation = await this.translationsRepository.findOne({
                where: { id },
            });
            if (!translation) {
                throw new common_1.NotFoundException('Translation not found');
            }
            translation.isVerified = verified;
            return this.translationsRepository.save(translation);
        }, 'Failed to verify translation');
    }
    async getUnverifiedTranslations() {
        return this.handleAsync(async () => {
            return this.translationsRepository.find({
                where: { isVerified: false },
                order: { createdAt: 'DESC' },
            });
        }, 'Failed to fetch unverified translations');
    }
};
exports.MenuTranslationsService = MenuTranslationsService;
exports.MenuTranslationsService = MenuTranslationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_translation_entity_1.MenuTranslation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], MenuTranslationsService);
//# sourceMappingURL=menu-translations.service.js.map