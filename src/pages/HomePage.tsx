import React from 'react';
import GameCard from '../components/GameCard';
import { Brain } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-3xl text-center mb-12">
        <div className="flex justify-center mb-4">
          <Brain className="h-16 w-16 text-indigo-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">
          Дамытушы ойындар әлеміне қош келдіңіз!
        </h1>
        <p className="text-lg text-gray-700">
          Мұнда сіз зейін, жады және логикалық ойлау қабілетін дамытуға көмектесетін 
          қызықты ойындарды табасыз. Әр жеңіс үшін сіз тәтті кәмпиттер аласыз!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        <GameCard 
          title="Жемістерді сұрыптау" 
          description="Жемістерді кішкентайдан үлкенге дейін орналастыр"
          path="/sorting"
          image="/pics/sorting.jpg"
        />
        <GameCard 
          title="Затты тап" 
          description="Дұрыс түсті жеміс немесе көкөністі таңда"
          path="/color"
          image="/pics/color.jpg"
        />
        <GameCard 
          title="Жады ойыны" 
          description="Барлық бірдей суреттердің жұптарын тап"
          path="/memory"
          image="/pics/memory.jpg"
        />
        <GameCard 
          title="Математикалық мысалдар" 
          description="Қосу және азайту мысалдарын шығар"
          path="/"
          image="/pics/underconstruction.jpg"
          isComingSoon={true}
        />
        <GameCard 
          title="Әріптерді үйрену" 
          description="Әріптерден сөздер құрастыр"
          path="/"
          image="/pics/underconstruction.jpg"
          isComingSoon={true}
        />
        <GameCard 
          title="Пазлдар" 
          description="Түрлі-түсті суреттерді бөлшектерден жина"
          path="/"
          image="/pics/underconstruction.jpg"
          isComingSoon={true}
        />
      </div>
    </div>
  );
};

export default HomePage;