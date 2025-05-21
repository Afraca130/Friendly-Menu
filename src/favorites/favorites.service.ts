import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const favorite = this.favoritesRepository.create({
      ...createFavoriteDto,
      user: { id: createFavoriteDto.userId },
      restaurant: { id: createFavoriteDto.restaurantId },
    });

    return await this.favoritesRepository.save(favorite);
  }

  async findAll(): Promise<Favorite[]> {
    return await this.favoritesRepository.find({
      relations: ['user', 'restaurant'],
    });
  }

  async findOne(id: number): Promise<Favorite> {
    const favorite = await this.favoritesRepository.findOne({
      where: { id },
      relations: ['user', 'restaurant'],
    });

    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    return favorite;
  }

  async remove(id: number): Promise<void> {
    const result = await this.favoritesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }
  }

  async findByUser(userId: number): Promise<Favorite[]> {
    return await this.favoritesRepository.find({
      where: { user: { id: userId } },
      relations: ['restaurant'],
    });
  }

  async findByRestaurant(restaurantId: number): Promise<Favorite[]> {
    return await this.favoritesRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['user'],
    });
  }
}
