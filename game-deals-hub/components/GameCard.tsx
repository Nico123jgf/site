
import React from 'react';
import { GameDeal } from '../types';

interface GameCardProps {
  deal: GameDeal;
  index: number;
}

const GameCard: React.FC<GameCardProps> = ({ deal, index }) => {
  const { title, imageUrl, originalPrice, discountedPrice, dealUrl } = deal;

  const calculateDiscount = () => {
    if (originalPrice === 0 || discountedPrice >= originalPrice) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  const discount = calculateDiscount();

  return (
    <div 
      className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out group"
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
    >
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        {discount > 0 && (
          <div className="absolute top-0 right-0 bg-red-600 text-white font-bold py-1 px-3 m-2 rounded-full">
            -{discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 truncate group-hover:text-blue-300 transition-colors">{title}</h3>
        <div className="flex items-center justify-between">
          {originalPrice > 0 && discountedPrice !== originalPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
              <span className="text-2xl font-bold text-green-400">${discountedPrice.toFixed(2)}</span>
            </div>
          ) : (
             <span className="text-2xl font-bold text-green-400">{discountedPrice === 0 ? 'Free' : `$${originalPrice.toFixed(2)}`}</span>
          )}
          <a
            href={dealUrl && dealUrl !== '#' ? dealUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => (!dealUrl || dealUrl === '#') && e.preventDefault()}
            className={`
              bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors
              ${(!dealUrl || dealUrl === '#') 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700'
              }
            `}
          >
            View Deal
          </a>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default GameCard;