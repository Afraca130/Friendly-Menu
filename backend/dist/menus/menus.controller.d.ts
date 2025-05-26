import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    create(createMenuDto: CreateMenuDto): Promise<import("./entities/menu.entity").Menu>;
    findAll(): Promise<import("./entities/menu.entity").Menu[]>;
    findOne(id: string): Promise<import("./entities/menu.entity").Menu>;
    update(id: string, updateMenuDto: UpdateMenuDto): Promise<import("./entities/menu.entity").Menu>;
    remove(id: string): Promise<void>;
    findByRestaurant(restaurantId: string): any;
}
