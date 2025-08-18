import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock } from 'lucide-react';
import { KioskHeader } from './KioskHeader';

interface ThankYouProps {
  onRestart: () => void;
}

export const ThankYou: React.FC<ThankYouProps> = ({ onRestart }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRestart();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onRestart]);

  return (
    <div className="bg-gradient-kiosk rounded-3xl shadow-kiosk animate-fade-in-up">
      <KioskHeader />
      
      <div className="px-8 pb-8 text-center">
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6 animate-pulse" />
          
          <h2 className="text-3xl font-bold text-primary mb-6">
            Danke für Ihre Zahlung!
          </h2>
          
          <div className="bg-white rounded-lg p-6 shadow-inner mb-6">
            <div className="flex items-center justify-center gap-3 text-lg">
              <Clock className="w-6 h-6 text-warning" />
              <span>
                Sie haben jetzt <strong>15 Minuten</strong> Zeit,<br />
                um den Parkplatz zu verlassen.
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button 
            className="w-full h-12 text-lg bg-gradient-primary"
            onClick={onRestart}
          >
            Beenden / Exit / Uscita
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Automatisches Beenden in wenigen Sekunden...
          </p>
        </div>
      </div>
    </div>
  );
};