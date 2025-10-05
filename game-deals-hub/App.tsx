import React, { useState, useEffect } from 'react';
import { Platform, GameDeal } from './types';
import Header from './components/Header';
import GameDeals from './components/GameDeals';
import Editor from './components/Editor';
import { steamDeals as initialSteamDeals, epicDeals as initialEpicDeals } from './constants';

const loadDealsFromStorage = (key: string, fallback: GameDeal[]): GameDeal[] => {
  try {
    const storedDeals = localStorage.getItem(key);
    // If nothing is in storage, use the initial fallback data.
    if (!storedDeals) return fallback;
    
    const parsedDeals = JSON.parse(storedDeals);
    // Basic validation to ensure we have an array.
    return Array.isArray(parsedDeals) ? parsedDeals : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return fallback;
  }
};

function App() {
  const [platform, setPlatform] = useState<Platform>(Platform.Steam);
  const [editorMode, setEditorMode] = useState(false);

  const [steamDeals, setSteamDeals] = useState<GameDeal[]>(() => loadDealsFromStorage('steamDeals', initialSteamDeals));
  const [epicDeals, setEpicDeals] = useState<GameDeal[]>(() => loadDealsFromStorage('epicDeals', initialEpicDeals));

  useEffect(() => {
    try {
      localStorage.setItem('steamDeals', JSON.stringify(steamDeals));
    } catch (error) {
      console.error('Error saving steamDeals to localStorage', error);
    }
  }, [steamDeals]);

  useEffect(() => {
    try {
      localStorage.setItem('epicDeals', JSON.stringify(epicDeals));
    } catch (error) {
      console.error('Error saving epicDeals to localStorage', error);
    }
  }, [epicDeals]);

  const handleDeleteDeal = (idToDelete: number, platform: Platform) => {
    switch (platform) {
      case Platform.Steam:
        setSteamDeals(currentDeals => 
          currentDeals.filter(deal => deal.id !== idToDelete)
        );
        break;
      case Platform.Epic:
        setEpicDeals(currentDeals => 
          currentDeals.filter(deal => deal.id !== idToDelete)
        );
        break;
      default:
        console.warn(`Attempted to delete from an unknown platform: ${platform}`);
    }
  };

  const backgroundClass = platform === Platform.Steam 
    ? 'bg-[#1b2838]' // Steam's dark blue
    : 'bg-gray-900'; // Epic's black
    
  const deals = platform === Platform.Steam ? steamDeals : epicDeals;

  return (
    <div className={`min-h-screen ${backgroundClass} text-white font-sans transition-colors duration-700 ease-in-out`}>
      <Header platform={platform} setPlatform={setPlatform} onTriggerEditor={() => setEditorMode(true)} />
      <main className="container mx-auto px-4 py-8">
        <GameDeals platform={platform} deals={deals} />
      </main>
      {editorMode && (
        <Editor 
          steamDeals={steamDeals}
          epicDeals={epicDeals}
          setSteamDeals={setSteamDeals}
          setEpicDeals={setEpicDeals}
          onDeleteDeal={handleDeleteDeal}
          onClose={() => setEditorMode(false)}
        />
      )}
    </div>
  );
}

export default App;