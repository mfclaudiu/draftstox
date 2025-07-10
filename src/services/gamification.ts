import { MarketData } from '../types';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  progress?: number;
  total?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export class GamificationService {
  private static readonly XP_PER_TRADE = 50;
  private static readonly XP_PER_LEVEL = 1000;
  private static readonly DAILY_BONUS_XP = 100;

  // Calculate level and XP progress
  static calculateLevel(xp: number): { level: number; progress: number } {
    const level = Math.floor(xp / this.XP_PER_LEVEL) + 1;
    const progress = ((xp % this.XP_PER_LEVEL) / this.XP_PER_LEVEL) * 100;
    return { level, progress };
  }

  // Get available challenges
  static getChallenges(portfolio: { symbol: string; shares: number; avgPrice: number }[]): Challenge[] {
    const totalInvested = portfolio.reduce((sum, pos) => sum + (pos.shares * pos.avgPrice), 0);
    const uniqueSectors = new Set(portfolio.map(pos => this.getStockSector(pos.symbol)));

    return [
      {
        id: 'first_trade',
        title: 'First Trade',
        description: 'Make your first trade',
        xpReward: 50,
        completed: portfolio.length > 0,
      },
      {
        id: 'portfolio_builder',
        title: 'Portfolio Builder',
        description: 'Invest $50,000 of your virtual cash',
        xpReward: 100,
        completed: totalInvested >= 50000,
        progress: Math.min(totalInvested, 50000),
        total: 50000,
      },
      {
        id: 'diversification',
        title: 'Diversification Master',
        description: 'Own stocks from 5 different sectors',
        xpReward: 150,
        completed: uniqueSectors.size >= 5,
        progress: uniqueSectors.size,
        total: 5,
      },
      {
        id: 'big_investor',
        title: 'Big Investor',
        description: 'Make a single trade worth over $10,000',
        xpReward: 200,
        completed: portfolio.some(pos => pos.shares * pos.avgPrice >= 10000),
      },
      {
        id: 'daily_login',
        title: 'Daily Trader',
        description: 'Log in for 5 consecutive days',
        xpReward: 250,
        completed: false, // This should be tracked in user profile
        progress: 1, // This should come from user profile
        total: 5,
      },
    ];
  }

  // Get achievements
  static getAchievements(): Achievement[] {
    return [
      {
        id: 'first_steps',
        title: 'First Steps',
        description: 'Created your first portfolio',
        icon: '🎯',
      },
      {
        id: 'rising_star',
        title: 'Rising Star',
        description: 'Reached Level 5',
        icon: '⭐',
      },
      {
        id: 'profit_master',
        title: 'Profit Master',
        description: 'Achieved 10% portfolio return',
        icon: '📈',
      },
      {
        id: 'diversified',
        title: 'Well Diversified',
        description: 'Owned stocks from all major sectors',
        icon: '🎨',
      },
      {
        id: 'diamond_hands',
        title: 'Diamond Hands',
        description: 'Held a position for over 30 days',
        icon: '💎',
      },
    ];
  }

  // Calculate XP for a trade
  static calculateTradeXP(amount: number): number {
    return this.XP_PER_TRADE + Math.floor(amount / 1000) * 5; // Bonus XP for larger trades
  }

  // Get daily bonus
  static getDailyBonus(lastLoginDate: Date): number {
    const today = new Date();
    const isNewDay = today.getDate() !== lastLoginDate.getDate() ||
                    today.getMonth() !== lastLoginDate.getMonth() ||
                    today.getFullYear() !== lastLoginDate.getFullYear();
    
    return isNewDay ? this.DAILY_BONUS_XP : 0;
  }

  // Helper method to get stock sector (mock implementation)
  private static getStockSector(symbol: string): string {
    const sectors = {
      AAPL: 'Technology',
      MSFT: 'Technology',
      GOOGL: 'Technology',
      AMZN: 'Consumer Cyclical',
      META: 'Technology',
      TSLA: 'Consumer Cyclical',
      JPM: 'Financial Services',
      BAC: 'Financial Services',
      PFE: 'Healthcare',
      JNJ: 'Healthcare',
      XOM: 'Energy',
      CVX: 'Energy',
      PG: 'Consumer Defensive',
      KO: 'Consumer Defensive',
      DIS: 'Communication Services',
      NFLX: 'Communication Services',
    };
    return sectors[symbol as keyof typeof sectors] || 'Unknown';
  }
} 