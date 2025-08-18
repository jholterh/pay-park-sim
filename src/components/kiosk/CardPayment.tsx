import React, { useEffect } from 'react';
import { CreditCard } from 'lucide-react';
import { KioskHeader } from './KioskHeader';

interface CardPaymentProps {
  onNext: (step: 'thank-you') => void;
}

export const CardPayment: React.FC<CardPaymentProps> = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext('thank-you');
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="bg-gradient-kiosk rounded-3xl shadow-kiosk animate-fade-in-up">
      <KioskHeader />
      
      <div className="px-8 pb-8 text-center">
        <h2 className="text-2xl font-bold text-accent mb-8">
          Bitte halten Sie Ihre Karte an das Lesegerät
        </h2>
        
        <div className="mb-8 relative">
          <div className="animate-kiosk-glow bg-primary/10 rounded-2xl p-8 mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-32 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg transform rotate-12 animate-pulse">
                  <div className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded opacity-30"></div>
                </div>
                <CreditCard className="w-24 h-24 text-primary absolute -top-2 -left-2 animate-pulse" />
              </div>
            </div>
            
            <div className="w-full h-16 bg-primary rounded-lg mb-4 flex items-center justify-center">
              <div className="w-12 h-8 bg-white rounded opacity-30 animate-pulse"></div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground">
            Kontaktloses Bezahlen ist schneller
          </p>
        </div>
      </div>
    </div>
  );
};