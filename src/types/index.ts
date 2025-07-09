export interface User {
  id: string;
  email: string;
  name: string;
  archetype?: InvestorArchetype;
  totalXP: number;
  currentLevel: number;
  badges: Badge[];
  createdAt: string;
  updatedAt: string;
}

export interface InvestorArchetype {
  id: string;
  name: string;
  title: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  recommendations: string[];
  icon: string;
  color: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  type: 'single' | 'multiple' | 'scale';
  weight: number;
}

export interface QuizOption {
  id: string;
  text: string;
  value: number;
  archetype: string;
}

export interface QuizResponse {
  questionId: string;
  selectedOptions: string[];
  score: Record<string, number>;
}

export interface QuizResult {
  archetype: InvestorArchetype;
  confidence: number;
  scores: Record<string, number>;
  recommendations: string[];
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  virtualBalance: number;
  totalValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  positions: Position[];
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  portfolioId: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  type: 'stock' | 'etf' | 'crypto';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  totalReturn: number;
  totalReturnPercent: number;
  portfolioValue: number;
  xp: number;
  rank: number;
}

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  timestamp: string;
}

export interface EmailSignup {
  name: string;
  email: string;
} 