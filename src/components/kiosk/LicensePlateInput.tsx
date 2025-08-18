import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KioskHeader } from './KioskHeader';

interface LicensePlateInputProps {
  onNext: (step: 'license-confirm', data: { licensePlate: string; country: string }) => void;
  country: string;
  initialPlate: string;
}

export const LicensePlateInput: React.FC<LicensePlateInputProps> = ({ 
  onNext, 
  country, 
  initialPlate 
}) => {
  const [plate, setPlate] = useState(initialPlate);
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [showProposal, setShowProposal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const demoPlate = 'GRZ-M266';
  const isValidPlate = plate.length >= 3;

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

  const germanKeyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'DELETE'],
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M', '-', 'SPACE']
  ];

  return (
    <div className="bg-gradient-kiosk rounded-3xl shadow-kiosk animate-fade-in-up">
      <KioskHeader showBack />
      
      <div className="px-8 pb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">
            Bitte geben Sie Ihr korrektes Kennzeichen ein
          </h2>
          
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-sm font-bold mb-2">1.</div>
              <Button 
                variant="outline" 
                className="w-32 h-12"
                onClick={() => setSelectedCountry(selectedCountry === 'DE' ? 'IT' : 'DE')}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
                  <span>LAND ÄNDERN</span>
                </div>
              </Button>
            </div>
            
            <div className="text-center">
              <div className="text-sm font-bold mb-2">2.</div>
              <Input
                ref={inputRef}
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                className="w-64 h-12 text-2xl text-center font-mono border-2 border-accent"
                placeholder="AB123CD"
                maxLength={12}
              />
            </div>
          </div>

          {showProposal && (
            <div className="mb-4">
              <button 
                onClick={handleProposalClick}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
              >
                Vorschlag: {demoPlate}
              </button>
            </div>
          )}
        </div>

        <div className="mb-6">
          {germanKeyboard.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2 mb-2">
              {row.map((key) => (
                <Button
                  key={key}
                  variant="secondary"
                  className="w-12 h-12 font-semibold"
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
            className="w-40 h-12 text-lg font-semibold bg-gradient-primary"
            disabled={!isValidPlate}
            onClick={() => onNext('license-confirm', { licensePlate: plate, country: selectedCountry })}
          >
            WEITER
          </Button>
        </div>
      </div>
    </div>
  );
};