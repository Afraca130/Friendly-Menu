import { Repository } from 'typeorm';
import { PointTransaction } from './entities/point-transaction.entity';
import { CreatePointTransactionDto } from './dto/create-point-transaction.dto';
import { UpdatePointTransactionDto } from './dto/update-point-transaction.dto';
import { UsersService } from '../users/users.service';
export declare class PointsService {
    private pointTransactionsRepository;
    private usersService;
    constructor(pointTransactionsRepository: Repository<PointTransaction>, usersService: UsersService);
    create(createPointTransactionDto: CreatePointTransactionDto): Promise<PointTransaction>;
    findAll(): Promise<PointTransaction[]>;
    findOne(id: number): Promise<PointTransaction>;
    update(id: number, updatePointTransactionDto: UpdatePointTransactionDto): Promise<PointTransaction>;
    remove(id: number): Promise<void>;
    findByUser(userId: number): Promise<PointTransaction[]>;
    getBalance(userId: number): Promise<number>;
}
