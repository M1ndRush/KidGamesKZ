import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SortingGame from './pages/SortingGame';
import ColorGame from './pages/ColorGame';
import MemoryGame from './pages/MemoryGame';
import { ScoreProvider } from './contexts/ScoreContext';

function App() {
  return (
    <ScoreProvider>
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-purple-100 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sorting" element={<SortingGame />} />
            <Route path="/color" element={<ColorGame />} />
            <Route path="/memory" element={<MemoryGame />} />
          </Routes>
        </main>
      </div>
    </ScoreProvider>
  );
}

export default App;