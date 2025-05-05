export interface Fruit {
  id: number;
  name: string;
  image: string;
  size: 'small' | 'medium' | 'large';
}

export interface FoodItem {
  id: number;
  name: string;
  image: string;
  type: 'fruit' | 'vegetable';
  color: 'red' | 'green' | 'yellow' | 'orange' | 'purple';
}

export interface MemoryCard {
  id: number;
  name?: string;
  image: string;
  pairId: number;
} 