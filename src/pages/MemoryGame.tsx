import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, RefreshCw } from 'lucide-react';
import { MemoryCard, createMemoryDeck, memoryGameConfig } from '../utils/gameData';
import { useScore } from '../contexts/ScoreContext';

type Difficulty = 'easy' | 'medium' | 'hard';

const MemoryGame: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { addPoints } = useScore();
  const navigate = useNavigate();

  useEffect(() => {
    startGame(difficulty);
  }, [difficulty]);

  const startGame = (level: Difficulty) => {
    const newDeck = createMemoryDeck(level);
    setCards(newDeck);
    setFlippedIndexes([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameCompleted(false);
    console.log('MemoryGame cards:', newDeck);
  };

  const handleCardClick = (index: number) => {
    // Prevent clicking if already flipped or matched
    if (flippedIndexes.includes(index) || matchedPairs.includes(cards[index].pairId)) {
      return;
    }

    // Prevent clicking more than 2 cards at once
    if (flippedIndexes.length === 2) {
      return;
    }

    // Flip the card
    setFlippedIndexes(prev => [...prev, index]);

    // If this is the second card, check for a match
    if (flippedIndexes.length === 1) {
      setMoves(prev => prev + 1);
      const firstCardIndex = flippedIndexes[0];
      const secondCardIndex = index;
      
      // Check if the cards match
      if (cards[firstCardIndex].pairId === cards[secondCardIndex].pairId) {
        // Match found
        setMatchedPairs(prev => [...prev, cards[firstCardIndex].pairId]);
        setFlippedIndexes([]);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  };

  // Check if the game is completed
  useEffect(() => {
    const totalPairs = cards.length / 2;
    if (matchedPairs.length === totalPairs && totalPairs > 0) {
      // Game completed
      setGameCompleted(true);
      // Award points based on difficulty
      if (difficulty === 'medium') {
        addPoints(20);
      } else if (difficulty === 'hard') {
        addPoints(25);
      }
    }
  }, [matchedPairs, cards.length, difficulty, addPoints]);

  const config = memoryGameConfig[difficulty];

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="mr-2" />
        Басты бетке оралу
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          Жады ойыны
        </h1>

        {gameCompleted ? (
          <div className="text-center p-10 bg-indigo-50 rounded-xl mb-6">
            <div className="flex justify-center mb-4">
              <Award className="h-16 w-16 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Құттықтаймыз!</h2>
            <p className="text-lg mb-2">
              {matchedPairs.length} жұпты {moves} қадамда таптың!
            </p>
            <p className="text-lg mb-6">
              {difficulty === 'medium' ? 20 : difficulty === 'hard' ? 25 : 0} конфет жинадың!
            </p>
            <button 
              onClick={() => startGame(difficulty)} 
              className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Қайта ойнау
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <button 
                  onClick={() => setDifficulty('easy')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    difficulty === 'easy' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Оңай
                </button>
                <button 
                  onClick={() => setDifficulty('medium')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    difficulty === 'medium' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Орташа
                </button>
                <button 
                  onClick={() => setDifficulty('hard')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    difficulty === 'hard' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Қиын
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600">Қадамдар: {moves}</span>
                <button 
                  onClick={() => startGame(difficulty)} 
                  className="text-indigo-600 hover:text-indigo-800"
                  title="Қайта бастау"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>

            <div 
              className="grid gap-4 mx-auto"
              style={{
                gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
                gridTemplateRows: `repeat(${config.rows}, 1fr)`,
                maxWidth: config.cols * 90,
              }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`
                    relative w-full pb-[100%] bg-indigo-100 rounded-lg shadow-md cursor-pointer
                    transition-transform duration-300
                    ${matchedPairs.includes(card.pairId) ? 'opacity-70' : ''}
                    hover:scale-105 active:scale-95
                  `}
                >
                  {flippedIndexes.includes(index) || matchedPairs.includes(card.pairId) ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={card.image}
                        alt="Memory Card"
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-indigo-500 rounded-lg">
                      <span className="text-2xl font-bold text-white">?</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;