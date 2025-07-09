import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { PortfolioBuilder } from '../components/PortfolioBuilder';
import { User, TrendingUp, Award, Users, Settings, Home } from 'lucide-react';
import { Portfolio, Position, LeaderboardEntry, Badge } from '../types';
import { gamificationService, LevelInfo } from '../services/gamification';
import { PortfolioVisualizer } from '../components/PortfolioVisualizer';

// Mock data - in a real app, this would come from your backend
const MOCK_USER = {
  id: 'user1',
  email: 'user@example.com',
  name: 'Demo User',
  archetypeId: 'balanced',
  totalXP: 1250,
  currentLevel: 2,
};

const MOCK_PORTFOLIO: Portfolio = {
  id: 'portfolio1',
  userId: 'user1',
  name: 'My First Portfolio',
  positions: [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 10,
      averagePrice: 150.00,
      currentPrice: 155.20,
      totalValue: 1552.00,
      totalReturn: 52.00,
      totalReturnPercent: 3.47,
      assetType: 'stock',
    },
    {
      id: '2',
      symbol: 'SPY',
      name: 'SPDR S&P 500 ETF Trust',
      quantity: 5,
      averagePrice: 400.00,
      currentPrice: 408.50,
      totalValue: 2042.50,
      totalReturn: 42.50,
      totalReturnPercent: 2.13,
      assetType: 'etf',
    },
  ],
  virtualBalance: 96405.50,
  totalValue: 99999.50,
  totalReturn: 94.50,
  totalReturnPercent: 0.09,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { userId: '1', userName: 'InvestorPro', totalReturn: 2500, portfolioValue: 102500, xp: 2800, rank: 1 },
  { userId: '2', userName: 'MarketMaster', totalReturn: 1800, portfolioValue: 101800, xp: 2100, rank: 2 },
  { userId: '3', userName: 'StockSage', totalReturn: 1200, portfolioValue: 101200, xp: 1900, rank: 3 },
  { userId: '4', userName: 'Demo User', totalReturn: 94.50, portfolioValue: 99999.50, xp: 1250, rank: 4 },
  { userId: '5', userName: 'TradingNewbie', totalReturn: -200, portfolioValue: 99800, xp: 800, rank: 5 },
];

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function TabNavigation({ activeTab, setActiveTab }: TabProps) {
  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: TrendingUp },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function PortfolioTab({ portfolio, onUpdatePortfolio, onAddPosition, onRemovePosition }: {
  portfolio: Portfolio;
  onUpdatePortfolio: (portfolio: Portfolio) => void;
  onAddPosition: (position: Position) => void;
  onRemovePosition: (positionId: string) => void;
}) {
  return (
    <div className="space-y-8">
      <PortfolioVisualizer
        portfolio={portfolio}
        userLevel={2}
        userXP={1250}
        dailyStreak={3}
      />
      <PortfolioBuilder
        portfolio={portfolio}
        onUpdatePortfolio={onUpdatePortfolio}
        onAddPosition={onAddPosition}
        onRemovePosition={onRemovePosition}
      />
    </div>
  );
}

function LeaderboardTab() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Leaderboard</h3>
      
      <div className="space-y-4">
        {MOCK_LEADERBOARD.map((entry, index) => (
          <div
            key={entry.userId}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              entry.userName === 'Demo User' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                entry.rank === 1 ? 'bg-yellow-500 text-white' :
                entry.rank === 2 ? 'bg-gray-400 text-white' :
                entry.rank === 3 ? 'bg-orange-500 text-white' :
                'bg-gray-200 text-gray-700'
              }`}>
                {entry.rank}
              </div>
              
              <div>
                <p className="font-semibold text-gray-900">{entry.userName}</p>
                <p className="text-sm text-gray-600">{entry.xp} XP</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {formatCurrency(entry.portfolioValue)}
              </p>
              <p className={`text-sm ${
                entry.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(entry.totalReturn)} ({formatPercent((entry.totalReturn / (entry.portfolioValue - entry.totalReturn)) * 100)})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsTab() {
  const [achievements] = useState([
    {
      id: 'first_quiz',
      name: 'First Quiz',
      description: 'Completed your first investing archetype quiz',
      icon: '🎯',
      rarity: 'common' as const,
      progress: 100,
      maxProgress: 100,
      completed: true,
      completedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'portfolio_builder',
      name: 'Portfolio Builder',
      description: 'Created your first virtual portfolio',
      icon: '💼',
      rarity: 'common' as const,
      progress: 100,
      maxProgress: 100,
      completed: true,
      completedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'diversified',
      name: 'Diversified',
      description: 'Hold positions in 5 different assets',
      icon: '📊',
      rarity: 'uncommon' as const,
      progress: 2,
      maxProgress: 5,
      completed: false,
    },
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'uncommon': return 'text-green-600 bg-green-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'legendary': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Achievements</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border ${
              achievement.completed 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-3xl">{achievement.icon}</div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                
                {!achievement.completed && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                )}
                
                <p className="text-xs text-gray-500">
                  {achievement.completed 
                    ? `Completed ${new Date(achievement.completedAt!).toLocaleDateString()}`
                    : `${achievement.progress}/${achievement.maxProgress}`
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileTab({ user, levelInfo }: { user: typeof MOCK_USER; levelInfo: LevelInfo }) {
  return (
    <div className="space-y-6">
      {/* User Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user.name.charAt(0)}
          </div>
          
          <div>
            <h4 className="text-xl font-semibold text-gray-900">{user.name}</h4>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-blue-600 font-medium">{levelInfo.title}</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Level {levelInfo.level} - {levelInfo.title}
            </span>
            <span className="text-sm text-gray-500">{user.totalXP} XP</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: '60%' }}
            ></div>
          </div>
          
          <p className="text-xs text-gray-500 mt-1">
            {levelInfo.maxXP !== Infinity ? `${levelInfo.maxXP - user.totalXP} XP to next level` : 'Max level reached!'}
          </p>
        </div>

        {/* Level Benefits */}
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Level Benefits</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            {levelInfo.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
        
        <div className="space-y-4">
          <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-gray-500" />
              <span>Account Settings</span>
            </div>
          </button>
          
          <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Home className="h-5 w-5 text-gray-500" />
              <span>Back to Landing Page</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [portfolio, setPortfolio] = useState<Portfolio>(MOCK_PORTFOLIO);
  const [user] = useState(MOCK_USER);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(gamificationService.getLevelInfo(MOCK_USER.totalXP));

  const handleUpdatePortfolio = (updatedPortfolio: Portfolio) => {
    setPortfolio(updatedPortfolio);
  };

  const handleAddPosition = (position: Position) => {
    setPortfolio(prev => ({
      ...prev,
      positions: [...prev.positions, position],
    }));
  };

  const handleRemovePosition = (positionId: string) => {
    setPortfolio(prev => ({
      ...prev,
      positions: prev.positions.filter(p => p.id !== positionId),
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <PortfolioTab
            portfolio={portfolio}
            onUpdatePortfolio={handleUpdatePortfolio}
            onAddPosition={handleAddPosition}
            onRemovePosition={handleRemovePosition}
          />
        );
      case 'leaderboard':
        return <LeaderboardTab />;
      case 'achievements':
        return <AchievementsTab />;
      case 'profile':
        return <ProfileTab user={user} levelInfo={levelInfo} />;
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead 
        title="Dashboard - DraftStox"
        description="Manage your virtual investment portfolio and track your progress on DraftStox."
        url="https://draftstox.com/dashboard"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">DraftStox</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Welcome back,</p>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                </div>
                
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          {renderTabContent()}
        </main>
      </div>
    </>
  );
} 