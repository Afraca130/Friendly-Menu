import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointTransaction } from './entities/point-transaction.entity';
import { CreatePointTransactionDto } from './dto/create-point-transaction.dto';
import { UpdatePointTransactionDto } from './dto/update-point-transaction.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(PointTransaction)
    private pointTransactionsRepository: Repository<PointTransaction>,
    private usersService: UsersService,
  ) {}

  async create(
    createPointTransactionDto: CreatePointTransactionDto,
  ): Promise<PointTransaction> {
    const user = await this.usersService.findOne(
      createPointTransactionDto.userId,
    );

    // 포인트 잔액 확인
    if (
      createPointTransactionDto.amount < 0 &&
      Math.abs(createPointTransactionDto.amount) > user.points
    ) {
      throw new BadRequestException('Insufficient points');
    }

    const transaction = this.pointTransactionsRepository.create({
      ...createPointTransactionDto,
      user,
    });

    // 사용자 포인트 업데이트
    user.points += createPointTransactionDto.amount;
    await this.usersService.update(user.id, { points: user.points });

    return await this.pointTransactionsRepository.save(transaction);
  }

  async findAll(): Promise<PointTransaction[]> {
    return await this.pointTransactionsRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<PointTransaction> {
    const transaction = await this.pointTransactionsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!transaction) {
      throw new NotFoundException(`PointTransaction with ID ${id} not found`);
    }

    return transaction;
  }

  async update(
    id: number,
    updatePointTransactionDto: UpdatePointTransactionDto,
  ): Promise<PointTransaction> {
    const transaction = await this.findOne(id);
    Object.assign(transaction, updatePointTransactionDto);
    return await this.pointTransactionsRepository.save(transaction);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pointTransactionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`PointTransaction with ID ${id} not found`);
    }
  }

  async findByUser(userId: number): Promise<PointTransaction[]> {
    return await this.pointTransactionsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async getBalance(userId: number): Promise<number> {
    const user = await this.usersService.findOne(userId);
    return user.points;
  }
}
