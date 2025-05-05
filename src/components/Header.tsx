import React from 'react';
import { Link } from 'react-router-dom';
import { Candy } from 'lucide-react';
import { useScore } from '../contexts/ScoreContext';

const Header: React.FC = () => {
  const { score } = useScore();

  return (
    <header className="bg-indigo-600 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-bold mb-2 sm:mb-0 hover:text-indigo-200 transition-colors">
          Балалар ойындары
        </Link>
        <div className="flex items-center bg-indigo-700 px-4 py-2 rounded-full">
          <Candy className="mr-2 h-6 w-6 text-pink-300" />
          <span className="text-xl font-bold">{score}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;