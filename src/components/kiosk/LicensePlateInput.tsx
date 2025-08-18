import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, X } from 'lucide-react';
import { KioskHeader } from './KioskHeader';
import { LicensePlateDisplay } from './LicensePlateDisplay';
import { KioskFooter } from './KioskFooter';


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
  const [caret, setCaret] = useState(initialPlate.length);
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [showProposal, setShowProposal] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];
  const demoPlate = 'GRZ-M266';
  const demoCountry = 'IT';
  const isValidPlate = plate.length >= 4;
  const currentCountry = countries.find(c => c.code === selectedCountry) || countries[0];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(caret, caret);
    }
  }, [caret, plate, selectedCountry]); // ← add selectedCountry here
  
  

  useEffect(() => {
    if (selectedCountry === demoCountry) {
      // Remove all dashes, compare up to entered length
      const normalizedPlate = plate.replace(/-/g, '').toUpperCase();
      const normalizedDemo = demoPlate.replace(/-/g, '').toUpperCase();
      const match =
        normalizedPlate.length > 3 &&
        normalizedDemo.startsWith(normalizedPlate);
  
      setShowProposal(match);
    } else {
      setShowProposal(false);
    }
  }, [plate, selectedCountry]);
  
  
  

  // Handle caret position when user clicks/taps in the input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlate(e.target.value.toUpperCase());
    setCaret(e.target.selectionStart || 0);
  };

  const handleInputSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCaret(target.selectionStart || 0);
  };

  // Handle on-screen keyboard input at cursor
  const handleKeyPress = (key: string) => {
    if (!inputRef.current) return;

    let newPlate = plate;
    let newCaret = caret;

    if (key === 'DELETE') {
      if (caret > 0) {
        newPlate = plate.slice(0, caret - 1) + plate.slice(caret);
        newCaret = caret - 1;
      }
    } else if (key === 'SPACE') {
      newPlate = plate.slice(0, caret) + ' ' + plate.slice(caret);
      newCaret = caret + 1;
    } else {
      newPlate = plate.slice(0, caret) + key + plate.slice(caret);
      newCaret = caret + 1;
    }

    setPlate(newPlate);
    setCaret(newCaret);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(newCaret, newCaret);
    }, 0);
  };

  const handleProposalClick = () => {
    onNext('license-confirm', { licensePlate: demoPlate, country: selectedCountry });
  };

  const handleDismissProposal = () => {
    setShowProposal(false);
    setPlate(prev => prev.slice(0, 3));
    setCaret(3);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(3, 3);
    }, 0);
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
    <div className="h-full flex flex-col animate-fade-in-up">
      <KioskHeader
        showBack
        onBack={onBack}
        language={language}
        onLanguageChange={onLanguageChange}
        onExit={onExit}
      />
  
      <div className="px-8 pb-8 text-center flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">{t.title}</h2>
          <div className="flex items-center justify-center gap-8 mb-6">
            {/* Step 1 - Country Selection */}
            <div className="text-center">
              <div className="text-lg font-bold mb-2">{t.step1}</div>
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-45 h-16 text-base flex items-center gap-3"
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
            {/* Step 2 - Plate Input */}
            <div className="text-center">
              <div className="text-lg font-bold mb-2">{t.step2}</div>
              <Input
                ref={inputRef}
                value={plate}
                onChange={handleInputChange}
                onSelect={handleInputSelect}
                className="w-64 h-16 text-2xl text-center font-mono border-2 border-accent"
                placeholder={selectedCountry === 'IT' ? 'AB123CD' : 'AB-123-CD'}
                maxLength={12}
              />
            </div>
          </div>
        </div>
  
        {showProposal ? (
          <div className="flex flex-col items-center justify-center h-72">
            <div className="flex flex-col items-center">
              <span className="mb-2 text-lg font-semibold text-accent">{t.proposal}</span>
              <div className="relative flex items-center">
                <button
                  onClick={handleProposalClick}
                  className="focus:outline-none"
                  aria-label="Accept proposal"
                >
                  <LicensePlateDisplay
                    licensePlate={demoPlate}
                    country={selectedCountry}
                    className="scale-90 min-w-[180px] max-w-[260px]"
                  />
                </button>
                <button
                  onClick={handleDismissProposal}
                  className="
                    ml-6
                    flex
                    items-center
                    justify-center
                    text-white
                    text-5xl
                    bg-red-600
                    rounded-full
                    shadow-lg
                    w-16 h-16
                    hover:bg-red-700
                    focus:outline-none
                    transition
                    border-4 border-white
                    absolute right-[-4.5rem] top-1/2 -translate-y-1/2
                    z-10
                  "
                  aria-label="Dismiss proposal"
                >
                  <X size={40} />
                </button>
              </div>
              <div className="mt-3 text-base text-gray-600 font-medium">
                {language === 'de'
                  ? 'Tippen Sie auf das Kennzeichen oder das X'
                  : 'Tocca la targa o la X'}
              </div>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
  
      {/* Footer always at the bottom */}
      <KioskFooter language={language} />
    </div>
  );
};  