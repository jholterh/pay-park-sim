import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Coins } from 'lucide-react';
import { KioskHeader } from './KioskHeader';

interface PaymentSelectionProps {
  licensePlate: string;
  duration: { hours: number; minutes: number };
  cost: number;
  onNext: (step: 'card-payment') => void;
}

export const PaymentSelection: React.FC<PaymentSelectionProps> = ({
  licensePlate,
  duration,
  cost,
  onNext
}) => {
  return (
    <div className="bg-gradient-kiosk rounded-3xl shadow-kiosk animate-fade-in-up">
      <KioskHeader showBack />
      
      <div className="px-8 pb-8">
        <div className="text-center mb-8">
          <div className="text-3xl font-mono font-bold text-primary mb-4">
            {licensePlate}
          </div>
          
          <div className="bg-white rounded-lg p-6 mb-6 shadow-inner">
            <div className="text-lg mb-2">
              Parkdauer: <span className="font-semibold">
                {duration.hours} Stunden {duration.minutes} Minuten
              </span>
            </div>
            <div className="text-4xl font-bold text-primary">
              {cost.toFixed(2)} €
            </div>
          </div>
          
          <h2 className="text-xl text-accent mb-8">
            Bitte wählen Sie eine Zahlungsmethode
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button 
            variant="default"
            size="lg"
            className="h-24 bg-gradient-button hover:bg-accent/90 shadow-button text-lg font-semibold"
            onClick={() => onNext('card-payment')}
          >
            <div className="flex flex-col items-center gap-3">
              <CreditCard className="w-8 h-8" />
              <span>Mit Karte bezahlen</span>
            </div>
          </Button>
          
          <Button 
            variant="default"
            size="lg"
            className="h-24 bg-gradient-button hover:bg-accent/90 shadow-button text-lg font-semibold opacity-50"
            disabled
          >
            <div className="flex flex-col items-center gap-3">
              <Coins className="w-8 h-8" />
              <span>Mit Münzen bezahlen</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};