import { WaitingsService } from './waitings.service';
import { CreateWaitingDto } from './dto/create-waiting.dto';
import { UpdateWaitingDto } from './dto/update-waiting.dto';
import { Waiting } from './entities/waiting.entity';
export declare class WaitingsController {
    private readonly waitingsService;
    constructor(waitingsService: WaitingsService);
    create(createWaitingDto: CreateWaitingDto, req: any): Promise<Waiting>;
    findAll(): Promise<Waiting[]>;
    findMyWaitings(req: any): Promise<Waiting[]>;
    findByRestaurant(restaurantId: string): Promise<Waiting[]>;
    getWaitingCount(restaurantId: string): Promise<number>;
    findOne(id: string): Promise<Waiting>;
    update(id: string, updateWaitingDto: UpdateWaitingDto): Promise<Waiting>;
    remove(id: string): Promise<void>;
}
