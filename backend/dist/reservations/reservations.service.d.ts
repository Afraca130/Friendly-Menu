import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { TableTypesService } from '../table-types/table-types.service';
export declare class ReservationsService {
    private reservationsRepository;
    private tableTypesService;
    constructor(reservationsRepository: Repository<Reservation>, tableTypesService: TableTypesService);
    create(createReservationDto: CreateReservationDto, userId: number): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    findOne(id: number): Promise<Reservation>;
    update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation>;
    remove(id: number): Promise<void>;
    findByUser(userId: number): Promise<Reservation[]>;
    findByRestaurant(restaurantId: number): Promise<Reservation[]>;
}
