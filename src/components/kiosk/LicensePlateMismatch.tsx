import React from 'react';
import { Button } from '@/components/ui/button';
import { KioskHeader } from './KioskHeader';

type Language = 'de' | 'it';

interface LicensePlateMismatchProps {
  licensePlate: string;
  scannedPlate: string;
  country: string;
  onNext: (step: 'arrival-time') => void;
  onBack: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onExit: () => void;
}

const translations = {
  de: {
    title: 'Kennzeichen stimmt nicht überein',
    subtitle: 'Das eingegebene Kennzeichen stimmt nicht mit dem gescannten überein.',
    scanned: 'Gescanntes Kennzeichen:',
    entered: 'Eingegebenes Kennzeichen:',
    question: 'Sind Sie sicher, dass dies korrekt ist?',
    countryCheck: 'Bitte prüfen Sie auch das ausgewählte Land.',
    back: 'Zurück',
    continue: 'Fortfahren'
  },
  it: {
    title: 'Targa non corrispondente',
    subtitle: 'La targa inserita non corrisponde a quella scansionata.',
    scanned: 'Targa scansionata:',
    entered: 'Targa inserita:',
    question: 'Sei sicuro che sia corretta?',
    countryCheck: 'Verifica anche il paese selezionato.',
    back: 'Indietro',
    continue: 'Continua'
  }
};

export const LicensePlateMismatch: React.FC<LicensePlateMismatchProps> = ({
  licensePlate,
  scannedPlate,
  country,
  onNext,
  onBack,
  language,
  onLanguageChange,
  onExit
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
      
      <div className="px-8 pb-8 text-center">
        <h2 className="text-2xl font-bold text-accent mb-4">
          {t.title}
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8">
          {t.subtitle}
        </p>
        
        <div className="space-y-6 mb-8">
          <div>
            <p className="text-sm font-semibold mb-2">{t.scanned}</p>
            <div className="bg-white border-4 border-gray-800 rounded-lg p-4 mx-auto max-w-xs">
              <div className="text-3xl font-mono font-bold text-gray-800">
                {scannedPlate}
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-semibold mb-2">{t.entered}</p>
            <div className="bg-white border-4 border-gray-800 rounded-lg p-4 mx-auto max-w-xs">
              <div className="text-3xl font-mono font-bold text-gray-800">
                {licensePlate}
              </div>
              <div className="flex justify-center items-center gap-2 mt-2">
                <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
                <div className="w-6 h-4 bg-white border rounded-sm"></div>
                <div className="w-6 h-4 bg-green-500 rounded-sm"></div>
                <span className="ml-2 font-semibold text-sm">{country}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-warning/20 rounded-lg">
          <p className="text-warning font-semibold mb-2">
            {t.question}
          </p>
          <p className="text-sm text-warning/80">
            {t.countryCheck}
          </p>
        </div>

        <div className="flex justify-center gap-6">
          <Button 
            variant="outline"
            size="lg"
            className="w-32 h-12 text-lg"
            onClick={onBack}
          >
            ← {t.back}
          </Button>
          
          <Button 
            size="lg"
            className="w-32 h-12 text-lg bg-gradient-primary"
            onClick={() => onNext('arrival-time')}
          >
            {t.continue} →
          </Button>
        </div>
      </div>
    </div>
  );
};