export interface Vehicle {
  id: number;
  title: string;
  description: string;
  ownerId: number;
  location: {
    type: string;
    coordinates: number[];
  };
  brand: string;
  model: string;
  year: number;
  engineType: string;
  transmissionType: string;
  mileage: number;
  pricePerHour: number;
  photo: string;
  rentPerHour: number;
  isAvailable: boolean;
}
