-- DraftStox Database Schema
-- Run this SQL in your Supabase SQL editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  archetype_id TEXT,
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_responses table
CREATE TABLE public.quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  selected_options TEXT[] NOT NULL,
  archetype_scores JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create portfolios table
CREATE TABLE public.portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  virtual_balance DECIMAL(15,2) DEFAULT 100000.00,
  total_value DECIMAL(15,2) DEFAULT 100000.00,
  total_return DECIMAL(15,2) DEFAULT 0.00,
  total_return_percent DECIMAL(8,4) DEFAULT 0.0000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create positions table
CREATE TABLE public.positions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  quantity DECIMAL(15,6) NOT NULL,
  average_price DECIMAL(15,2) NOT NULL,
  current_price DECIMAL(15,2) NOT NULL,
  total_value DECIMAL(15,2) NOT NULL,
  total_return DECIMAL(15,2) DEFAULT 0.00,
  total_return_percent DECIMAL(8,4) DEFAULT 0.0000,
  asset_type TEXT CHECK (asset_type IN ('stock', 'etf', 'crypto')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create badges table
CREATE TABLE public.badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  rarity TEXT CHECK (rarity IN ('common', 'uncommon', 'rare', 'legendary')) NOT NULL,
  requirements JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_badges table (junction table)
CREATE TABLE public.user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Create market_data table for caching
CREATE TABLE public.market_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  change_amount DECIMAL(15,2) NOT NULL,
  change_percent DECIMAL(8,4) NOT NULL,
  volume BIGINT,
  market_cap BIGINT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_log table for tracking user actions
CREATE TABLE public.activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  action_data JSONB,
  xp_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default badges
INSERT INTO public.badges (name, description, icon, rarity, requirements) VALUES
('First Quiz', 'Completed your first investing archetype quiz', '🎯', 'common', '{"quiz_completed": 1}'),
('Portfolio Builder', 'Created your first virtual portfolio', '💼', 'common', '{"portfolios_created": 1}'),
('First Trade', 'Made your first virtual investment', '💰', 'common', '{"trades_made": 1}'),
('Week Streak', 'Logged in for 7 consecutive days', '🔥', 'uncommon', '{"daily_streak": 7}'),
('Diversified', 'Hold positions in 5 different assets', '📊', 'uncommon', '{"unique_positions": 5}'),
('High Roller', 'Portfolio value exceeded $150,000', '💎', 'rare', '{"portfolio_value": 150000}'),
('Quiz Master', 'Retook the quiz 3 times', '🧠', 'rare', '{"quiz_completed": 3}'),
('Market Guru', 'Achieved 25% portfolio return', '🚀', 'legendary', '{"portfolio_return_percent": 25}');

-- Create indexes for performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_quiz_responses_user_id ON public.quiz_responses(user_id);
CREATE INDEX idx_portfolios_user_id ON public.portfolios(user_id);
CREATE INDEX idx_positions_portfolio_id ON public.positions(portfolio_id);
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX idx_market_data_symbol ON public.market_data(symbol);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON public.portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_positions_updated_at BEFORE UPDATE ON public.positions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to add XP and level up users
CREATE OR REPLACE FUNCTION add_user_xp(user_id UUID, xp_amount INTEGER)
RETURNS VOID AS $$
DECLARE
  current_xp INTEGER;
  new_level INTEGER;
BEGIN
  -- Get current XP
  SELECT total_xp INTO current_xp FROM public.users WHERE id = user_id;
  
  -- Add XP
  UPDATE public.users 
  SET total_xp = total_xp + xp_amount 
  WHERE id = user_id;
  
  -- Calculate new level (every 1000 XP = 1 level)
  new_level := FLOOR((current_xp + xp_amount) / 1000) + 1;
  
  -- Update level if changed
  UPDATE public.users 
  SET current_level = new_level 
  WHERE id = user_id AND current_level < new_level;
  
  -- Log the activity
  INSERT INTO public.activity_log (user_id, action_type, action_data, xp_earned)
  VALUES (user_id, 'xp_earned', jsonb_build_object('amount', xp_amount), xp_amount);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get leaderboard
CREATE OR REPLACE FUNCTION get_leaderboard(limit_count INTEGER DEFAULT 50)
RETURNS TABLE (
  user_id UUID,
  user_name TEXT,
  total_return DECIMAL(15,2),
  total_return_percent DECIMAL(8,4),
  portfolio_value DECIMAL(15,2),
  xp INTEGER,
  rank BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id as user_id,
    u.name as user_name,
    COALESCE(p.total_return, 0) as total_return,
    COALESCE(p.total_return_percent, 0) as total_return_percent,
    COALESCE(p.total_value, 100000) as portfolio_value,
    u.total_xp as xp,
    ROW_NUMBER() OVER (ORDER BY COALESCE(p.total_return_percent, 0) DESC, u.total_xp DESC) as rank
  FROM public.users u
  LEFT JOIN (
    SELECT 
      user_id,
      SUM(total_return) as total_return,
      AVG(total_return_percent) as total_return_percent,
      SUM(total_value) as total_value
    FROM public.portfolios
    GROUP BY user_id
  ) p ON u.id = p.user_id
  ORDER BY rank
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see and modify their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Quiz responses
CREATE POLICY "Users can view own quiz responses" ON public.quiz_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz responses" ON public.quiz_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Portfolios
CREATE POLICY "Users can view own portfolios" ON public.portfolios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolios" ON public.portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolios" ON public.portfolios
  FOR UPDATE USING (auth.uid() = user_id);

-- Positions
CREATE POLICY "Users can view positions from own portfolios" ON public.positions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.portfolios 
      WHERE id = positions.portfolio_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert positions to own portfolios" ON public.positions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.portfolios 
      WHERE id = positions.portfolio_id AND user_id = auth.uid()
    )
  );

-- User badges
CREATE POLICY "Users can view own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

-- Activity log
CREATE POLICY "Users can view own activity" ON public.activity_log
  FOR SELECT USING (auth.uid() = user_id);

-- Public read access for badges and market data
CREATE POLICY "Anyone can view badges" ON public.badges
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view market data" ON public.market_data
  FOR SELECT USING (true);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', 'User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 