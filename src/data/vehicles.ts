import { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: 'ebike-1',
    name: 'Bicicleta Elétrica Sport',
    type: 'bike',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890',
    description: 'Bicicleta elétrica ideal para passeios urbanos com autonomia de até 40km.'
  },
  {
    id: 'scooter-1',
    name: 'Patinete Elétrico Pro',
    type: 'scooter',
    image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
    description: 'Patinete elétrico com velocidade máxima de 25km/h e design moderno.'
  },
  {
    id: 'jetski-1',
    name: 'Jet Ski Performance',
    type: 'jetski',
    image: 'https://images.unsplash.com/photo-1615299634564-d6457398de41',
    description: 'Jet ski potente para aventuras aquáticas inesquecíveis.'
  },
  {
    id: 'car-1',
    name: 'Carro Elétrico Premium',
    type: 'car',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399',
    description: 'Carro elétrico de luxo para uma experiência de condução única.'
  }
];

export const rentalOptions: RentalOption[] = [
  { hours: 1, price: 30 },
  { hours: 3, price: 85 },
  { hours: 6, price: 160 },
  { hours: 12, price: 300 },
  { hours: 24, price: 550 }
];