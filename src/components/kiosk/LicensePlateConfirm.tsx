import React from 'react';
import { Button } from '@/components/ui/button';
import { KioskHeader } from './KioskHeader';

interface LicensePlateConfirmProps {
  licensePlate: string;
  country: string;
  isDemoPlate: boolean;
  onNext: (step: 'arrival-time' | 'payment-selection') => void;
  onBack: () => void;
}

export const LicensePlateConfirm: React.FC<LicensePlateConfirmProps> = ({
  licensePlate,
  country,
  isDemoPlate,
  onNext,
  onBack
}) => {
  const handleConfirm = () => {
    if (isDemoPlate) {
      onNext('payment-selection');
    } else {
      onNext('arrival-time');
    }
  };

  return (
    <div className="bg-gradient-kiosk rounded-3xl shadow-kiosk animate-fade-in-up">
      <KioskHeader showBack onBack={onBack} />
      
      <div className="px-8 pb-8 text-center">
        <h2 className="text-2xl font-bold text-accent mb-8">
          Ist das Ihr Kennzeichen?
        </h2>
        
        <div className="mb-8">
          <div className="text-6xl font-mono font-bold text-primary mb-4">
            {licensePlate}
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-6 bg-red-500 rounded-sm"></div>
            <div className="w-8 h-6 bg-white border rounded-sm"></div>
            <div className="w-8 h-6 bg-green-500 rounded-sm"></div>
            <span className="ml-2 font-semibold">{country}</span>
          </div>
        </div>

        {!isDemoPlate && (
          <div className="mb-6 p-4 bg-warning/20 rounded-lg">
            <p className="text-warning font-semibold">
              Bitte prüfen Sie das Land
            </p>
          </div>
        )}

        <div className="flex justify-center gap-6">
          <Button 
            variant="outline"
            className="w-32 h-12 text-lg"
            onClick={onBack}
          >
            Bearbeiten
          </Button>
          
          <Button 
            className="w-32 h-12 text-lg bg-gradient-primary"
            onClick={handleConfirm}
          >
            Ja
          </Button>
        </div>
      </div>
    </div>
  );
};