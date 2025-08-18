import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown } from 'lucide-react';
import { KioskHeader } from './KioskHeader';

type Language = 'de' | 'it';

interface LicensePlateInputProps {
  onNext: (step: 'license-confirm', data: { licensePlate: string; country: string }) => void;
  country: string;
  initialPlate: string;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onExit: () => void;
  onBack: () => void;
}

const translations = {
  de: {
    title: 'Bitte geben Sie Ihr korrektes Kennzeichen ein',
    step1: '1.',
    step2: '2.',
    changeCountry: 'LAND ÄNDERN',
    proposal: 'Vorschlag:',
    continue: 'WEITER'
  },
  it: {
    title: 'Inserisci la tua targa corretta',
    step1: '1.',
    step2: '2.',
    changeCountry: 'CAMBIA PAESE',
    proposal: 'Proposta:',
    continue: 'CONTINUA'
  }
};

const countries = [
  { code: 'IT', name: 'Italien', flag: '🇮🇹', flagName: 'Italia' },
  { code: 'DE', name: 'Deutschland', flag: '🇩🇪', flagName: 'Germania' },
  { code: 'AT', name: 'Österreich', flag: '🇦🇹', flagName: 'Austria' },
  { code: 'CH', name: 'Schweiz', flag: '🇨🇭', flagName: 'Svizzera' }
];

export const LicensePlateInput: React.FC<LicensePlateInputProps> = ({ 
  onNext, 
  country, 
  initialPlate,
  language,
  onLanguageChange,
  onExit,
  onBack
}) => {
  const [plate, setPlate] = useState(initialPlate);
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [showProposal, setShowProposal] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];
  const demoPlate = 'GRZ-M266';
  const isValidPlate = plate.length >= 3;
  const currentCountry = countries.find(c => c.code === selectedCountry) || countries[0];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setShowProposal(plate.length > 2 && demoPlate.includes(plate.toUpperCase()));
  }, [plate]);

  const handleKeyPress = (key: string) => {
    if (key === 'DELETE') {
      setPlate(prev => prev.slice(0, -1));
    } else if (key === 'SPACE') {
      setPlate(prev => prev + ' ');
    } else {
      setPlate(prev => prev + key);
    }
  };

  const handleProposalClick = () => {
    setPlate(demoPlate);
    setShowProposal(false);
  };

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setShowCountryDropdown(false);
  };

  const germanKeyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'DELETE'],
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M', '-', 'SPACE']
  ];

  const italianKeyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'DELETE'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '-', 'SPACE']
  ];

  const currentKeyboard = language === 'de' ? germanKeyboard : italianKeyboard;

  return (
    <div className="bg-gradient-kiosk rounded-3xl shadow-kiosk animate-fade-in-up">
      <KioskHeader 
        showBack 
        onBack={onBack}
        language={language} 
        onLanguageChange={onLanguageChange}
        onExit={onExit}
      />
      
      <div className="px-8 pb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">
            {t.title}
          </h2>
          
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-lg font-bold mb-2">{t.step1}</div>
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="w-40 h-16 text-base flex items-center gap-3"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                >
                  <span className="text-2xl">{currentCountry.flag}</span>
                  <span className="font-medium">{t.changeCountry}</span>
                  <ChevronDown className="w-5 h-5" />
                </Button>
                
                {showCountryDropdown && (
                  <div className="absolute top-full mt-1 left-0 right-0 bg-white border rounded-lg shadow-lg z-50">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country.code)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-secondary w-full text-left"
                      >
                        <span className="text-xl">{country.flag}</span>
                        <span>{language === 'de' ? country.name : country.flagName}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold mb-2">{t.step2}</div>
              <Input
                ref={inputRef}
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                className="w-64 h-16 text-2xl text-center font-mono border-2 border-accent"
                placeholder={selectedCountry === 'IT' ? 'AB123CD' : 'AB-123-CD'}
                maxLength={12}
              />
            </div>
          </div>

          {showProposal && (
            <div className="mb-4">
              <Button 
                onClick={handleProposalClick}
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 text-lg"
              >
                {t.proposal} {demoPlate}
              </Button>
            </div>
          )}
        </div>

        <div className="mb-6">
          {currentKeyboard.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2 mb-2">
              {row.map((key) => (
                <Button
                  key={key}
                  variant={key >= '0' && key <= '9' ? 'default' : 'secondary'}
                  className={`w-14 h-14 font-semibold text-lg ${
                    key >= '0' && key <= '9' ? 'bg-blue-900 hover:bg-blue-800 text-white' : ''
                  }`}
                  onClick={() => handleKeyPress(key)}
                >
                  {key === 'DELETE' ? '⌫' : key === 'SPACE' ? '␣' : key}
                </Button>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="w-48 h-16 text-xl font-semibold bg-gradient-primary"
            disabled={!isValidPlate}
            onClick={() => onNext('license-confirm', { licensePlate: plate, country: selectedCountry })}
          >
            {t.continue} →
          </Button>
        </div>
      </div>
    </div>
  );
};