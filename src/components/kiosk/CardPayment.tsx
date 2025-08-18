import React, { useEffect } from 'react';
import { CreditCard } from 'lucide-react';
import { KioskHeader } from './KioskHeader';

type Language = 'de' | 'it';

interface CardPaymentProps {
  onNext: (step: 'thank-you') => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onExit: () => void;
  onBack: () => void;
}

const translations = {
  de: {
    title: 'Bitte halten Sie Ihre Karte an das Lesegerät',
    tip: 'Kontaktloses Bezahlen ist schneller'
  },
  it: {
    title: 'Avvicina la carta al lettore',
    tip: 'Il pagamento contactless è più veloce'
  }
};

export const CardPayment: React.FC<CardPaymentProps> = ({ 
  onNext, 
  language, 
  onLanguageChange, 
  onExit, 
  onBack 
}) => {
  const t = translations[language];
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext('thank-you');
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNext]);

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
        
        <div className="mb-8 relative">
          <div className="animate-kiosk-glow bg-primary/10 rounded-2xl p-8 mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-40 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg transform rotate-12 animate-pulse">
                  <div className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded opacity-30"></div>
                </div>
                <CreditCard className="w-32 h-32 text-primary absolute -top-4 -left-4 animate-pulse" />
              </div>
            </div>
            
            <div className="w-full h-20 bg-primary rounded-lg mb-6 flex items-center justify-center">
              <div className="w-16 h-12 bg-white rounded opacity-30 animate-pulse"></div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground">
            {t.tip}
          </p>
        </div>
      </div>
    </div>
  );
};