import React from 'react';
import { HelpCircle } from 'lucide-react';

interface KioskHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export const KioskHeader: React.FC<KioskHeaderProps> = ({ showBack, onBack }) => {
  const currentDate = new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="flex justify-between items-center p-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        {showBack && (
          <button onClick={onBack} className="p-2 hover:bg-secondary rounded-full">
            ←
          </button>
        )}
        <span>{currentDate}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-white rounded px-2 py-1">
          <span className="w-5 h-3 bg-red-500 rounded-sm"></span>
          <span className="w-5 h-3 bg-yellow-500 rounded-sm"></span>
          <span className="w-5 h-3 bg-black rounded-sm"></span>
          <span className="text-xs font-medium">DE</span>
        </div>
        <button className="p-2 hover:bg-secondary rounded-full">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};