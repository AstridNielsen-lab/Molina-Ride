import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bike, Car, Ship, NotebookIcon as Scooter } from 'lucide-react';
import { VehicleCard } from './components/VehicleCard';
import { Timer } from './components/Timer';
import { SplashScreen } from './components/SplashScreen';
import { vehicles, rentalOptions } from './data/vehicles';
import { Vehicle } from './types';
import toast, { Toaster } from 'react-hot-toast';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [rentals, setRentals] = useState(0);
  const [activeRental, setActiveRental] = useState<{
    vehicle: Vehicle;
    timeLeft: number;
  } | null>(null);
  const [mp, setMp] = useState<any>(null);

  useEffect(() => {
    // Hide splash screen after 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadMercadoPago = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.type = 'text/javascript';
        document.body.appendChild(script);

        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Mercado Pago SDK'));
        });

        const mpInstance = new window.MercadoPago('APP_USR-d076b51b-87dc-409f-849a-8e09a7fd0b3e', {
          locale: 'pt-BR'
        });
        setMp(mpInstance);
      } catch (error) {
        console.error('Error loading MercadoPago:', error);
        toast.error('Erro ao carregar MercadoPago');
      }
    };

    loadMercadoPago();

    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'approved') {
      toast.success('Pagamento aprovado!');
      const hours = Number(localStorage.getItem('rental_hours') || '0');
      const vehicleId = localStorage.getItem('rental_vehicle');
      const vehicle = vehicles.find(v => v.id === vehicleId);
      
      if (vehicle && hours > 0) {
        setRentals(prev => prev + 1);
        setActiveRental({
          vehicle,
          timeLeft: hours * 3600
        });
        localStorage.removeItem('rental_hours');
        localStorage.removeItem('rental_vehicle');
      }
    } else if (status === 'pending') {
      toast.loading('Pagamento pendente. Aguardando confirmação...');
    } else if (status === 'failure') {
      toast.error('Pagamento não aprovado. Por favor, tente novamente.');
    }
  }, []);

  const handleRent = async (vehicle: Vehicle, hours: number, price: number) => {
    if (!mp) {
      toast.error('Erro ao inicializar pagamento');
      return;
    }

    try {
      localStorage.setItem('rental_hours', hours.toString());
      localStorage.setItem('rental_vehicle', vehicle.id);

      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer APP_USR-5897321006642347-031604-e8d3d07aae5a4bb0f620e311a65eb89b-29008060',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [{
            title: `Aluguel de ${vehicle.name} por ${hours} horas`,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: price,
          }],
          back_urls: {
            success: window.location.href,
            failure: window.location.href,
            pending: window.location.href
          },
          auto_return: 'approved',
        })
      });

      const preference = await response.json();

      const checkout = mp.checkout({
        preference: {
          id: preference.id
        },
        theme: {
          elementsColor: '#2563EB',
          headerColor: '#2563EB',
        }
      });

      checkout.open();
    } catch (error) {
      console.error('Erro ao criar preferência:', error);
      toast.error('Erro ao processar pagamento');
    }
  };

  return (
    <>
      {showSplash && <SplashScreen />}
      <div className={`min-h-screen bg-gray-100 transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
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