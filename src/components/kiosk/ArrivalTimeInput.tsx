import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { KioskHeader } from './KioskHeader';
import { KioskFooter } from './KioskFooter';

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
  de: { title: 'Wann sind Sie angekommen?', confirm: 'Bestätigen' },
  it: { title: 'Quando sei arrivato?', confirm: 'Conferma' }
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
  const now = new Date();

  const isToday =
    selectedDate.getDate() === now.getDate() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getFullYear() === now.getFullYear();

  const isFutureTime =
    isToday &&
    (hours > now.getHours() || (hours === now.getHours() && minutes > now.getMinutes()));

  const canIncreaseHour = !isToday || hours < now.getHours();
  const canIncreaseMinute =
    !isToday ||
    hours < now.getHours() ||
    (hours === now.getHours() && minutes < Math.floor(now.getMinutes() / 15) * 15);

  const isMaxDate =
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate();

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
    const now = new Date();
    now.setSeconds(0, 0);
    if (newDate > now) return;
    setSelectedDate(newDate);

    const isNowToday =
      newDate.getDate() === now.getDate() &&
      newDate.getMonth() === now.getMonth() &&
      newDate.getFullYear() === now.getFullYear();

    if (isNowToday) {
      if (
        hours > now.getHours() ||
        (hours === now.getHours() && minutes > now.getMinutes())
      ) {
        const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
        let roundedMinutes = Math.floor(threeHoursAgo.getMinutes() / 15) * 15;
        setHours(threeHoursAgo.getHours());
        setMinutes(roundedMinutes);
      }
    }
  };

  const adjustTime = (type: 'hours' | 'minutes', delta: number) => {
    if (type === 'hours') {
      let newHour = hours + delta;
      if (newHour < 0) newHour = 23;
      if (newHour > 23) newHour = 0;
      if (isToday && newHour > now.getHours()) newHour = now.getHours();
      setHours(newHour);
      if (isToday && newHour === now.getHours() && minutes > now.getMinutes()) {
        setMinutes(Math.floor(now.getMinutes() / 15) * 15);
      }
    } else {
      let newMinutes = minutes + delta;
      if (newMinutes > 59) newMinutes = 0;
      if (newMinutes < 0) newMinutes = 45;
      newMinutes = Math.floor(newMinutes / 15) * 15;
      if (isToday && hours === now.getHours() && newMinutes > now.getMinutes()) {
        newMinutes = Math.floor(now.getMinutes() / 15) * 15;
      }
      setMinutes(newMinutes);
    }
  };

  const handleConfirm = () => {
    const arrivalTime = new Date(selectedDate);
    arrivalTime.setHours(hours, minutes, 0, 0);
    onNext('payment-selection', { arrivalTime });
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
  
      {/* Main content area fills all space between header and footer */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="px-8 pb-8 text-center">
          <h2 className="text-2xl font-bold text-accent mb-8">{t.title}</h2>
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => adjustDate(-1)}
                className="w-16 h-16"
              >
                <ChevronLeft className="w-10 h-10" />
              </Button>
              <div className="text-xl font-semibold min-w-80">
                {formatDate(selectedDate)}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => adjustDate(1)}
                className="w-16 h-16"
                disabled={isMaxDate}
              >
                <ChevronRight className="w-10 h-10" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8">
              {/* Hours */}
              <div className="flex flex-col items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => canIncreaseHour && adjustTime('hours', 1)}
                  className="w-16 h-16 flex items-center justify-center"
                  disabled={!canIncreaseHour}
                >
                  <ChevronUp className="w-12 h-12" />
                </Button>
                <div className="text-4xl font-mono font-bold py-4 min-w-20">
                  {hours.toString().padStart(2, '0')}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => adjustTime('hours', -1)}
                  className="w-16 h-16 flex items-center justify-center"
                >
                  <ChevronDown className="w-12 h-12" />
                </Button>
              </div>
              <div className="text-4xl font-bold">:</div>
              {/* Minutes */}
              <div className="flex flex-col items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => canIncreaseMinute && adjustTime('minutes', 15)}
                  className="w-16 h-16 flex items-center justify-center"
                  disabled={!canIncreaseMinute}
                >
                  <ChevronUp className="w-12 h-12" />
                </Button>
                <div className="text-4xl font-mono font-bold py-4 min-w-20">
                  {minutes.toString().padStart(2, '0')}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => adjustTime('minutes', -15)}
                  className="w-16 h-16 flex items-center justify-center"
                >
                  <ChevronDown className="w-12 h-12" />
                </Button>
              </div>
            </div>
          </div>
          <Button
            size="lg"
            className="w-48 h-16 text-xl bg-gradient-primary"
            onClick={handleConfirm}
            disabled={isFutureTime}
          >
            {t.confirm} →
          </Button>
        </div>
      </div>
  
      {/* Footer always at the bottom */}
      <KioskFooter language={language} />
    </div>
  );
  };  
