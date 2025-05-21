import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTableTypeDto {
  @IsString()
  @IsNotEmpty()
  typeName: string;

  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;
}
