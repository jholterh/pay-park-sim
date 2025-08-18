import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { KioskHeader } from './KioskHeader';

type Language = 'de' | 'it';

interface ArrivalTimeInputProps {
  onNext: (step: 'payment-selection', data: { arrivalTime: Date }) => void;
  initialTime: Date;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onExit: () => void;
  onBack: () => void;
}

const translations = {
  de: {
    title: 'Wann sind Sie angekommen?',
    confirm: 'Bestätigen'
  },
  it: {
    title: 'Quando sei arrivato?',
    confirm: 'Conferma'
  }
};

export const ArrivalTimeInput: React.FC<ArrivalTimeInputProps> = ({
  onNext,
  initialTime,
  language,
  onLanguageChange,
  onExit,
  onBack
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hours, setHours] = useState(initialTime.getHours());
  const [minutes, setMinutes] = useState(Math.floor(initialTime.getMinutes() / 15) * 15);

  const t = translations[language];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'it-IT', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const adjustDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const adjustTime = (type: 'hours' | 'minutes', delta: number) => {
    if (type === 'hours') {
      setHours(prev => Math.max(0, Math.min(23, prev + delta)));
    } else {
      // Minutes in 15-minute increments
      setMinutes(prev => {
        const newMinutes = prev + delta;
        if (newMinutes < 0) return 45;
        if (newMinutes > 59) return 0;
        return Math.floor(newMinutes / 15) * 15;
      });
    }
  };

  const handleConfirm = () => {
    const arrivalTime = new Date(selectedDate);
    arrivalTime.setHours(hours, minutes, 0, 0);
    onNext('payment-selection', { arrivalTime });
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
          {t.title}
        </h2>
        
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => adjustDate(-1)} 
              className="w-16 h-16"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <div className="text-xl font-semibold min-w-80">
              {formatDate(selectedDate)}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => adjustDate(1)} 
              className="w-16 h-16"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => adjustTime('hours', 1)} 
                className="w-16 h-16 mx-auto block"
              >
                <ChevronUp className="w-8 h-8" />
              </Button>
              <div className="text-4xl font-mono font-bold py-4 min-w-20">
                {hours.toString().padStart(2, '0')}
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => adjustTime('hours', -1)} 
                className="w-16 h-16 mx-auto block"
              >
                <ChevronDown className="w-8 h-8" />
              </Button>
            </div>
            
            <div className="text-4xl font-bold">:</div>
            
            <div className="text-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => adjustTime('minutes', 15)} 
                className="w-16 h-16 mx-auto block"
              >
                <ChevronUp className="w-8 h-8" />
              </Button>
              <div className="text-4xl font-mono font-bold py-4 min-w-20">
                {minutes.toString().padStart(2, '0')}
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => adjustTime('minutes', -15)} 
                className="w-16 h-16 mx-auto block"
              >
                <ChevronDown className="w-8 h-8" />
              </Button>
            </div>
          </div>
        </div>

        <Button 
          size="lg"
          className="w-48 h-16 text-xl bg-gradient-primary"
          onClick={handleConfirm}
        >
          {t.confirm} →
        </Button>
      </div>
    </div>
  );
};