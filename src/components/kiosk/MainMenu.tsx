import React from 'react';
import { ArrowRight, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KioskHeader } from './KioskHeader';

type Language = 'de' | 'it';

interface MainMenuProps {
  onNext: (step: 'license-input' | 'main-menu', data?: any) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onExit: () => void;
}

const translations = {
  de: {
    title: 'PARKEN BEZAHLEN',
    leaving: 'ICH FAHRE WEG',
    dayTicket: 'TAGESTICKET',
    location: 'Mautlüggler See - P1 - Wald',
    hotline: 'Störungshotline +39 0471 143 05 02'
  },
  it: {
    title: 'PAGARE PARCHEGGIO',
    leaving: 'STO USCENDO',
    dayTicket: 'BIGLIETTO GIORNALIERO',
    location: 'Mautlüggler See - P1 - Wald',
    hotline: 'Assistenza +39 0471 143 05 02'
  }
};

export const MainMenu: React.FC<MainMenuProps> = ({ onNext, language, onLanguageChange, onExit }) => {
  const t = translations[language];
  return (
    <div className="bg-gradient-kiosk rounded-3xl shadow-kiosk animate-fade-in-up">
      <KioskHeader language={language} onLanguageChange={onLanguageChange} onExit={onExit} />
      
      <div className="px-8 pb-8">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">
          {t.title}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Button 
            variant="default"
            size="lg"
            className="h-32 bg-gradient-button hover:bg-accent/90 shadow-button text-xl font-semibold"
            onClick={() => onNext('license-input')}
          >
            <div className="flex flex-col items-center gap-4">
              <ArrowRight className="w-12 h-12" />
              <span>{t.leaving}</span>
            </div>
          </Button>
          
          <Button 
            variant="default"
            size="lg"
            className="h-32 bg-gradient-button hover:bg-accent/90 shadow-button text-xl font-semibold opacity-75"
            disabled
          >
            <div className="flex flex-col items-center gap-4">
              <Car className="w-12 h-12" />
              <span>{t.dayTicket}</span>
            </div>
          </Button>
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{t.location}</span>
          <span>
            {t.hotline}
          </span>
        </div>
      </div>
    </div>
  );
};