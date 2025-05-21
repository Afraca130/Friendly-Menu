import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { TableTypesService } from '../table-types/table-types.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    private tableTypesService: TableTypesService,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    userId: number,
  ): Promise<Reservation> {
    const tableType = await this.tableTypesService.findOne(
      createReservationDto.tableTypeId,
    );

    if (createReservationDto.peopleCount > tableType.capacity) {
      throw new BadRequestException('Number of people exceeds table capacity');
    }

    const reservation = this.reservationsRepository.create({
      ...createReservationDto,
      user: { id: userId },
      tableType,
      restaurant: { id: createReservationDto.restaurantId },
    });

    return await this.reservationsRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationsRepository.find({
      relations: ['user', 'restaurant', 'tableType'],
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
      relations: ['user', 'restaurant', 'tableType'],
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    return reservation;
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const reservation = await this.findOne(id);
    Object.assign(reservation, updateReservationDto);
    return await this.reservationsRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reservationsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
  }

  async findByUser(userId: number): Promise<Reservation[]> {
    return await this.reservationsRepository.find({
      where: { user: { id: userId } },
      relations: ['restaurant', 'tableType'],
    });
  }

  async findByRestaurant(restaurantId: number): Promise<Reservation[]> {
    return await this.reservationsRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['user', 'tableType'],
    });
  }
}
