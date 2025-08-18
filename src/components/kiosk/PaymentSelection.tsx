import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Coins } from 'lucide-react';
import { KioskHeader } from './KioskHeader';
import { LicensePlateDisplay } from './LicensePlateDisplay';
import { KioskFooter } from './KioskFooter';

type Language = 'de' | 'it';

interface PaymentSelectionProps {
  licensePlate: string;
  country: string;
  arrivalTime: Date | string; // Accept both Date and string
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

function getDurationParts(arrivalInput: Date | string, now: Date) {
  // Always convert arrivalInput to Date
  const arrival = typeof arrivalInput === 'string' ? new Date(arrivalInput) : arrivalInput;
  if (!(arrival instanceof Date) || isNaN(arrival.getTime())) return { hours: 0, minutes: 0 };
  let ms = now.getTime() - arrival.getTime();
  ms = Math.max(ms, 0); // Prevent negative
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

export const PaymentSelection: React.FC<PaymentSelectionProps> = ({
  licensePlate,
  country,
  arrivalTime,
  cost,
  onNext,
  language,
  onLanguageChange,
  onExit,
  onBack
}) => {
  const t = translations[language];
  const now = new Date();
  const { hours, minutes } = getDurationParts(arrivalTime, now);

  return (
    <div className="h-full flex flex-col animate-fade-in-up">
      <KioskHeader
        showBack
        onBack={onBack}
        language={language}
        onLanguageChange={onLanguageChange}
        onExit={onExit}
      />
      <div className="px-8 pb-8 text-center flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="mb-6">
            <LicensePlateDisplay licensePlate={licensePlate} country={country} />
          </div>
          <div className="bg-white rounded-lg p-6 mb-6 shadow-inner">
            <div className="text-xl mb-2">
              {t.duration}{' '}
              <span className="font-semibold">
                {hours} {t.hours} {minutes} {t.minutes}
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
      {/* Footer always at the bottom */}
      <KioskFooter language={language} />
    </div>
  );
};
