import React from 'react';
import { Platform } from '../types';

interface PlatformSwitcherProps {
  platform: Platform;
  setPlatform: React.Dispatch<React.SetStateAction<Platform>>;
}

const PlatformSwitcher: React.FC<PlatformSwitcherProps> = ({ platform, setPlatform }) => {
  const isSteam = platform === Platform.Steam;

  const togglePlatform = () => {
    setPlatform(isSteam ? Platform.Epic : Platform.Steam);
  };

  return (
    <button
      onClick={togglePlatform}
      className="relative w-32 h-10 flex items-center bg-black bg-opacity-40 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Switch to ${isSteam ? 'Epic Games' : 'Steam'}`}
    >
      {/* Sliding background */}
      <div
        className={`absolute top-1 left-1 w-14 h-8 rounded-full bg-white transition-transform duration-500 ease-in-out
          ${isSteam ? 'translate-x-0' : 'translate-x-16'}`}
      />
      
      {/* Text Labels */}
      <div className="flex w-full z-10">
        <span className={`w-1/2 text-center font-semibold transition-colors duration-500 ease-in-out ${isSteam ? 'text-blue-600' : 'text-gray-300'}`}>
            Steam
        </span>
        <span className={`w-1/2 text-center font-semibold transition-colors duration-500 ease-in-out ${isSteam ? 'text-gray-300' : 'text-black'}`}>
            Epic
        </span>
      </div>
    </button>
  );
};

export default PlatformSwitcher;
