import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  openTime: string;

  @IsString()
  @IsNotEmpty()
  closeTime: string;

  @IsString()
  breakStartTime?: string;

  @IsString()
  breakEndTime?: string;

  @IsNumber()
  @Min(1)
  totalSeats: number;
}

export class UpdateRestaurantDto extends CreateRestaurantDto {}
