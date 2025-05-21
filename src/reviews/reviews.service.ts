import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    userId: number,
  ): Promise<Review> {
    const review = this.reviewsRepository.create({
      ...createReviewDto,
      user: { id: userId },
      restaurant: { id: createReviewDto.restaurantId },
    });

    return await this.reviewsRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewsRepository.find({
      relations: ['user', 'restaurant'],
    });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'restaurant'],
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    Object.assign(review, updateReviewDto);
    return await this.reviewsRepository.save(review);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reviewsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  }

  async findByUser(userId: number): Promise<Review[]> {
    return await this.reviewsRepository.find({
      where: { user: { id: userId } },
      relations: ['restaurant'],
    });
  }

  async findByRestaurant(restaurantId: number): Promise<Review[]> {
    return await this.reviewsRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['user'],
    });
  }

  async getAverageRating(restaurantId: number): Promise<number> {
    const result = await this.reviewsRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .where('review.restaurant.id = :restaurantId', { restaurantId })
      .getRawOne();

    return result.average || 0;
  }
}
