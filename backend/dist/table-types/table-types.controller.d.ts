import { TableTypesService } from './table-types.service';
import { CreateTableTypeDto } from './dto/create-table-type.dto';
import { UpdateTableTypeDto } from './dto/update-table-type.dto';
export declare class TableTypesController {
    private readonly tableTypesService;
    constructor(tableTypesService: TableTypesService);
    create(createTableTypeDto: CreateTableTypeDto): Promise<import("./entities/table-type.entity").TableType>;
    findAll(): Promise<import("./entities/table-type.entity").TableType[]>;
    findOne(id: string): Promise<import("./entities/table-type.entity").TableType>;
    findByRestaurant(restaurantId: string): Promise<import("./entities/table-type.entity").TableType[]>;
    update(id: string, updateTableTypeDto: UpdateTableTypeDto): Promise<import("./entities/table-type.entity").TableType>;
    remove(id: string): Promise<void>;
}
