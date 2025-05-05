import React, { useEffect, useState } from 'react';
import { useScore } from '../contexts/ScoreContext';

const ColorGame = () => {
  const [score, setScore] = useState(0);
  const [targetColor, setTargetColor] = useState('');
  const [colors, setColors] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const { addPoints } = useScore();

  // Компонент қосылғанда скроллингті өшіреміз
  useEffect(() => {
    const scrollY = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.width = '100%';
    document.documentElement.style.top = `-${scrollY}px`;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    
    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.top = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Компонент қосылғанда стильдерді қосамыз
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Бастапқы түстерді инициализациялаймыз
  useEffect(() => {
    generateNewColor();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      const headerHeight = 60;
      const availableHeight = window.innerHeight - headerHeight;
      
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.height = `${availableHeight}px`;
        document.body.style.margin = '0';
        document.body.style.padding = '0';
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.height = '';
        document.body.style.margin = '';
        document.body.style.padding = '';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.height = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  const handleColorClick = (color) => {
    if (color === targetColor) {
      const newScore = score + 1;
      setScore(newScore);
      
      if (newScore >= 5) {
        addPoints(10);
        setShowCongrats(true);
      } else {
        generateNewColor();
      }
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setShowCongrats(false);
    generateNewColor();
  };

  // Жаңа түстерді генерациялаймыз
  const generateNewColor = () => {
    const newColor = generateRandomColor();
    setTargetColor(newColor);
    setColors(generateRandomColors(3));
  };

  // Кездейсоқ түсті генерациялау функциясы
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Кездейсоқ түстер массивін генерациялау
  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(generateRandomColor());
    }
    return colors;
  };

  return (
    <div className="color-game-container">
      <div className="color-game">
        {showCongrats ? (
          <div className="congrats-screen">
            <h2>Поздравляем!</h2>
            <p>Вы набрали {score} очков!</p>
            <p>Вы получили 10 конфет!</p>
            <button onClick={handlePlayAgain} className="play-again-button">
              Играть снова
            </button>
          </div>
        ) : (
          <>
            <div className="game-header">
              <h2>Найди цвет</h2>
              <div className="score">Очки: {score}</div>
            </div>
            <div className="game-content">
              <div className="target-color" style={{ backgroundColor: targetColor }}>
                <span>Найди этот цвет</span>
              </div>
              <div className="color-options">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ColorGame;

const styles = `
  .color-game-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px);
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .color-game {
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
  }

  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  .game-header h2 {
    margin: 0;
    color: #333;
    font-size: 1.5rem;
  }

  .score {
    font-size: 1.2rem;
    color: #666;
    font-weight: 500;
  }

  .game-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    flex: 1;
  }

  .target-color {
    width: 100%;
    height: 80px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    font-weight: 500;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .color-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    flex: 1;
    min-height: 0;
  }

  .color-option {
    aspect-ratio: 1;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .color-option:hover {
    transform: scale(1.05);
  }

  .congrats-screen {
    text-align: center;
    padding: 20px;
  }

  .congrats-screen h2 {
    font-size: 2rem;
    color: #4f46e5;
    margin-bottom: 1rem;
  }

  .congrats-screen p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .play-again-button {
    background: #4f46e5;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 9999px;
    font-weight: 600;
    margin-top: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .play-again-button:hover {
    background: #4338ca;
  }

  @media (max-width: 768px) {
    .color-game-container {
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0;
      background: #f5f5f5;
      z-index: 1000;
      overflow: hidden;
      height: calc(100vh - 60px);
    }

    .color-game {
      height: 100%;
      max-width: none;
      border-radius: 0;
      padding: 10px;
      overflow: hidden;
      box-shadow: none;
      display: flex;
      flex-direction: column;
    }

    .game-header {
      padding-bottom: 5px;
      margin-bottom: 5px;
      border-bottom: none;
    }

    .game-header h2 {
      font-size: 1rem;
    }

    .score {
      font-size: 0.9rem;
    }

    .game-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: hidden;
    }

    .target-color {
      height: 40px;
      font-size: 0.9rem;
      flex-shrink: 0;
      border-radius: 5px;
    }

    .color-options {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      overflow: hidden;
      min-height: 0;
    }

    .color-option {
      min-height: 0;
      border-radius: 5px;
    }

    .congrats-screen {
      padding: 10px;
    }

    .congrats-screen h2 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .congrats-screen p {
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
    }

    .play-again-button {
      padding: 8px 16px;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
  }
`; 