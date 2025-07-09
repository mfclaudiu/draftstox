import { Badge, User } from '../types';
import { db } from './supabase';

export interface XPReward {
  action: string;
  amount: number;
  description: string;
}

export interface LevelInfo {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
  benefits: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  progress: number;
  maxProgress: number;
  completed: boolean;
  completedAt?: string;
}

class GamificationService {
  // XP reward amounts for different actions
  private readonly XP_REWARDS: Record<string, XPReward> = {
    'quiz_completed': {
      action: 'quiz_completed',
      amount: 100,
      description: 'Completed investment archetype quiz'
    },
    'portfolio_created': {
      action: 'portfolio_created', 
      amount: 50,
      description: 'Created first portfolio'
    },
    'first_trade': {
      action: 'first_trade',
      amount: 75,
      description: 'Made first virtual trade'
    },
    'daily_login': {
      action: 'daily_login',
      amount: 10,
      description: 'Daily login streak'
    },
    'position_added': {
      action: 'position_added',
      amount: 25,
      description: 'Added new position to portfolio'
    },
    'portfolio_positive': {
      action: 'portfolio_positive',
      amount: 50,
      description: 'Portfolio reached positive returns'
    },
    'milestone_5percent': {
      action: 'milestone_5percent',
      amount: 100,
      description: 'Portfolio gained 5% return'
    },
    'milestone_10percent': {
      action: 'milestone_10percent',
      amount: 200,
      description: 'Portfolio gained 10% return'
    },
    'milestone_25percent': {
      action: 'milestone_25percent',
      amount: 500,
      description: 'Portfolio gained 25% return'
    },
    'diversification_5': {
      action: 'diversification_5',
      amount: 75,
      description: 'Diversified portfolio with 5+ positions'
    },
    'week_streak': {
      action: 'week_streak',
      amount: 150,
      description: 'Maintained 7-day login streak'
    },
    'month_streak': {
      action: 'month_streak',
      amount: 500,
      description: 'Maintained 30-day login streak'
    },
    'retake_quiz': {
      action: 'retake_quiz',
      amount: 50,
      description: 'Retook archetype quiz'
    },
    'share_result': {
      action: 'share_result',
      amount: 25,
      description: 'Shared quiz result on social media'
    }
  };

  // Level system configuration
  private readonly LEVEL_CONFIG: LevelInfo[] = [
    {
      level: 1,
      title: 'Rookie Investor',
      minXP: 0,
      maxXP: 999,
      benefits: ['Access to basic portfolio features', 'Quiz archetype results']
    },
    {
      level: 2,
      title: 'Apprentice Trader',
      minXP: 1000,
      maxXP: 2499,
      benefits: ['Unlock advanced charts', 'Portfolio performance insights']
    },
    {
      level: 3,
      title: 'Market Explorer',
      minXP: 2500,
      maxXP: 4999,
      benefits: ['Access to leaderboards', 'Badge showcase', 'Market analysis tools']
    },
    {
      level: 4,
      title: 'Investment Strategist',
      minXP: 5000,
      maxXP: 9999,
      benefits: ['Custom portfolio themes', 'Advanced statistics', 'Social features']
    },
    {
      level: 5,
      title: 'Portfolio Master',
      minXP: 10000,
      maxXP: 19999,
      benefits: ['Mentor status', 'Premium insights', 'Early feature access']
    },
    {
      level: 6,
      title: 'Market Sage',
      minXP: 20000,
      maxXP: 39999,
      benefits: ['VIP status', 'Exclusive content', 'Community leadership']
    },
    {
      level: 7,
      title: 'Investment Legend',
      minXP: 40000,
      maxXP: Infinity,
      benefits: ['Legendary status', 'All features unlocked', 'Hall of fame']
    }
  ];

  // Award XP for specific actions
  async awardXP(userId: string, action: string, metadata?: any): Promise<boolean> {
    try {
      const reward = this.XP_REWARDS[action];
      if (!reward) {
        console.warn(`No XP reward defined for action: ${action}`);
        return false;
      }

      // Check if this is a daily action (prevent XP farming)
      if (action === 'daily_login') {
        const canAward = await this.canAwardDailyXP(userId);
        if (!canAward) return false;
      }

      // Award XP in database
      const success = await db.addXP(userId, reward.amount);
      if (!success) return false;

      // Check for badge unlocks
      await this.checkBadgeUnlocks(userId, action, metadata);

      return true;
    } catch (error) {
      console.error('Error awarding XP:', error);
      return false;
    }
  }

  // Get user's current level info
  getLevelInfo(xp: number): LevelInfo {
    for (let i = this.LEVEL_CONFIG.length - 1; i >= 0; i--) {
      const level = this.LEVEL_CONFIG[i];
      if (xp >= level.minXP) {
        return level;
      }
    }
    return this.LEVEL_CONFIG[0];
  }

  // Calculate progress to next level
  getLevelProgress(xp: number): { current: LevelInfo; next: LevelInfo | null; progress: number } {
    const current = this.getLevelInfo(xp);
    const nextLevel = this.LEVEL_CONFIG.find(level => level.level === current.level + 1);
    
    if (!nextLevel) {
      return { current, next: null, progress: 100 };
    }

    const progressXP = xp - current.minXP;
    const neededXP = nextLevel.minXP - current.minXP;
    const progress = Math.min((progressXP / neededXP) * 100, 100);

    return { current, next: nextLevel, progress };
  }

  // Badge checking logic
  private async checkBadgeUnlocks(userId: string, action: string, metadata?: any): Promise<void> {
    try {
      const badges = await this.getBadgesToCheck(action);
      
      for (const badge of badges) {
        const earned = await this.checkBadgeRequirements(userId, badge, metadata);
        if (earned) {
          await db.awardBadge(userId, badge.id);
          await this.awardXP(userId, 'badge_earned'); // Bonus XP for earning badges
        }
      }
    } catch (error) {
      console.error('Error checking badge unlocks:', error);
    }
  }

  private async getBadgesToCheck(action: string): Promise<Badge[]> {
    // This would typically fetch from database, but for MVP we'll use hardcoded logic
    const allBadges: Badge[] = [
      {
        id: 'first_quiz',
        name: 'First Quiz',
        description: 'Completed your first investing archetype quiz',
        icon: '🎯',
        rarity: 'common',
        requirements: { quiz_completed: 1 }
      },
      {
        id: 'portfolio_builder', 
        name: 'Portfolio Builder',
        description: 'Created your first virtual portfolio',
        icon: '💼',
        rarity: 'common',
        requirements: { portfolios_created: 1 }
      },
      {
        id: 'first_trade',
        name: 'First Trade',
        description: 'Made your first virtual investment',
        icon: '💰',
        rarity: 'common',
        requirements: { trades_made: 1 }
      },
      {
        id: 'week_streak',
        name: 'Week Streak',
        description: 'Logged in for 7 consecutive days',
        icon: '🔥',
        rarity: 'uncommon',
        requirements: { daily_streak: 7 }
      },
      {
        id: 'diversified',
        name: 'Diversified',
        description: 'Hold positions in 5 different assets',
        icon: '📊',
        rarity: 'uncommon',
        requirements: { unique_positions: 5 }
      },
      {
        id: 'high_roller',
        name: 'High Roller',
        description: 'Portfolio value exceeded $150,000',
        icon: '💎',
        rarity: 'rare',
        requirements: { portfolio_value: 150000 }
      },
      {
        id: 'quiz_master',
        name: 'Quiz Master',
        description: 'Retook the quiz 3 times',
        icon: '🧠',
        rarity: 'rare',
        requirements: { quiz_completed: 3 }
      },
      {
        id: 'market_guru',
        name: 'Market Guru',
        description: 'Achieved 25% portfolio return',
        icon: '🚀',
        rarity: 'legendary',
        requirements: { portfolio_return_percent: 25 }
      }
    ];

    // Return badges that might be relevant for this action
    const actionBadgeMap: Record<string, string[]> = {
      'quiz_completed': ['first_quiz', 'quiz_master'],
      'portfolio_created': ['portfolio_builder'],
      'first_trade': ['first_trade'],
      'position_added': ['diversified'],
      'daily_login': ['week_streak'],
      'milestone_25percent': ['market_guru'],
    };

    const relevantBadgeIds = actionBadgeMap[action] || [];
    return allBadges.filter(badge => relevantBadgeIds.includes(badge.id));
  }

  private async checkBadgeRequirements(userId: string, badge: Badge, metadata?: any): Promise<boolean> {
    try {
      // This would check user's actual progress against badge requirements
      // For MVP, we'll implement basic checks

      const requirements = badge.requirements;
      
      if (requirements.quiz_completed) {
        const quizResponses = await db.getUserQuizResponses(userId);
        const uniqueQuizzes = new Set(quizResponses.map(r => r.question_id)).size;
        if (uniqueQuizzes < requirements.quiz_completed) return false;
      }

      if (requirements.portfolios_created) {
        const portfolios = await db.getUserPortfolios(userId);
        if (portfolios.length < requirements.portfolios_created) return false;
      }

      if (requirements.portfolio_value && metadata?.portfolioValue) {
        if (metadata.portfolioValue < requirements.portfolio_value) return false;
      }

      if (requirements.portfolio_return_percent && metadata?.returnPercent) {
        if (metadata.returnPercent < requirements.portfolio_return_percent) return false;
      }

      if (requirements.unique_positions && metadata?.positionCount) {
        if (metadata.positionCount < requirements.unique_positions) return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking badge requirements:', error);
      return false;
    }
  }

  // Daily XP award limiting
  private async canAwardDailyXP(userId: string): Promise<boolean> {
    try {
      // Check if user already got daily XP today
      // This would query the activity log for today's date
      // For MVP, we'll allow it (would need proper date checking in production)
      return true;
    } catch (error) {
      console.error('Error checking daily XP eligibility:', error);
      return false;
    }
  }

  // Get user achievements
  async getUserAchievements(userId: string): Promise<Achievement[]> {
    try {
      const userBadges = await db.getUserBadges(userId);
      
      // This would calculate progress for all possible badges
      // For MVP, return earned badges as achievements
      return userBadges.map((userBadge: any) => ({
        id: userBadge.badge_id,
        name: userBadge.badge.name,
        description: userBadge.badge.description,
        icon: userBadge.badge.icon,
        rarity: userBadge.badge.rarity,
        progress: 100,
        maxProgress: 100,
        completed: true,
        completedAt: userBadge.unlocked_at,
      }));
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return [];
    }
  }

  // Leaderboard scoring
  calculateLeaderboardScore(user: any): number {
    // Weighted scoring system
    const xpWeight = 0.3;
    const returnWeight = 0.5;
    const diversificationWeight = 0.2;

    const xpScore = (user.total_xp || 0) / 100; // Normalize XP
    const returnScore = Math.max(0, (user.portfolio_return_percent || 0) * 10); // Positive returns only
    const diversificationScore = Math.min(10, (user.position_count || 0) * 2); // Max 10 points

    return (xpScore * xpWeight) + (returnScore * returnWeight) + (diversificationScore * diversificationWeight);
  }

  // Daily engagement rewards
  async processDailyEngagement(userId: string): Promise<void> {
    try {
      // Award daily login XP
      await this.awardXP(userId, 'daily_login');

      // Check for streak bonuses
      // This would track consecutive login days and award bonus XP
      
      // Future: Daily challenges, rotating objectives, etc.
    } catch (error) {
      console.error('Error processing daily engagement:', error);
    }
  }

  // Get available XP rewards info
  getXPRewards(): XPReward[] {
    return Object.values(this.XP_REWARDS);
  }

  // Get level configuration
  getLevelConfiguration(): LevelInfo[] {
    return this.LEVEL_CONFIG;
  }
}

export const gamificationService = new GamificationService(); 