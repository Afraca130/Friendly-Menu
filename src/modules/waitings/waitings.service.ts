import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Waiting } from './entities/waiting.entity';
import { CreateWaitingDto } from './dto/create-waiting.dto';
import { UpdateWaitingDto } from './dto/update-waiting.dto';

@Injectable()
export class WaitingsService {
  constructor(
    @InjectRepository(Waiting)
    private waitingsRepository: Repository<Waiting>,
  ) {}

  async create(
    createWaitingDto: CreateWaitingDto,
    userId: number,
  ): Promise<Waiting> {
    const waiting = this.waitingsRepository.create({
      ...createWaitingDto,
      user: { id: userId },
      restaurant: { id: createWaitingDto.restaurantId },
    });

    return await this.waitingsRepository.save(waiting);
  }

  async findAll(): Promise<Waiting[]> {
    return await this.waitingsRepository.find({
      relations: ['user', 'restaurant'],
    });
  }

  async findOne(id: number): Promise<Waiting> {
    const waiting = await this.waitingsRepository.findOne({
      where: { id },
      relations: ['user', 'restaurant'],
    });

    if (!waiting) {
      throw new NotFoundException(`Waiting with ID ${id} not found`);
    }

    return waiting;
  }

  async update(
    id: number,
    updateWaitingDto: UpdateWaitingDto,
  ): Promise<Waiting> {
    const waiting = await this.findOne(id);
    Object.assign(waiting, updateWaitingDto);
    return await this.waitingsRepository.save(waiting);
  }

  async remove(id: number): Promise<void> {
    const result = await this.waitingsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Waiting with ID ${id} not found`);
    }
  }

  async findByUser(userId: number): Promise<Waiting[]> {
    return await this.waitingsRepository.find({
      where: { user: { id: userId } },
      relations: ['restaurant'],
    });
  }

  async findByRestaurant(restaurantId: number): Promise<Waiting[]> {
    return await this.waitingsRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['user'],
    });
  }

  async getWaitingCount(restaurantId: number): Promise<number> {
    return await this.waitingsRepository.count({
      where: {
        restaurant: { id: restaurantId },
        status: 'WAITING',
      },
    });
  }
}
