import React from 'react';
import { Platform, GameDeal } from '../types';
import GameCard from './GameCard';

interface GameDealsProps {
  platform: Platform;
  deals: GameDeal[];
}

const GameDeals: React.FC<GameDealsProps> = ({ platform, deals }) => {
  const platformName = platform === Platform.Steam ? 'Steam' : 'Epic Games';
  const accentColor = platform === Platform.Steam ? 'text-blue-400' : 'text-gray-300';

  return (
    <section>
      <h2 className="text-4xl font-bold mb-6 text-center">
        Top Deals on <span className={accentColor}>{platformName}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {deals.map((deal, index) => (
          <GameCard key={`${platform}-${deal.id}`} deal={deal} index={index} />
        ))}
      </div>
    </section>
  );
};

export default GameDeals;