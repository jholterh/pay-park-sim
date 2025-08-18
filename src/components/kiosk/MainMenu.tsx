import React from 'react';
import { ArrowRight, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KioskHeader } from './KioskHeader';

interface MainMenuProps {
  onNext: (step: 'license-input' | 'main-menu', data?: any) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onNext }) => {
  return (
    <div className="bg-gradient-kiosk rounded-3xl shadow-kiosk animate-fade-in-up">
      <KioskHeader />
      
      <div className="px-8 pb-8">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">
          PARKEN BEZAHLEN
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Button 
            variant="default"
            size="lg"
            className="h-32 bg-gradient-button hover:bg-accent/90 shadow-button text-lg font-semibold"
            onClick={() => onNext('license-input')}
          >
            <div className="flex flex-col items-center gap-3">
              <ArrowRight className="w-8 h-8" />
              <span>ICH FAHRE WEG</span>
            </div>
          </Button>
          
          <Button 
            variant="default"
            size="lg"
            className="h-32 bg-gradient-button hover:bg-accent/90 shadow-button text-lg font-semibold opacity-75"
            disabled
          >
            <div className="flex flex-col items-center gap-3">
              <Car className="w-8 h-8" />
              <span>TAGESTICKET</span>
            </div>
          </Button>
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Mautlüggler See - P1 - Wald</span>
          <span>
            Störungshotline<br />
            +39 0471 143 05 02
          </span>
        </div>
      </div>
    </div>
  );
};