import React from 'react';
import { Button } from '@/components/ui/button';
import { KioskHeader } from './KioskHeader';

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

const getCountryFlag = (country: string) => {
  const flags: { [key: string]: JSX.Element } = {
    'IT': (
      <>
        <div className="w-8 h-6 bg-green-500 rounded-sm"></div>
        <div className="w-8 h-6 bg-white border rounded-sm"></div>
        <div className="w-8 h-6 bg-red-500 rounded-sm"></div>
      </>
    ),
    'DE': (
      <>
        <div className="w-8 h-6 bg-black rounded-sm"></div>
        <div className="w-8 h-6 bg-red-500 rounded-sm"></div>
        <div className="w-8 h-6 bg-yellow-500 rounded-sm"></div>
      </>
    ),
    'AT': (
      <>
        <div className="w-8 h-6 bg-red-500 rounded-sm"></div>
        <div className="w-8 h-6 bg-white border rounded-sm"></div>
        <div className="w-8 h-6 bg-red-500 rounded-sm"></div>
      </>
    ),
    'CH': (
      <>
        <div className="w-8 h-6 bg-red-500 rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-white"></div>
        </div>
      </>
    )
  };
  return flags[country] || flags['DE'];
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
    <div className="bg-gradient-kiosk rounded-3xl shadow-kiosk animate-fade-in-up">
      <KioskHeader 
        showBack 
        onBack={onBack} 
        language={language} 
        onLanguageChange={onLanguageChange}
        onExit={onExit}
      />
      
      <div className="px-8 pb-8 text-center">
        <h2 className="text-2xl font-bold text-accent mb-8">
          {t.question}
        </h2>
        
        <div className="mb-8">
          {/* License plate styled like a real European plate */}
          <div className="bg-white border-4 border-gray-800 rounded-lg p-6 mx-auto max-w-sm shadow-lg">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-2">
              {licensePlate}
            </div>
            <div className="flex justify-center items-center gap-2 mb-2">
              {getCountryFlag(country)}
              <span className="ml-2 font-semibold text-lg">{country}</span>
            </div>
            {/* EU stars */}
            <div className="flex justify-center">
              <div className="text-blue-600 text-xs">★★★★★★★★★★★★</div>
            </div>
          </div>
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
    </div>
  );
};