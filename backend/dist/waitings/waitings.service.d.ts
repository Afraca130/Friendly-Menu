import { Repository } from 'typeorm';
import { Waiting } from './entities/waiting.entity';
import { CreateWaitingDto } from './dto/create-waiting.dto';
import { UpdateWaitingDto } from './dto/update-waiting.dto';
export declare class WaitingsService {
    private waitingsRepository;
    constructor(waitingsRepository: Repository<Waiting>);
    create(createWaitingDto: CreateWaitingDto, userId: number): Promise<Waiting>;
    findAll(): Promise<Waiting[]>;
    findOne(id: number): Promise<Waiting>;
    update(id: number, updateWaitingDto: UpdateWaitingDto): Promise<Waiting>;
    remove(id: number): Promise<void>;
    findByUser(userId: number): Promise<Waiting[]>;
    findByRestaurant(restaurantId: number): Promise<Waiting[]>;
    getWaitingCount(restaurantId: number): Promise<number>;
}
