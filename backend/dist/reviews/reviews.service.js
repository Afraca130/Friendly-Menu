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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("./entities/review.entity");
let ReviewsService = class ReviewsService {
    reviewsRepository;
    constructor(reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }
    async create(createReviewDto, userId) {
        const review = this.reviewsRepository.create({
            ...createReviewDto,
            user: { id: userId },
            restaurant: { id: createReviewDto.restaurantId },
        });
        return await this.reviewsRepository.save(review);
    }
    async findAll() {
        return await this.reviewsRepository.find({
            relations: ['user', 'restaurant'],
        });
    }
    async findOne(id) {
        const review = await this.reviewsRepository.findOne({
            where: { id },
            relations: ['user', 'restaurant'],
        });
        if (!review) {
            throw new common_1.NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }
    async update(id, updateReviewDto) {
        const review = await this.findOne(id);
        Object.assign(review, updateReviewDto);
        return await this.reviewsRepository.save(review);
    }
    async remove(id) {
        const result = await this.reviewsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Review with ID ${id} not found`);
        }
    }
    async findByUser(userId) {
        return await this.reviewsRepository.find({
            where: { user: { id: userId } },
            relations: ['restaurant'],
        });
    }
    async findByRestaurant(restaurantId) {
        return await this.reviewsRepository.find({
            where: { restaurant: { id: restaurantId } },
            relations: ['user'],
        });
    }
    async getAverageRating(restaurantId) {
        const result = await this.reviewsRepository
            .createQueryBuilder('review')
            .select('AVG(review.rating)', 'average')
            .where('review.restaurant.id = :restaurantId', { restaurantId })
            .getRawOne();
        return result.average || 0;
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map