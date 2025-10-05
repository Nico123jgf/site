import React, { useState, useRef } from 'react';
import { Platform } from '../types';
import PlatformSwitcher from './PlatformSwitcher';

interface HeaderProps {
  platform: Platform;
  setPlatform: React.Dispatch<React.SetStateAction<Platform>>;
  onTriggerEditor: () => void;
}

const Header: React.FC<HeaderProps> = ({ platform, setPlatform, onTriggerEditor }) => {
  const [hubClickCount, setHubClickCount] = useState(0);
  const clickTimeoutRef = useRef<number | null>(null);

  const handleHubClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    const newClickCount = hubClickCount + 1;
    setHubClickCount(newClickCount);

    if (newClickCount === 5) {
      onTriggerEditor();
      setHubClickCount(0);
    } else {
       clickTimeoutRef.current = window.setTimeout(() => {
        setHubClickCount(0);
      }, 1500); // Reset after 1.5 seconds
    }
  };


  return (
    <header className="py-4 px-6 shadow-lg bg-black bg-opacity-20 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider">
          Game<span className="text-blue-400">Deals</span>
          <span onClick={handleHubClick} className="cursor-default" title="Editor"> Hub</span>
        </h1>
        <PlatformSwitcher platform={platform} setPlatform={setPlatform} />
      </div>
    </header>
  );
};

export default Header;