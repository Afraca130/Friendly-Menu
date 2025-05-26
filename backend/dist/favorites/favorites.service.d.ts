import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
export declare class FavoritesService {
    private favoritesRepository;
    constructor(favoritesRepository: Repository<Favorite>);
    create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite>;
    findAll(): Promise<Favorite[]>;
    findOne(id: number): Promise<Favorite>;
    remove(id: number): Promise<void>;
    findByUser(userId: number): Promise<Favorite[]>;
    findByRestaurant(restaurantId: number): Promise<Favorite[]>;
}
