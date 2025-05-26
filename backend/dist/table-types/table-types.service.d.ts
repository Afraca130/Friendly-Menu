import { Repository } from 'typeorm';
import { TableType } from './entities/table-type.entity';
import { CreateTableTypeDto } from './dto/create-table-type.dto';
import { UpdateTableTypeDto } from './dto/update-table-type.dto';
export declare class TableTypesService {
    private tableTypesRepository;
    constructor(tableTypesRepository: Repository<TableType>);
    create(createTableTypeDto: CreateTableTypeDto): Promise<TableType>;
    findAll(): Promise<TableType[]>;
    findOne(id: number): Promise<TableType>;
    update(id: number, updateTableTypeDto: UpdateTableTypeDto): Promise<TableType>;
    remove(id: number): Promise<void>;
    findByRestaurant(restaurantId: number): Promise<TableType[]>;
}
