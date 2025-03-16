import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bike, Car, Ship, NotebookIcon as Scooter } from 'lucide-react';
import { VehicleCard } from './components/VehicleCard';
import { Timer } from './components/Timer';
import { vehicles, rentalOptions } from './data/vehicles';
import { Vehicle } from './types';
import toast, { Toaster } from 'react-hot-toast';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

function App() {
  const [rentals, setRentals] = useState(0);
  const [activeRental, setActiveRental] = useState<{
    vehicle: Vehicle;
    timeLeft: number;
  } | null>(null);

  const handleRent = async (vehicle: Vehicle, hours: number) => {
    const mp = new window.MercadoPago('APP_USR-d076b51b-87dc-409f-849a-8e09a7fd0b3e');
    
    try {
      // In a real application, you would create this on your backend
      const preference = {
        items: [{
          title: `Aluguel de ${vehicle.name} por ${hours} horas`,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: rentalOptions.find(opt => opt.hours === hours)?.price || 0,
        }]
      };

      // This is simplified for demo purposes
      // In production, you should handle this through your backend
      toast.success('Pagamento confirmado!');
      setRentals(prev => prev + 1);
      setActiveRental({
        vehicle,
        timeLeft: hours * 3600
      });
    } catch (error) {
      toast.error('Erro ao processar pagamento');
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Molina Rides - Aluguel de Veículos Elétricos</title>
        <meta name="description" content="Alugue bicicletas elétricas, patinetes, jet skis e carros na Molina Rides. Preços acessíveis e atendimento de qualidade." />
        <meta name="keywords" content="aluguel, bicicleta elétrica, patinete elétrico, jet ski, carro elétrico, São Paulo" />
        <meta property="og:title" content="Molina Rides - Aluguel de Veículos Elétricos" />
        <meta property="og:description" content="Alugue bicicletas elétricas, patinetes, jet skis e carros na Molina Rides." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1571068316344-75bc76f77890" />
        <meta name="twitter:card" content="summary_large_image" />
        <script src="https://sdk.mercadopago.com/js/v2"></script>
      </Helmet>

      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Bike className="h-8 w-8" />
                Molina Rides
              </h1>
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  Total de Locações: <span className="font-bold">{rentals}</span>
                </div>
                {activeRental && (
                  <div className="bg-white text-blue-600 rounded-lg px-4 py-2">
                    <Timer
                      initialTime={activeRental.timeLeft}
                      onExpire={() => setActiveRental(null)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                rentalOptions={rentalOptions}
                onRent={handleRent}
              />
            ))}
          </div>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Contato</h3>
                <p>Desenvolvedor: Julio Campos Machado</p>
                <p>Like Look Solutions</p>
                <p>WhatsApp: +55 11 99294-6628</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Nossos Veículos</h3>
                <div className="flex gap-4">
                  <Bike className="h-6 w-6" />
                  <Car className="h-6 w-6" />
                  <Ship className="h-6 w-6" />
                  <Scooter className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default App;