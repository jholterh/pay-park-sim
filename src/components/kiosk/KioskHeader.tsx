import React, { useState } from 'react';
import { HelpCircle, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Language = 'de' | 'it';

interface KioskHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  language?: Language;
  onLanguageChange?: (language: Language) => void;
  onExit?: () => void;
}

export const KioskHeader: React.FC<KioskHeaderProps> = ({ 
  showBack, 
  onBack, 
  language = 'de', 
  onLanguageChange,
  onExit 
}) => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  const currentDate = new Date().toLocaleDateString(language === 'de' ? 'de-DE' : 'it-IT', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const languages = [
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="flex justify-between items-center p-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="w-12 h-12 text-2xl hover:bg-secondary"
          >
            ←
          </Button>
        )}
        <span className="text-base">{currentDate}</span>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Language selector */}
        {onLanguageChange && (
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 px-3 py-2 h-auto"
            >
              <span className="text-xl">{currentLanguage.flag}</span>
              <span className="font-medium">{currentLanguage.code.toUpperCase()}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
            
            {showLanguageDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setShowLanguageDropdown(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary w-full text-left"
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        <Button variant="ghost" size="icon" className="w-12 h-12">
          <HelpCircle className="w-6 h-6" />
        </Button>
        
        {onExit && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onExit}
            className="w-12 h-12 text-2xl hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="w-6 h-6" />
          </Button>
        )}
      </div>
    </div>
  );
};