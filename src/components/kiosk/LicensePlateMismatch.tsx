import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { KioskHeader } from './KioskHeader';
import { LicensePlateDisplay } from './LicensePlateDisplay';
import { KioskFooter } from './KioskFooter';

type Language = 'de' | 'it';

interface LicensePlateMismatchProps {
  licensePlate: string;
  scannedPlate: string;
  country: string;
  onNext: (step: 'arrival-time', data?: { country?: string }) => void;
  onBack: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onExit: () => void;
}

const translations = {
  de: {
    title: 'Sind Sie sicher, dass dies Ihr Kennzeichen ist?',
    warning: 'Bitte prüfen Sie Ihre Eingabe und das ausgewählte Land.',
    back: 'Zurück',
    continue: 'Ja, weiter',
  },
  it: {
    title: 'Sei sicuro che questa sia la tua targa?',
    warning: 'Verifica la tua inserimento e il paese selezionato.',
    back: 'Torna indietro',
    continue: 'Sì, continua',
  },
};

const countries = [
  { code: 'IT', name: 'Italien', flag: '🇮🇹', flagName: 'Italia' },
  { code: 'DE', name: 'Deutschland', flag: '🇩🇪', flagName: 'Germania' },
  { code: 'AT', name: 'Österreich', flag: '🇦🇹', flagName: 'Austria' },
  { code: 'CH', name: 'Schweiz', flag: '🇨🇭', flagName: 'Svizzera' }
];

export const LicensePlateMismatch: React.FC<LicensePlateMismatchProps> = ({
  licensePlate,
  scannedPlate,
  country,
  onNext,
  onBack,
  language,
  onLanguageChange,
  onExit,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const t = translations[language];
  const currentCountry = countries.find(c => c.code === selectedCountry) || countries[0];

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setShowCountryDropdown(false);
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
        <h2 className="text-2xl font-bold text-accent mb-8">{t.title}</h2>
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <LicensePlateDisplay licensePlate={licensePlate} country={selectedCountry} />
            <div className="relative">
              <Button
                variant="outline"
                className="h-12 px-4 flex items-center gap-2"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              >
                <span className="text-2xl">{currentCountry.flag}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              {showCountryDropdown && (
                <div className="absolute top-full mt-1 left-0 bg-white border rounded-lg shadow-lg z-50 min-w-[200px]">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country.code)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-secondary w-full text-left"
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span>{language === 'de' ? country.name : country.flagName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-full max-w-md mx-auto mt-4">
            <div className="bg-orange-100 border border-orange-400 text-orange-800 text-base font-semibold rounded-lg px-4 py-3 shadow mt-2 flex items-center">
              <span className="text-3xl font-bold text-orange-500 mr-4 ml-1">!</span>
              <span>{t.warning}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <Button
            size="lg"
            className="w-40 h-14 text-lg bg-orange-500 hover:bg-orange-600 text-white font-bold"
            onClick={onBack}
          >
            ← {t.back}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-40 h-14 text-lg"
            onClick={() => onNext('arrival-time', { country: selectedCountry })}
          >
            {t.continue} →
          </Button>
        </div>
      </div>
      {/* Footer always at the bottom */}
      <KioskFooter language={language} />
    </div>
  );
};
