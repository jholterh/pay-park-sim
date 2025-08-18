import React, { useState, useEffect } from 'react';

interface EntryAnimationProps {
  onComplete: (scannedPlate: string) => void;
}

export const EntryAnimation: React.FC<EntryAnimationProps> = ({ onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState<'entering' | 'scanning' | 'scanned'>('entering');
  const demoPlate = 'GRZ-M266';

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentPhase('scanning'), 1500);
    const timer2 = setTimeout(() => setCurrentPhase('scanned'), 3000);
    const timer3 = setTimeout(() => onComplete(demoPlate), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Car entering animation */}
      <div className="relative w-full h-64 mb-8">
        <div className={`absolute transition-all duration-2000 ${
          currentPhase === 'entering' ? 'left-[-200px]' : 'left-1/2 transform -translate-x-1/2'
        }`}>
          <div className="w-48 h-24 bg-blue-600 rounded-lg relative">
            {/* Car body */}
            <div className="absolute inset-2 bg-blue-700 rounded"></div>
            {/* Windows */}
            <div className="absolute top-2 left-8 w-8 h-4 bg-blue-300 rounded-sm"></div>
            <div className="absolute top-2 right-8 w-8 h-4 bg-blue-300 rounded-sm"></div>
            {/* License plate */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-white border-2 border-gray-800 rounded-sm flex items-center justify-center">
              <span className="text-xs font-bold text-gray-800">{demoPlate}</span>
            </div>
            {/* Wheels */}
            <div className="absolute -bottom-1 left-4 w-6 h-6 bg-gray-800 rounded-full"></div>
            <div className="absolute -bottom-1 right-4 w-6 h-6 bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Camera scanning animation */}
      {currentPhase !== 'entering' && (
        <div className="relative mb-8">
          <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <div className={`absolute inset-0 border-4 ${
            currentPhase === 'scanning' ? 'border-red-500 animate-pulse' : 'border-green-500'
          } rounded-lg`}></div>
        </div>
      )}

      {/* Scanning status */}
      <div className="text-center text-white">
        {currentPhase === 'entering' && (
          <p className="text-xl">Fahrzeug erkannt...</p>
        )}
        {currentPhase === 'scanning' && (
          <div>
            <p className="text-xl mb-2">Kennzeichen wird gescannt...</p>
            <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}
        {currentPhase === 'scanned' && (
          <div>
            <p className="text-xl mb-4">Kennzeichen erkannt:</p>
            <div className="bg-white text-gray-800 px-8 py-4 rounded-lg text-3xl font-bold">
              {demoPlate}
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-8 text-white text-sm opacity-70">
        Demo - Automatische Kennzeichenerkennung
      </div>
    </div>
  );
};