import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Coins } from 'lucide-react';
import { KioskHeader } from './KioskHeader';

type Language = 'de' | 'it';

interface PaymentSelectionProps {
  licensePlate: string;
  duration: { hours: number; minutes: number };
  cost: number;
  onNext: (step: 'card-payment') => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onExit: () => void;
  onBack: () => void;
}

const translations = {
  de: {
    duration: 'Parkdauer:',
    hours: 'Stunden',
    minutes: 'Minuten',
    selectPayment: 'Bitte wählen Sie eine Zahlungsmethode',
    cardPayment: 'Mit Karte bezahlen',
    coinPayment: 'Mit Münzen bezahlen'
  },
  it: {
    duration: 'Durata parcheggio:',
    hours: 'ore',
    minutes: 'minuti',
    selectPayment: 'Seleziona un metodo di pagamento',
    cardPayment: 'Paga con carta',
    coinPayment: 'Paga con monete'
  }
};

export const PaymentSelection: React.FC<PaymentSelectionProps> = ({
  licensePlate,
  duration,
  cost,
  onNext,
  language,
  onLanguageChange,
  onExit,
  onBack
}) => {
  const t = translations[language];
  return (
    <div className="bg-gradient-kiosk rounded-3xl shadow-kiosk animate-fade-in-up">
      <KioskHeader 
        showBack 
        onBack={onBack}
        language={language} 
        onLanguageChange={onLanguageChange}
        onExit={onExit}
      />
      
      <div className="px-8 pb-8">
        <div className="text-center mb-8">
          {/* License plate styled like European plate */}
          <div className="bg-white border-4 border-gray-800 rounded-lg p-4 mx-auto max-w-sm shadow-lg mb-6">
            <div className="text-4xl font-mono font-bold text-gray-800">
              {licensePlate}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 mb-6 shadow-inner">
            <div className="text-xl mb-2">
              {t.duration} <span className="font-semibold">
                {duration.hours} {t.hours} {duration.minutes} {t.minutes}
              </span>
            </div>
            <div className="text-5xl font-bold text-primary">
              {cost.toFixed(2)} €
            </div>
          </div>
          
          <h2 className="text-xl text-accent mb-8">
            {t.selectPayment}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button 
            variant="default"
            size="lg"
            className="h-32 bg-gradient-button hover:bg-accent/90 shadow-button text-xl font-semibold"
            onClick={() => onNext('card-payment')}
          >
            <div className="flex flex-col items-center gap-4">
              <CreditCard className="w-12 h-12" />
              <span>{t.cardPayment}</span>
            </div>
          </Button>
          
          <Button 
            variant="default"
            size="lg"
            className="h-32 bg-gradient-button hover:bg-accent/90 shadow-button text-xl font-semibold opacity-50"
            disabled
          >
            <div className="flex flex-col items-center gap-4">
              <Coins className="w-12 h-12" />
              <span>{t.coinPayment}</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};