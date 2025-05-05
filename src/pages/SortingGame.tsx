import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award } from 'lucide-react';
import { fruits } from '../utils/gameData';
import { useScore } from '../contexts/ScoreContext';

const SortingGame: React.FC = () => {
  const [gameItems, setGameItems] = useState<(typeof fruits)[number][]>([]);
  const [dropZones, setDropZones] = useState<((typeof fruits)[number] | null)[]>([null, null, null]);
  const [draggingItem, setDraggingItem] = useState<typeof fruits[number] | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const { addPoints } = useScore();
  const navigate = useNavigate();
  const [touchPosition, setTouchPosition] = useState<{x: number, y: number} | null>(null);
  const [touchDraggingItem, setTouchDraggingItem] = useState<typeof fruits[number] | null>(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Select 3 random fruits, one of each size
    const smallFruits = fruits.filter(fruit => fruit.size === 'small');
    const mediumFruits = fruits.filter(fruit => fruit.size === 'medium');
    const largeFruits = fruits.filter(fruit => fruit.size === 'large');

    const randomSmall = smallFruits[Math.floor(Math.random() * smallFruits.length)];
    const randomMedium = mediumFruits[Math.floor(Math.random() * mediumFruits.length)];
    const randomLarge = largeFruits[Math.floor(Math.random() * largeFruits.length)];

    const selectedFruits = [randomSmall, randomMedium, randomLarge];
    
    // Shuffle the selected fruits
    const shuffled = [...selectedFruits].sort(() => Math.random() - 0.5);
    
    setGameItems(shuffled);
    setDropZones([null, null, null]);
    setIsCorrect(null);
    setShowCongrats(false);
  };

  const handleDragStart = (fruit: typeof fruits[number]) => {
    setDraggingItem(fruit);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (!draggingItem) return;

    // Don't allow drop if zone is already filled
    if (dropZones[index] !== null) return;

    // Create a new array with the dragged item in the drop zone
    const newDropZones = [...dropZones];
    newDropZones[index] = draggingItem;
    setDropZones(newDropZones);

    // Remove the item from gameItems
    setGameItems(prev => prev.filter(item => item.id !== draggingItem.id));
    setDraggingItem(null);

    // Check if all zones are filled
    if (newDropZones.filter(Boolean).length === 3) {
      checkAnswer(newDropZones);
    }
  };

  const checkAnswer = (zones: (typeof fruits[number] | null)[]) => {
    // Check if fruits are sorted by size: small -> medium -> large
    const isOrderCorrect = 
      zones[0]?.size === 'small' && 
      zones[1]?.size === 'medium' && 
      zones[2]?.size === 'large';
    
    setIsCorrect(isOrderCorrect);

    if (isOrderCorrect) {
      addPoints(5);
      setTimeout(() => {
        setShowCongrats(true);
      }, 1000);
    }
  };

  const handleNextGame = () => {
    setShowCongrats(false);
    startNewGame();
  };

  const handleTouchStart = (fruit: typeof fruits[number], e: React.TouchEvent) => {
    setTouchDraggingItem(fruit);
    setTouchPosition({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    document.body.style.overflow = 'hidden'; // Отключаем скролл
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchDraggingItem) return;
    setTouchPosition({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchDraggingItem) return;
    // Определяем, над какой drop-зоной находится палец
    const touch = e.changedTouches[0];
    const dropZoneElements = document.querySelectorAll('.drop-zone');
    dropZoneElements.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        // Помещаем фрукт в эту зону
        if (dropZones[idx] === null) {
          const newDropZones = [...dropZones];
          newDropZones[idx] = touchDraggingItem;
          setDropZones(newDropZones);
          setGameItems(prev => prev.filter(item => item.id !== touchDraggingItem.id));
          setDraggingItem(null);
          setTouchDraggingItem(null);
          setTouchPosition(null);
          // Check if all zones are filled
          if (newDropZones.filter(Boolean).length === 3) {
            checkAnswer(newDropZones);
          }
        }
      }
    });
    setTouchDraggingItem(null);
    setTouchPosition(null);
    document.body.style.overflow = '';
  };

  // Функция возврата предмета из ячейки в пулл
  const handleReturnToPool = (index: number) => {
    const item = dropZones[index];
    if (!item) return;
    const newDropZones = [...dropZones];
    newDropZones[index] = null;
    setDropZones(newDropZones);
    setGameItems(prev => [...prev, item]);
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

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Жемістерді өлшемі бойынша сұрыптау
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Жемістерді дұрыс ретпен орналастыр: кішкентайдан үлкенге дейін
        </p>

        {showCongrats ? (
          <div className="text-center p-10 bg-indigo-50 rounded-xl">
            <div className="flex justify-center mb-4">
              <Award className="h-16 w-16 text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Құттықтаймыз!</h2>
            <p className="text-lg mb-6">Жемістерді дұрыс сұрыптап, 5 конфет жинадың!</p>
            <button 
              onClick={handleNextGame} 
              className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Қайта ойнау
            </button>
          </div>
        ) : (
          <>
            {/* Drag area */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              {gameItems.map((fruit) => (
                <div
                  key={fruit.id}
                  draggable
                  onDragStart={() => handleDragStart(fruit)}
                  onTouchStart={e => handleTouchStart(fruit, e)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="cursor-move select-none"
                  style={{ touchAction: 'none' }}
                >
                  <div className="h-28 sm:h-36 flex items-center justify-center">
                    <img 
                      src={fruit.image} 
                      alt={fruit.kazakhName || fruit.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center text-xs sm:text-sm font-medium text-gray-700 mt-1">
                    {fruit.kazakhName || fruit.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Призрак перетаскиваемого элемента на мобильных */}
            {touchDraggingItem && touchPosition && (
              <div
                style={{
                  position: 'fixed',
                  left: touchPosition.x - 32,
                  top: touchPosition.y - 32,
                  pointerEvents: 'none',
                  zIndex: 50,
                }}
              >
                <img
                  src={touchDraggingItem.image}
                  alt={touchDraggingItem.kazakhName || touchDraggingItem.name}
                  className="w-16 h-16 sm:w-24 sm:h-24 object-contain opacity-70"
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}
                />
              </div>
            )}

            {/* Drop area */}
            <div className="flex flex-col sm:flex-row justify-center items-end gap-1 sm:gap-4">
              {dropZones.map((item, index) => (
                <div 
                  key={index}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`drop-zone w-full sm:w-1/3 border-2 border-dashed
                    ${item ? 'border-transparent' : 'border-gray-300'} 
                    rounded-lg flex flex-col items-center justify-center
                    ${index === 0 ? 'sm:self-start' : index === 1 ? 'sm:self-center' : 'sm:self-end'}`}
                  style={{
                    height: '28vw', // на мобильных занимает 28% ширины вьюпорта, на десктопе переопределяется Tailwind'ом
                    maxHeight: 120,
                    minHeight: 70
                  }}
                >
                  {item ? (
                    <div
                      className="w-full h-full p-1 sm:p-2 cursor-pointer"
                      onClick={() => handleReturnToPool(index)}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-between">
                        <img 
                          src={item.image} 
                          alt={item.kazakhName || item.name} 
                          className="object-contain"
                          style={{ width: '100%', height: '20vw', maxHeight: 80, minHeight: 40 }}
                        />
                        <span className="text-xs sm:text-sm text-center font-medium text-gray-700">
                          {item.kazakhName || item.name}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">
                      {index === 0 ? 'Кішкентай' : index === 1 ? 'Орташа' : 'Үлкен'}
                    </span>
                  )}
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
                    onClick={startNewGame} 
                    className="ml-4 bg-red-600 text-white py-1 px-4 rounded-full text-sm hover:bg-red-700"
                  >
                    Қайта бастау
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

export default SortingGame;