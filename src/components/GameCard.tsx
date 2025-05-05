import React from 'react';
import { Link } from 'react-router-dom';

interface GameCardProps {
  title: string;
  description: string;
  path: string;
  image: string;
  isComingSoon?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, path, image, isComingSoon = false }) => {
  const cardContent = (
    <div 
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 
        ${isComingSoon ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="h-40 bg-indigo-100 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-indigo-700 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      {isComingSoon && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <span className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full transform -rotate-12">
            Жақында!
          </span>
        </div>
      )}
    </div>
  );

  if (isComingSoon) {
    return cardContent;
  }

  return (
    <Link to={path} className="block">
      {cardContent}
    </Link>
  );
};

export default GameCard;