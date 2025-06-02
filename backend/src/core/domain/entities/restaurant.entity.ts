export class Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Restaurant>) {
    Object.assign(this, partial);
  }
}
