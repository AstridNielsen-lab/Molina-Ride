import React from 'react';
import { Bike } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-blue-600 flex items-center justify-center z-50">
      <div className="text-white text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <Bike className="h-24 w-24 animate-bounce" />
        </div>
        <h1 className="text-5xl font-bold tracking-wider animate-slide-up">
          Molina Rides
        </h1>
        <p className="mt-4 text-xl opacity-80 animate-fade-in-delay">
          Sua aventura começa aqui
        </p>
      </div>
    </div>
  );
};