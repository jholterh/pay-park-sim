import React, { useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { CheckCircle, Clock } from 'lucide-react';
import { KioskHeader } from './KioskHeader';
import { KioskFooter } from './KioskFooter';

type Language = 'de' | 'it';

interface ThankYouProps {
  onRestart: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onExit: () => void;
}

const translations = {
  de: {
    title: 'Danke für Ihre Zahlung!',
    time: 'Sie haben jetzt 15 Minuten Zeit, um den Parkplatz zu verlassen.',
    exit: 'Beenden / Exit / Uscita',
    autoExit: 'Automatisches Beenden in wenigen Sekunden...'
  },
  it: {
    title: 'Grazie per il pagamento!',
    time: 'Hai ora 15 minuti per lasciare il parcheggio.',
    exit: 'Esci / Exit / Beenden',
    autoExit: 'Uscita automatica tra pochi secondi...'
  }
};

export const ThankYou: React.FC<ThankYouProps> = ({
  onRestart,
  language,
  onLanguageChange,
  onExit
}) => {
  const t = translations[language];

  // Handler to reset and exit
  const handleExit = useCallback(() => {
    onRestart();
    onExit();
  }, [onRestart, onExit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onRestart();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onRestart]);

  return (
    <div className="h-full flex flex-col animate-fade-in-up">
      <KioskHeader
        language={language}
        onLanguageChange={onLanguageChange}
        onExit={handleExit}
      />
      <div className="px-8 pb-8 text-center flex-1 flex flex-col justify-center">
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 text-primary mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold text-primary mb-6">
            {t.title}
          </h2>
          <div className="bg-white rounded-lg p-6 shadow-inner mb-6">
            <div className="flex items-center justify-center gap-3 text-xl">
              <Clock className="w-8 h-8 text-warning" />
              <span>{t.time}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full h-16 text-xl bg-gradient-primary"
            onClick={handleExit}
          >
            {t.exit}
          </Button>
          <p className="text-sm text-muted-foreground">
            {t.autoExit}
          </p>
        </div>
      </div>
      {/* Footer always at the bottom */}
      <KioskFooter language={language} />
    </div>
  );
};
