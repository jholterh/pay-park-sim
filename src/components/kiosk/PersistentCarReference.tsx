import React from 'react';

interface PersistentCarReferenceProps {
  licensePlate: string;
}

export const PersistentCarReference: React.FC<PersistentCarReferenceProps> = ({ licensePlate }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 border-2 border-gray-300">
      <div className="text-xs text-gray-600 mb-1">Ihr Fahrzeug:</div>
      <div className="flex items-center gap-2">
        {/* Small car icon */}
        <div className="w-12 h-6 bg-blue-600 rounded relative">
          <div className="absolute inset-0.5 bg-blue-700 rounded-sm"></div>
          <div className="absolute top-0.5 left-2 w-2 h-1 bg-blue-300 rounded-sm"></div>
          <div className="absolute top-0.5 right-2 w-2 h-1 bg-blue-300 rounded-sm"></div>
          <div className="absolute -bottom-0.5 left-1 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
          <div className="absolute -bottom-0.5 right-1 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
        </div>
        {/* License plate */}
        <div className="bg-white border border-gray-400 px-2 py-1 rounded-sm text-xs font-bold">
          {licensePlate}
        </div>
      </div>
    </div>
  );
};