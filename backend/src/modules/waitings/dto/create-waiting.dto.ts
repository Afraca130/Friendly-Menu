import { IsDate, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { WaitingStatus } from '../entities/waiting.entity';

export class CreateWaitingDto {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  waitingTime: Date;

  @IsNumber()
  @IsNotEmpty()
  peopleCount: number;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @IsEnum(WaitingStatus)
  @IsNotEmpty()
  status: WaitingStatus;
}
