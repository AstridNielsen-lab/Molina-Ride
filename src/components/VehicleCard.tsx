import React from 'react';
import { Vehicle, RentalOption } from '../types';
import { Clock } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  rentalOptions: RentalOption[];
  onRent: (vehicle: Vehicle, hours: number) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  rentalOptions,
  onRent,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{vehicle.name}</h3>
        <p className="text-gray-600 mt-2">{vehicle.description}</p>
        
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-2">Opções de Aluguel:</h4>
          <div className="grid grid-cols-2 gap-2">
            {rentalOptions.map((option) => (
              <button
                key={option.hours}
                onClick={() => onRent(vehicle, option.hours)}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Clock size={16} />
                <span>{option.hours}h - R${option.price}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};