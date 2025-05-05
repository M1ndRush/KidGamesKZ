import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award } from 'lucide-react';
import { FoodItem, foodItems } from '../utils/gameData';
import { useScore } from '../contexts/ScoreContext';
import { useLanguage } from '../contexts/LanguageContext';

const ROUNDS_PER_GAME = 5;

const ColorGame: React.FC = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [target, setTarget] = useState<{ type: 'fruit' | 'vegetable', color: string } | null>(null);
  const [options, setOptions] = useState<FoodItem[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [score, setScore] = useState(0);
  const { addPoints } = useScore();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    startNewRound();
    // Отключаем скролл только на мобильных
    if (window.innerWidth <= 932) {
      const prevOverflow = document.body.style.overflowY;
      document.body.style.overflowY = 'hidden';
      return () => {
        document.body.style.overflowY = prevOverflow;
      };
    }
  }, []);

  const startNewRound = () => {
    // Choose a random type and color combination
    const types: ('fruit' | 'vegetable')[] = ['fruit', 'vegetable'];
    const colors = ['red', 'green', 'yellow', 'orange', 'purple'];
    
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setTarget({ type: randomType, color: randomColor });
    
    // Filter items that match the target type and color
    const correctItems = foodItems.filter(
      item => item.type === randomType && item.color === randomColor
    );
    
    if (correctItems.length === 0) {
      // Если не найдено ни одного подходящего элемента, пробуем снова
      startNewRound();
      return;
    }
    // Select one random correct item
    const correctItem = correctItems[Math.floor(Math.random() * correctItems.length)];
    
    // Get some random incorrect items
    const incorrectItems = foodItems.filter(
      item => !(item.type === randomType && item.color === randomColor)
    ).sort(() => Math.random() - 0.5).slice(0, 5);
    
    // Combine and shuffle all options
    const allOptions = [correctItem, ...incorrectItems].sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
    setIsCorrect(null);
  };

  const handleItemClick = (item: FoodItem) => {
    const isAnswerCorrect = item.type === target?.type && item.color === target?.color;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore(prev => prev + 1);
      
      setTimeout(() => {
        if (currentRound < ROUNDS_PER_GAME) {
          setCurrentRound(prev => prev + 1);
          startNewRound();
        } else {
          // Game completed
          addPoints(15);
          setShowCongrats(true);
        }
      }, 1000);
    }
  };

  const handlePlayAgain = () => {
    setCurrentRound(1);
    setScore(0);
    setShowCongrats(false);
    startNewRound();
  };

  // Helper function to get color name in Kazakh
  const getColorName = (color: string): string => {
    switch(color) {
      case 'red': return 'қызыл';
      case 'green': return 'жасыл';
      case 'yellow': return 'сары';
      case 'orange': return 'қызғылт сары';
      case 'purple': return 'күлгін';
      default: return color;
    }
  };

  // Helper function to get type name in Kazakh
  const getTypeName = (type: 'fruit' | 'vegetable'): string => {
    return type === 'fruit' ? 'жеміс' : 'көкөніс';
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="mr-2" />
        Басты бетке оралу
      </button>
      <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          Дұрыс затты тап
        </h1>
        {showCongrats ? (
          <div className="text-center p-10 bg-indigo-50 rounded-xl">
            <div className="flex justify-center mb-4">
              <Award className="h-16 w-16 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Құттықтаймыз!</h2>
            <p className="text-lg mb-2">
              {score} затты {ROUNDS_PER_GAME} заттан дұрыс таптың!
            </p>
            <p className="text-lg mb-6">15 конфет жинадың!</p>
            <button 
              onClick={handlePlayAgain} 
              className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Қайта ойнау
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-medium text-gray-500">
                Раунд {currentRound} / {ROUNDS_PER_GAME}
              </span>
              <span className="text-sm font-medium text-indigo-600">
                Ұпай: {score}
              </span>
            </div>
            <div className="bg-indigo-100 p-4 rounded-lg mb-8 text-center">
              <p className="text-lg font-medium text-gray-700">
                Тап <span className="font-bold" style={{color: target?.color}}>
                  {target && getColorName(target.color)}
                </span> <span className="font-bold text-indigo-700">
                  {target && getTypeName(target.type)}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
              {options.map((item) => (
                <div
                  key={item.id}
                  onClick={() => isCorrect === null && handleItemClick(item)}
                  className={`
                    bg-white rounded-lg shadow-md overflow-hidden cursor-pointer
                    transition-transform hover:scale-105 active:scale-95
                    ${isCorrect !== null && item.type === target?.type && item.color === target?.color
                      ? 'ring-4 ring-green-500'
                      : ''}
                  `}
                >
                  <div className="h-28 sm:h-36 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={(item as any).kazakhName || item.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className="p-2 text-center">
                    <p className="text-sm font-medium text-gray-700">{(item as any).kazakhName || item.name}</p>
                  </div>
                </div>
              ))}
            </div>
            {isCorrect !== null && (
              <div className={`mt-8 p-4 rounded-lg text-center ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isCorrect ? 
                  'Дұрыс! Жарайсың!' : 
                  'Дұрыс емес. Қайталап көр!'}
                {!isCorrect && (
                  <button 
                    onClick={startNewRound} 
                    className="ml-4 bg-red-600 text-white py-1 px-4 rounded-full text-sm hover:bg-red-700"
                  >
                    Қайталау
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ColorGame;