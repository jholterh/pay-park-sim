import React from 'react';
import { Button } from '@/components/ui/button';
import { KioskHeader } from './KioskHeader';
import { LicensePlateDisplay } from './LicensePlateDisplay'; // <-- import the new component
import { KioskFooter } from './KioskFooter';

type Language = 'de' | 'it';

interface LicensePlateConfirmProps {
  licensePlate: string;
  country: string;
  isDemoPlate: boolean;
  onNext: (step: 'arrival-time' | 'payment-selection' | 'license-mismatch') => void;
  onBack: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onExit: () => void;
}

const translations = {
  de: {
    question: 'Ist das Ihr Kennzeichen?',
    edit: 'Bearbeiten',
    yes: 'Ja',
    countryWarning: 'Bitte prüfen Sie das Land'
  },
  it: {
    question: 'È questa la tua targa?',
    edit: 'Modifica',
    yes: 'Sì',
    countryWarning: 'Verifica il paese'
  }
};

export const LicensePlateConfirm: React.FC<LicensePlateConfirmProps> = ({
  licensePlate,
  country,
  isDemoPlate,
  onNext,
  onBack,
  language,
  onLanguageChange,
  onExit
}) => {
  const t = translations[language];

  const handleConfirm = () => {
    if (isDemoPlate) {
      onNext('payment-selection');
    } else {
      onNext('license-mismatch');
    }
  };

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
        <h2 className="text-2xl font-bold text-accent mb-8">
          {t.question}
        </h2>
  
        <div className="mb-8">
          <LicensePlateDisplay
            licensePlate={licensePlate}
            country={country}
          />
        </div>
  
        {!isDemoPlate && (
          <div className="mb-6 p-4 bg-warning/20 rounded-lg">
            <p className="text-warning font-semibold">
              {t.countryWarning}
            </p>
          </div>
        )}
  
        <div className="flex justify-center gap-6">
          <Button
            variant="outline"
            size="lg"
            className="w-40 h-16 text-lg"
            onClick={onBack}
          >
            ← {t.edit}
          </Button>
          <Button
            size="lg"
            className="w-40 h-16 text-lg bg-gradient-primary"
            onClick={handleConfirm}
          >
            {t.yes} →
          </Button>
        </div>
      </div>
  
      {/* Footer always at the bottom */}
      <KioskFooter language={language} />
    </div>
  );
};  
