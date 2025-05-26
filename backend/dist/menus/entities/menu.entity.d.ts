import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { MenuTranslation } from '../../menu-translations/entities/menu-translation.entity';
export declare class Menu {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
    restaurant: Restaurant;
    translations: MenuTranslation[];
}
