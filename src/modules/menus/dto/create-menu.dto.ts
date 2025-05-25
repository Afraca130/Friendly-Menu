import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsArray,
  IsEnum,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MenuCategory {
  APPETIZER = 'APPETIZER',
  MAIN_COURSE = 'MAIN_COURSE',
  DESSERT = 'DESSERT',
  BEVERAGE = 'BEVERAGE',
  SIDE_DISH = 'SIDE_DISH',
  SPECIAL = 'SPECIAL',
}

export enum DietaryRestriction {
  VEGETARIAN = 'VEGETARIAN',
  VEGAN = 'VEGAN',
  GLUTEN_FREE = 'GLUTEN_FREE',
  DAIRY_FREE = 'DAIRY_FREE',
  NUT_FREE = 'NUT_FREE',
  HALAL = 'HALAL',
  KOSHER = 'KOSHER',
}

export class CreateMenuDto {
  @ApiProperty({ description: 'Menu item name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Menu item price' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Menu item description' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @ApiProperty({ description: 'Menu item image URL' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiPropertyOptional({ description: 'Is menu item available', default: true })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({ description: 'Restaurant ID' })
  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @ApiPropertyOptional({
    description: 'Menu category',
    enum: MenuCategory,
  })
  @IsEnum(MenuCategory)
  @IsOptional()
  category?: MenuCategory;

  @ApiPropertyOptional({
    description: 'Dietary restrictions',
    type: [String],
    enum: DietaryRestriction,
  })
  @IsArray()
  @IsEnum(DietaryRestriction, { each: true })
  @IsOptional()
  dietaryRestrictions?: DietaryRestriction[];

  @ApiPropertyOptional({ description: 'Allergen information' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  allergens?: string[];

  @ApiPropertyOptional({ description: 'Calorie count' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  calories?: number;

  @ApiPropertyOptional({ description: 'Preparation time in minutes' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  preparationTime?: number;

  @ApiPropertyOptional({ description: 'Spicy level (0-5)' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  spicyLevel?: number;

  @ApiPropertyOptional({
    description: 'Language of the original menu content',
    default: 'ko',
  })
  @IsString()
  @IsOptional()
  sourceLanguage?: string;

  @ApiPropertyOptional({
    description: 'Skip automatic translation',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  skipTranslation?: boolean;
}
