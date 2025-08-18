import React, { useState, useEffect } from 'react';
import { LandingAnimation } from './kiosk/LandingAnimation';
import { MainMenu } from './kiosk/MainMenu';
import { LicensePlateInput } from './kiosk/LicensePlateInput';
import { LicensePlateConfirm } from './kiosk/LicensePlateConfirm';
import { ArrivalTimeInput } from './kiosk/ArrivalTimeInput';
import { PaymentSelection } from './kiosk/PaymentSelection';
import { CardPayment } from './kiosk/CardPayment';
import { ThankYou } from './kiosk/ThankYou';

type KioskStep = 
  | 'landing' 
  | 'main-menu' 
  | 'license-input' 
  | 'license-confirm' 
  | 'arrival-time' 
  | 'payment-selection' 
  | 'card-payment' 
  | 'thank-you';

export const ParkingKiosk: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<KioskStep>('landing');
  const [licensePlate, setLicensePlate] = useState('');
  const [country, setCountry] = useState('DE');
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [parkingDuration, setParkingDuration] = useState({ hours: 2, minutes: 35 });
  const [totalCost] = useState(5.00);

  const isDemoPlate = licensePlate === 'GRZ-M266';

  useEffect(() => {
    if (currentStep === 'landing') {
      const timer = setTimeout(() => {
        setCurrentStep('main-menu');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleNext = (step: KioskStep, data?: any) => {
    if (data) {
      if (data.licensePlate) setLicensePlate(data.licensePlate);
      if (data.country) setCountry(data.country);
      if (data.arrivalTime) setArrivalTime(data.arrivalTime);
    }
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingAnimation />;
      case 'main-menu':
        return <MainMenu onNext={handleNext} />;
      case 'license-input':
        return (
          <LicensePlateInput 
            onNext={handleNext}
            country={country}
            initialPlate={licensePlate}
          />
        );
      case 'license-confirm':
        return (
          <LicensePlateConfirm
            licensePlate={licensePlate}
            country={country}
            isDemoPlate={isDemoPlate}
            onNext={handleNext}
            onBack={() => setCurrentStep('license-input')}
          />
        );
      case 'arrival-time':
        return (
          <ArrivalTimeInput
            onNext={handleNext}
            initialTime={arrivalTime}
          />
        );
      case 'payment-selection':
        return (
          <PaymentSelection
            licensePlate={licensePlate}
            duration={parkingDuration}
            cost={totalCost}
            onNext={handleNext}
          />
        );
      case 'card-payment':
        return <CardPayment onNext={handleNext} />;
      case 'thank-you':
        return <ThankYou onRestart={() => setCurrentStep('main-menu')} />;
      default:
        return <MainMenu onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-machine-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {renderStep()}
      </div>
    </div>
  );
};