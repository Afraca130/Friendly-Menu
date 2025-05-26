import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto, req: any): Promise<import("./entities/review.entity").Review>;
    findAll(): Promise<import("./entities/review.entity").Review[]>;
    findMyReviews(req: any): Promise<import("./entities/review.entity").Review[]>;
    findByRestaurant(restaurantId: string): Promise<import("./entities/review.entity").Review[]>;
    getAverageRating(restaurantId: string): Promise<number>;
    findOne(id: string): Promise<import("./entities/review.entity").Review>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<import("./entities/review.entity").Review>;
    remove(id: string): Promise<void>;
}
