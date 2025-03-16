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
    image: 'https://th.bing.com/th/id/OIP.DBtbDltEf8k7Dw-xn2rrWAHaE8?rs=1&pid=ImgDetMain',
    description: 'Patinete elétrico com velocidade máxima de 25km/h e design moderno.'
  },
  {
    id: 'jetski-1',
    name: 'Jet Ski Performance',
    type: 'jetski',
    image: 'https://th.bing.com/th/id/OIP.oBnc0LNOGTFQZpXXAF8buAHaE8?rs=1&pid=ImgDetMain',
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
