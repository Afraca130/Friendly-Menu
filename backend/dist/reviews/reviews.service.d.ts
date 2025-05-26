import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsService {
    private reviewsRepository;
    constructor(reviewsRepository: Repository<Review>);
    create(createReviewDto: CreateReviewDto, userId: number): Promise<Review>;
    findAll(): Promise<Review[]>;
    findOne(id: number): Promise<Review>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review>;
    remove(id: number): Promise<void>;
    findByUser(userId: number): Promise<Review[]>;
    findByRestaurant(restaurantId: number): Promise<Review[]>;
    getAverageRating(restaurantId: number): Promise<number>;
}
