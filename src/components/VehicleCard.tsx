import React, { useState } from 'react';
import { Vehicle, RentalOption } from '../types';
import { Clock, Plus, Minus } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  rentalOptions: RentalOption[];
  onRent: (vehicle: Vehicle, hours: number, price: number) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  rentalOptions,
  onRent,
}) => {
  const [customHours, setCustomHours] = useState(1);
  const basePrice = 30;
  const customPrice = customHours * basePrice;

  const handleIncrement = () => {
    setCustomHours(prev => Math.min(prev + 1, 24));
  };

  const handleDecrement = () => {
    setCustomHours(prev => Math.max(prev - 1, 1));
  };

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
          
          {/* Custom hours selector */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Horas Personalizadas:</h5>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecrement}
                  className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{customHours}h</span>
                <button
                  onClick={handleIncrement}
                  className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => onRent(vehicle, customHours, customPrice)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Clock size={16} />
                <span>R${customPrice}</span>
              </button>
            </div>
          </div>

          {/* Combo options */}
          <div className="grid grid-cols-2 gap-2">
            {rentalOptions.map((option) => (
              <button
                key={option.hours}
                onClick={() => onRent(vehicle, option.hours, option.price)}
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
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