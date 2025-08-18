import React, { useState, useEffect } from 'react';
import { EntryAnimation } from './kiosk/EntryAnimation';
import { LandingAnimation } from './kiosk/LandingAnimation';
import { MainMenu } from './kiosk/MainMenu';
import { LicensePlateInput } from './kiosk/LicensePlateInput';
import { LicensePlateConfirm } from './kiosk/LicensePlateConfirm';
import { LicensePlateMismatch } from './kiosk/LicensePlateMismatch';
import { ArrivalTimeInput } from './kiosk/ArrivalTimeInput';
import { PaymentSelection } from './kiosk/PaymentSelection';
import { CardPayment } from './kiosk/CardPayment';
import { ThankYou } from './kiosk/ThankYou';
import { PersistentCarReference } from './kiosk/PersistentCarReference';

type KioskStep = 
  | 'entry-animation'
  | 'landing' 
  | 'main-menu' 
  | 'license-input' 
  | 'license-confirm'
  | 'license-mismatch'
  | 'arrival-time' 
  | 'payment-selection' 
  | 'card-payment' 
  | 'thank-you';

type Language = 'de' | 'it';

export const ParkingKiosk: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<KioskStep>('entry-animation');
  const [licensePlate, setLicensePlate] = useState('');
  const [scannedPlate, setScannedPlate] = useState('');
  const [country, setCountry] = useState('IT');
  const [language, setLanguage] = useState<Language>('de');
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [parkingDuration, setParkingDuration] = useState({ hours: 2, minutes: 35 });
  const [totalCost] = useState(5.00);

  const isDemoPlate = licensePlate === scannedPlate;

  useEffect(() => {
    if (currentStep === 'landing') {
      const timer = setTimeout(() => {
        setCurrentStep('main-menu');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleEntryComplete = (plate: string) => {
    setScannedPlate(plate);
    setCurrentStep('landing');
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleExit = () => {
    setCurrentStep('main-menu');
    setLicensePlate('');
    setCountry('IT');
  };

  const getDefaultArrivalTime = () => {
    const now = new Date();
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    const minutes = threeHoursAgo.getMinutes();
    const roundedMinutes = Math.floor(minutes / 15) * 15;
    threeHoursAgo.setMinutes(roundedMinutes, 0, 0);
    return threeHoursAgo;
  };

  const handleNext = (step: KioskStep, data?: any) => {
    if (data) {
      if (data.licensePlate) setLicensePlate(data.licensePlate);
      if (data.country) setCountry(data.country);
      if (data.arrivalTime) setArrivalTime(data.arrivalTime);
    }
    setCurrentStep(step);
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'main-menu':
        setCurrentStep('landing');
        break;
      case 'license-input':
        setCurrentStep('main-menu');
        break;
      case 'license-confirm':
      case 'license-mismatch':
        setCurrentStep('license-input');
        break;
      case 'arrival-time':
        setCurrentStep('license-confirm');
        break;
      case 'payment-selection':
        setCurrentStep(isDemoPlate ? 'license-confirm' : 'arrival-time');
        break;
      case 'card-payment':
        setCurrentStep('payment-selection');
        break;
      default:
        break;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'entry-animation':
        return <EntryAnimation onComplete={handleEntryComplete} />;
      case 'landing':
        return <LandingAnimation />;
      case 'main-menu':
        return <MainMenu onNext={handleNext} language={language} onLanguageChange={handleLanguageChange} onExit={handleExit} />;
      case 'license-input':
        return (
          <LicensePlateInput 
            onNext={handleNext}
            country={country}
            initialPlate={licensePlate}
            language={language}
            onLanguageChange={handleLanguageChange}
            onExit={handleExit}
            onBack={handleBack}
          />
        );
      case 'license-confirm':
        return (
          <LicensePlateConfirm
            licensePlate={licensePlate}
            country={country}
            isDemoPlate={isDemoPlate}
            onNext={handleNext}
            onBack={handleBack}
            language={language}
            onLanguageChange={handleLanguageChange}
            onExit={handleExit}
          />
        );
      case 'license-mismatch':
        return (
          <LicensePlateMismatch
            licensePlate={licensePlate}
            scannedPlate={scannedPlate}
            country={country}
            onNext={handleNext}
            onBack={handleBack}
            language={language}
            onLanguageChange={handleLanguageChange}
            onExit={handleExit}
          />
        );
      case 'arrival-time':
        return (
          <ArrivalTimeInput
            onNext={handleNext}
            initialTime={getDefaultArrivalTime()}
            language={language}
            onLanguageChange={handleLanguageChange}
            onExit={handleExit}
            onBack={handleBack}
          />
        );
      case 'payment-selection':
        return (
          <PaymentSelection
            licensePlate={licensePlate}
            duration={parkingDuration}
            cost={totalCost}
            onNext={handleNext}
            language={language}
            onLanguageChange={handleLanguageChange}
            onExit={handleExit}
            onBack={handleBack}
          />
        );
      case 'card-payment':
        return <CardPayment onNext={handleNext} language={language} onLanguageChange={handleLanguageChange} onExit={handleExit} onBack={handleBack} />;
      case 'thank-you':
        return <ThankYou onRestart={() => setCurrentStep('main-menu')} language={language} onLanguageChange={handleLanguageChange} onExit={handleExit} />;
      default:
        return <MainMenu onNext={handleNext} language={language} onLanguageChange={handleLanguageChange} onExit={handleExit} />;
    }
  };

  return (
    <div className="min-h-screen bg-machine-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {renderStep()}
      </div>
      {(scannedPlate && currentStep !== 'entry-animation' && currentStep !== 'landing') && (
        <PersistentCarReference licensePlate={scannedPlate} />
      )}
    </div>
  );
};