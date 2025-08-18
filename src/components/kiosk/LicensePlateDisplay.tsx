import React from "react";

const getCountryFlag = (country: string) => {
  const flags: { [key: string]: string } = {
    IT: "🇮🇹",
    DE: "🇩🇪",
    AT: "🇦🇹",
    CH: "🇨🇭",
  };
  return flags[country] || flags["DE"];
};

interface LicensePlateDisplayProps {
  licensePlate: string;
  country: string;
  className?: string;
}

export const LicensePlateDisplay: React.FC<LicensePlateDisplayProps> = ({
  licensePlate,
  country,
  className = "",
}) => {
  return (
    <div
      className={`bg-white border-4 border-gray-800 rounded-lg px-4 py-2 mx-auto shadow-lg flex items-center justify-center ${className}`}
      style={{ minWidth: 180, maxWidth: 320 }}
    >
      <span className="text-xl mr-3">{getCountryFlag(country)}</span>
      <span className="text-3xl font-mono font-bold text-gray-800 tracking-widest text-center flex-1">
        {licensePlate}
      </span>
    </div>
  );
};
