import { WaitingStatus } from '../entities/waiting.entity';
export declare class CreateWaitingDto {
    waitingTime: Date;
    peopleCount: number;
    restaurantId: number;
    status: WaitingStatus;
}
