export interface Vehicle {
  id: string;
  name: string;
  type: 'bike' | 'scooter' | 'jetski' | 'car';
  image: string;
  description: string;
}

export interface RentalOption {
  hours: number;
  price: number;
}