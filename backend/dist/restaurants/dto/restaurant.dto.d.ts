export declare class CreateRestaurantDto {
    name: string;
    address: string;
    phoneNumber: string;
    openTime: string;
    closeTime: string;
    breakStartTime?: string;
    breakEndTime?: string;
    totalSeats: number;
}
export declare class UpdateRestaurantDto extends CreateRestaurantDto {
}
