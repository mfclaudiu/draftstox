import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Mock client for development/preview
const mockClient = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
  }),
};

// Use mock client if credentials are missing
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockClient;

// Database schema types
export interface DbUser {
  id: string;
  email: string;
  name: string;
  archetype_id?: string;
  total_xp: number;
  current_level: number;
  created_at: string;
  updated_at: string;
}

export interface DbQuizResponse {
  id: string;
  user_id: string;
  question_id: string;
  selected_options: string[];
  archetype_scores: Record<string, number>;
  created_at: string;
}

export interface DbPortfolio {
  id: string;
  user_id: string;
  name: string;
  virtual_balance: number;
  total_value: number;
  total_return: number;
  total_return_percent: number;
  created_at: string;
  updated_at: string;
}

export interface DbPosition {
  id: string;
  portfolio_id: string;
  symbol: string;
  name: string;
  quantity: number;
  average_price: number;
  current_price: number;
  total_value: number;
  total_return: number;
  total_return_percent: number;
  asset_type: 'stock' | 'etf' | 'crypto';
  created_at: string;
  updated_at: string;
}

export interface DbBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  requirements: Record<string, any>;
  created_at: string;
}

export interface DbUserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  unlocked_at: string;
}

export interface DbLeaderboardEntry {
  user_id: string;
  user_name: string;
  total_return: number;
  total_return_percent: number;
  portfolio_value: number;
  xp: number;
  rank: number;
}

// Database service class
export class DatabaseService {
  // User Management
  async createUser(email: string, name: string): Promise<DbUser | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ email, name, total_xp: 0, current_level: 1 }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<DbUser | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async updateUserArchetype(userId: string, archetypeId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .update({ archetype_id: archetypeId })
        .eq('id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating user archetype:', error);
      return false;
    }
  }

  // Quiz Management
  async saveQuizResponse(
    userId: string,
    questionId: string,
    selectedOptions: string[],
    archetypeScores: Record<string, number>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('quiz_responses')
        .insert([{
          user_id: userId,
          question_id: questionId,
          selected_options: selectedOptions,
          archetype_scores: archetypeScores,
        }]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving quiz response:', error);
      return false;
    }
  }

  async getUserQuizResponses(userId: string): Promise<DbQuizResponse[]> {
    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching quiz responses:', error);
      return [];
    }
  }

  // Portfolio Management
  async createPortfolio(userId: string, name: string): Promise<DbPortfolio | null> {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .insert([{
          user_id: userId,
          name,
          virtual_balance: 100000, // Start with $100k virtual money
          total_value: 100000,
          total_return: 0,
          total_return_percent: 0,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating portfolio:', error);
      return null;
    }
  }

  async getUserPortfolios(userId: string): Promise<DbPortfolio[]> {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      return [];
    }
  }

  // Position Management
  async addPosition(
    portfolioId: string,
    symbol: string,
    name: string,
    quantity: number,
    price: number,
    assetType: 'stock' | 'etf' | 'crypto'
  ): Promise<DbPosition | null> {
    try {
      const { data, error } = await supabase
        .from('positions')
        .insert([{
          portfolio_id: portfolioId,
          symbol,
          name,
          quantity,
          average_price: price,
          current_price: price,
          total_value: quantity * price,
          total_return: 0,
          total_return_percent: 0,
          asset_type: assetType,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding position:', error);
      return null;
    }
  }

  async getPortfolioPositions(portfolioId: string): Promise<DbPosition[]> {
    try {
      const { data, error } = await supabase
        .from('positions')
        .select('*')
        .eq('portfolio_id', portfolioId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching positions:', error);
      return [];
    }
  }

  // Badge Management
  async getUserBadges(userId: string): Promise<DbUserBadge[]> {
    try {
      const { data, error } = await supabase
        .from('user_badges')
        .select(`
          *,
          badge:badges(*)
        `)
        .eq('user_id', userId)
        .order('unlocked_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user badges:', error);
      return [];
    }
  }

  async awardBadge(userId: string, badgeId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_badges')
        .insert([{ user_id: userId, badge_id: badgeId }]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error awarding badge:', error);
      return false;
    }
  }

  // Leaderboard
  async getLeaderboard(limit: number = 50): Promise<DbLeaderboardEntry[]> {
    try {
      const { data, error } = await supabase
        .rpc('get_leaderboard', { limit_count: limit });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  // XP Management
  async addXP(userId: string, xpAmount: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .rpc('add_user_xp', { user_id: userId, xp_amount: xpAmount });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error adding XP:', error);
      return false;
    }
  }
}

export const db = new DatabaseService(); 