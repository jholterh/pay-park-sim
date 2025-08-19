import React from 'react';

type Language = 'de' | 'it';

const translations = {
  de: {
    location: 'Montiggler See - P1 - Wald',
    hotline: 'Störungshotline +39 0471 143 0* **'
  },
  it: {
    location: 'Montiggler See - P1 - Wald',
    hotline: 'Assistenza +39 0471 143 0* **'
  }
};

interface KioskFooterProps {
  language: Language;
}

export const KioskFooter: React.FC<KioskFooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="px-8 pb-4 flex justify-between text-xs text-muted-foreground">
      <span>{t.location}</span>
      <span>{t.hotline}</span>
    </div>
  );
};
