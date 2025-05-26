import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/menu.dto';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
export declare class MenusService {
    private menusRepository;
    constructor(menusRepository: Repository<Menu>);
    create(createMenuDto: CreateMenuDto, restaurant: Restaurant): Promise<Menu>;
    findAll(restaurantId: number): Promise<Menu[]>;
    findOne(id: number): Promise<Menu>;
    update(id: number, updateMenuDto: CreateMenuDto): Promise<Menu>;
    remove(id: number): Promise<void>;
}
