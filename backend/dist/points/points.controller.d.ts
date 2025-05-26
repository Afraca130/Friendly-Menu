import { PointsService } from './points.service';
import { CreatePointTransactionDto } from './dto/create-point-transaction.dto';
import { UpdatePointTransactionDto } from './dto/update-point-transaction.dto';
export declare class PointsController {
    private readonly pointsService;
    constructor(pointsService: PointsService);
    create(createPointTransactionDto: CreatePointTransactionDto): Promise<import("./entities/point-transaction.entity").PointTransaction>;
    findAll(): Promise<import("./entities/point-transaction.entity").PointTransaction[]>;
    findMyTransactions(req: any): Promise<import("./entities/point-transaction.entity").PointTransaction[]>;
    getMyBalance(req: any): Promise<number>;
    findOne(id: string): Promise<import("./entities/point-transaction.entity").PointTransaction>;
    update(id: string, updatePointTransactionDto: UpdatePointTransactionDto): Promise<import("./entities/point-transaction.entity").PointTransaction>;
    remove(id: string): Promise<void>;
}
