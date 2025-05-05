import React, { createContext, useContext, useState } from 'react';

type ScoreContextType = {
  score: number;
  addPoints: (points: number) => void;
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState<number>(() => {
    const savedScore = localStorage.getItem('candyScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  const addPoints = (points: number) => {
    setScore((prevScore) => {
      const newScore = prevScore + points;
      localStorage.setItem('candyScore', newScore.toString());
      return newScore;
    });
  };

  return (
    <ScoreContext.Provider value={{ score, addPoints }}>
      {children}
    </ScoreContext.Provider>
  );
};