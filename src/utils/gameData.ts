import type { Fruit, FoodItem, MemoryCard } from '../types/game';

// Sorting game data
export const fruits: (Fruit & { kazakhName: string })[] = [
  { id: 1, name: 'apple', kazakhName: 'Алма', image: '/pics/apple.png', size: 'small' },
  { id: 2, name: 'orange', kazakhName: 'Апельсин', image: '/pics/orange.png', size: 'medium' },
  { id: 3, name: 'banana', kazakhName: 'Банан', image: '/pics/banana.png', size: 'medium' },
  { id: 4, name: 'grape', kazakhName: 'Жүзім', image: '/pics/grape.png', size: 'small' },
  { id: 5, name: 'strawberry', kazakhName: 'Құлпынай', image: '/pics/strawberry.png', size: 'small' },
  { id: 6, name: 'watermelon', kazakhName: 'Қарбыз', image: '/pics/watermelon.png', size: 'large' },
  { id: 7, name: 'pineapple', kazakhName: 'Ананас', image: '/pics/pineapple.png', size: 'large' },
  { id: 8, name: 'pear', kazakhName: 'Алмұрт', image: '/pics/pear.png', size: 'medium' },
  { id: 9, name: 'cherry', kazakhName: 'Шие', image: '/pics/cherry.png', size: 'small' },
  { id: 10, name: 'pumpkin', kazakhName: 'Асқабақ', image: '/pics/pumpkin.png', size: 'large' },
  { id: 11, name: 'eggplant', kazakhName: 'Баклажан', image: '/pics/eggplant.png', size: 'medium' }
];

// Color game data
export const foodItems: (FoodItem & { kazakhName: string })[] = [
  { id: 1, name: 'carrot', kazakhName: 'Сәбіз', image: '/pics/carrot.png', type: 'vegetable', color: 'orange' },
  { id: 2, name: 'tomato', kazakhName: 'Қызанақ', image: '/pics/tomato.png', type: 'vegetable', color: 'red' },
  { id: 3, name: 'cucumber', kazakhName: 'Қияр', image: '/pics/cucumber.png', type: 'vegetable', color: 'green' },
  { id: 4, name: 'potato', kazakhName: 'Картоп', image: '/pics/potato.png', type: 'vegetable', color: 'yellow' },
  { id: 5, name: 'onion', kazakhName: 'Пияз', image: '/pics/onion.png', type: 'vegetable', color: 'purple' },
  { id: 6, name: 'pepper', kazakhName: 'Бұрыш', image: '/pics/pepper.png', type: 'vegetable', color: 'red' },
  { id: 7, name: 'cabbage', kazakhName: 'Қырыққабат', image: '/pics/cabbage.png', type: 'vegetable', color: 'green' },
  { id: 8, name: 'eggplant', kazakhName: 'Баклажан', image: '/pics/eggplant.png', type: 'vegetable', color: 'purple' },
  { id: 9, name: 'pumpkin', kazakhName: 'Асқабақ', image: '/pics/pumpkin.png', type: 'vegetable', color: 'orange' },
  { id: 10, name: 'apple', kazakhName: 'Алма', image: '/pics/apple.png', type: 'fruit', color: 'red' },
  { id: 11, name: 'orange', kazakhName: 'Апельсин', image: '/pics/orange.png', type: 'fruit', color: 'orange' },
  { id: 12, name: 'banana', kazakhName: 'Банан', image: '/pics/banana.png', type: 'fruit', color: 'yellow' },
  { id: 13, name: 'grape', kazakhName: 'Жүзім', image: '/pics/grape.png', type: 'fruit', color: 'purple' },
  { id: 14, name: 'strawberry', kazakhName: 'Құлпынай', image: '/pics/strawberry.png', type: 'fruit', color: 'red' },
  { id: 15, name: 'watermelon', kazakhName: 'Қарбыз', image: '/pics/watermelon.png', type: 'fruit', color: 'green' },
  { id: 16, name: 'pineapple', kazakhName: 'Ананас', image: '/pics/pineapple.png', type: 'fruit', color: 'yellow' },
  { id: 17, name: 'pear', kazakhName: 'Алмұрт', image: '/pics/pear.png', type: 'fruit', color: 'green' },
  { id: 18, name: 'cherry', kazakhName: 'Шие', image: '/pics/cherry.png', type: 'fruit', color: 'red' }
];

// Memory game data
const memoryImages = [
  '/pics/elephant.png',
  '/pics/lion.png',
  '/pics/giraffe.png',
  '/pics/monkey.png',
  '/pics/zebra.png',
  '/pics/tiger.png',
  '/pics/bear.png',
  '/pics/fox.png',
  '/pics/wolf.png',
  '/pics/rabbit.png',
];

export const memoryCards: MemoryCard[] = [
  { id: 1, name: 'elephant', image: '/pics/elephant.png', pairId: 1 },
  { id: 2, name: 'lion', image: '/pics/lion.png', pairId: 2 },
  { id: 3, name: 'giraffe', image: '/pics/giraffe.png', pairId: 3 },
  { id: 4, name: 'monkey', image: '/pics/monkey.png', pairId: 4 },
  { id: 5, name: 'zebra', image: '/pics/zebra.png', pairId: 5 },
  { id: 6, name: 'tiger', image: '/pics/tiger.png', pairId: 6 },
  { id: 7, name: 'bear', image: '/pics/bear.png', pairId: 7 },
  { id: 8, name: 'fox', image: '/pics/fox.png', pairId: 8 },
  { id: 9, name: 'wolf', image: '/pics/wolf.png', pairId: 9 },
  { id: 10, name: 'rabbit', image: '/pics/rabbit.png', pairId: 10 }
];

// Собираем все уникальные картинки для MemoryGame
const allMemoryImages = Array.from(new Set([
  ...fruits.map(f => f.image),
  ...foodItems.map(f => f.image),
  ...memoryCards.map(a => a.image),
]));

export const createMemoryDeck = (level: 'easy' | 'medium' | 'hard') => {
  const pairCount = level === 'easy' ? 6 : level === 'medium' ? 8 : 10;
  // Случайно выбираем картинки
  const shuffled = allMemoryImages.sort(() => Math.random() - 0.5);
  const selectedImages = shuffled.slice(0, pairCount);
  
  let cards: MemoryCard[] = [];
  selectedImages.forEach((image, index) => {
    // Create pair of cards with same pairId
    cards.push({ id: index * 2, image, pairId: index });
    cards.push({ id: index * 2 + 1, image, pairId: index });
  });
  
  // Shuffle cards
  return cards.sort(() => Math.random() - 0.5);
};

export const memoryGameConfig = {
  easy: { rows: 3, cols: 4 },
  medium: { rows: 4, cols: 4 },
  hard: { rows: 5, cols: 5 }
};