import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    create(createFavoriteDto: CreateFavoriteDto): Promise<import("./entities/favorite.entity").Favorite>;
    findAll(): Promise<import("./entities/favorite.entity").Favorite[]>;
    findOne(id: string): Promise<import("./entities/favorite.entity").Favorite>;
    remove(id: string): Promise<void>;
    findByUser(userId: string): Promise<import("./entities/favorite.entity").Favorite[]>;
    findByRestaurant(restaurantId: string): Promise<import("./entities/favorite.entity").Favorite[]>;
}
