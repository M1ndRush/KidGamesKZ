import React, { useState, useEffect } from 'react';
import { Candy } from 'lucide-react';

interface AnimatedScoreProps {
  value: number;
  x: number;
  y: number;
  onComplete: () => void;
}

const AnimatedScore: React.FC<AnimatedScoreProps> = ({ value, x, y, onComplete }) => {
  const [position, setPosition] = useState({ x, y });
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Animate up and slightly to the side
    const timer1 = setTimeout(() => {
      setPosition({ 
        x: x + (Math.random() * 40 - 20), 
        y: y - 80 
      });
      setScale(1.5);
    }, 50);

    // Start fading away
    const timer2 = setTimeout(() => {
      setOpacity(0);
    }, 800);

    // Remove component
    const timer3 = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [x, y, onComplete]);

  return (
    <div 
      className="fixed pointer-events-none z-50 flex items-center"
      style={{
        left: position.x,
        top: position.y,
        opacity,
        transform: `scale(${scale})`,
        transition: 'all 0.8s ease-out'
      }}
    >
      <Candy className="mr-1 h-5 w-5 text-pink-500" />
      <span className="text-lg font-bold text-indigo-600">+{value}</span>
    </div>
  );
};

export default AnimatedScore;