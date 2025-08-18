import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { KioskHeader } from './KioskHeader';

interface ArrivalTimeInputProps {
  onNext: (step: 'payment-selection', data: { arrivalTime: Date }) => void;
  initialTime: Date;
}

export const ArrivalTimeInput: React.FC<ArrivalTimeInputProps> = ({
  onNext,
  initialTime
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hours, setHours] = useState(initialTime.getHours());
  const [minutes, setMinutes] = useState(initialTime.getMinutes());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('de-DE', {
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
      setMinutes(prev => Math.max(0, Math.min(59, prev + delta)));
    }
  };

  const handleConfirm = () => {
    const arrivalTime = new Date(selectedDate);
    arrivalTime.setHours(hours, minutes, 0, 0);
    onNext('payment-selection', { arrivalTime });
  };

  return (
    <div className="bg-gradient-kiosk rounded-3xl shadow-kiosk animate-fade-in-up">
      <KioskHeader showBack />
      
      <div className="px-8 pb-8 text-center">
        <h2 className="text-2xl font-bold text-accent mb-8">
          Wann sind Sie angekommen?
        </h2>
        
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button onClick={() => adjustDate(-1)} className="p-2 hover:bg-secondary rounded">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-xl font-semibold min-w-80">
              {formatDate(selectedDate)}
            </div>
            <button onClick={() => adjustDate(1)} className="p-2 hover:bg-secondary rounded">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <button onClick={() => adjustTime('hours', 1)} className="p-2 hover:bg-secondary rounded block mx-auto">
                <ChevronUp className="w-6 h-6" />
              </button>
              <div className="text-4xl font-mono font-bold py-4 min-w-20">
                {hours.toString().padStart(2, '0')}
              </div>
              <button onClick={() => adjustTime('hours', -1)} className="p-2 hover:bg-secondary rounded block mx-auto">
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-4xl font-bold">:</div>
            
            <div className="text-center">
              <button onClick={() => adjustTime('minutes', 5)} className="p-2 hover:bg-secondary rounded block mx-auto">
                <ChevronUp className="w-6 h-6" />
              </button>
              <div className="text-4xl font-mono font-bold py-4 min-w-20">
                {minutes.toString().padStart(2, '0')}
              </div>
              <button onClick={() => adjustTime('minutes', -5)} className="p-2 hover:bg-secondary rounded block mx-auto">
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <Button 
          className="w-40 h-12 text-lg bg-gradient-primary"
          onClick={handleConfirm}
        >
          Bestätigen
        </Button>
      </div>
    </div>
  );
};