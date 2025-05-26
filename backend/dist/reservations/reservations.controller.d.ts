import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    create(createReservationDto: CreateReservationDto, req: any): Promise<import("./entities/reservation.entity").Reservation>;
    findAll(): Promise<import("./entities/reservation.entity").Reservation[]>;
    findMyReservations(req: any): Promise<import("./entities/reservation.entity").Reservation[]>;
    findByRestaurant(restaurantId: string): Promise<import("./entities/reservation.entity").Reservation[]>;
    findOne(id: string): Promise<import("./entities/reservation.entity").Reservation>;
    update(id: string, updateReservationDto: UpdateReservationDto): Promise<import("./entities/reservation.entity").Reservation>;
    remove(id: string): Promise<void>;
}
