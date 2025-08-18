import React from 'react';
import parkingMachine from '@/assets/parking-machine.jpeg';

export const LandingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-machine-bg flex items-center justify-center overflow-hidden">
      <div className="animate-zoom-to-screen">
        <img 
          src={parkingMachine}
          alt="Parking Payment Machine"
          className="max-w-none object-contain"
        />
      </div>
    </div>
  );
};