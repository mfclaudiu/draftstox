import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, DollarSign, Award, X, ChevronRight, AlertCircle, Home } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';
import { Link, useNavigate } from 'react-router-dom';
import { StockSearch } from '../components/StockSearch';

// Types
interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface Position {
  symbol: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  progress?: number;
  total?: number;
}

interface StockSearchResult {
  symbol: string;
  name: string;
}

// Mock data
const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, change: 2.30, changePercent: 1.34 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 338.11, change: 4.20, changePercent: 1.26 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 131.86, change: -0.54, changePercent: -0.41 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 127.12, change: 1.86, changePercent: 1.48 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 431.73, change: 8.92, changePercent: 2.11 },
];

const mockPositions: Position[] = [
  { symbol: 'AAPL', shares: 10, avgPrice: 170.25, currentPrice: 173.50 },
  { symbol: 'MSFT', shares: 5, avgPrice: 330.50, currentPrice: 338.11 },
  { symbol: 'GOOGL', shares: 8, avgPrice: 130.75, currentPrice: 131.86 },
];

const mockChallenges: Challenge[] = [
  {
    id: 1,
    title: 'First Trade',
    description: 'Make your first trade',
    xpReward: 50,
    completed: true,
  },
  {
    id: 2,
    title: 'Portfolio Builder',
    description: 'Invest $50,000 of your virtual cash',
    xpReward: 100,
    completed: false,
    progress: 35000,
    total: 50000,
  },
  {
    id: 3,
    title: 'Diversification Master',
    description: 'Own stocks from 5 different sectors',
    xpReward: 150,
    completed: false,
    progress: 3,
    total: 5,
  },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [cash, setCash] = useState(100000);
  const [xp, setXp] = useState(150);
  const [level, setLevel] = useState(1);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);

  // Get real-time market data
  const symbols = [...new Set([...positions.map(p => p.symbol), ...mockStocks.map(s => s.symbol)])];
  const { data: marketData, loading: marketDataLoading, error: marketDataError } = useMarketData(symbols);

  // Update positions with real-time prices
  useEffect(() => {
    if (marketData && Object.keys(marketData).length > 0) {
      setPositions(currentPositions =>
        currentPositions.map(position => ({
          ...position,
          currentPrice: marketData[position.symbol]?.price || position.currentPrice
        }))
      );
    }
  }, [marketData]);

  // Calculate portfolio value
  const portfolioValue = positions.reduce((total, pos) => total + pos.shares * pos.currentPrice, 0);
  const totalValue = portfolioValue + cash;

  // Calculate XP progress
  const xpForNextLevel = 1000;
  const xpProgress = (xp % xpForNextLevel) / xpForNextLevel * 100;

  useEffect(() => {
    // Update level based on XP (1000 XP per level)
    setLevel(Math.floor(xp / 1000) + 1);
  }, [xp]);

  const handleTrade = (stock: Stock, shares: number, isBuy: boolean) => {
    const cost = stock.price * shares;
    
    if (isBuy && cost > cash) {
      alert('Insufficient funds!');
      return;
    }

    const existingPosition = positions.find(p => p.symbol === stock.symbol);
    let newPositions: Position[];

    if (isBuy) {
      if (existingPosition) {
        // Update existing position
        newPositions = positions.map(p => 
          p.symbol === stock.symbol
            ? {
                ...p,
                shares: p.shares + shares,
                avgPrice: (p.avgPrice * p.shares + cost) / (p.shares + shares),
              }
            : p
        );
      } else {
        // Create new position
        newPositions = [...positions, {
          symbol: stock.symbol,
          shares,
          avgPrice: stock.price,
          currentPrice: stock.price,
        }];
      }
      setCash(prev => prev - cost);
    } else {
      if (!existingPosition || existingPosition.shares < shares) {
        alert('Insufficient shares!');
        return;
      }

      if (existingPosition.shares === shares) {
        // Remove position
        newPositions = positions.filter(p => p.symbol !== stock.symbol);
      } else {
        // Update position
        newPositions = positions.map(p =>
          p.symbol === stock.symbol
            ? { ...p, shares: p.shares - shares }
            : p
        );
      }
      setCash(prev => prev + cost);
    }

    setPositions(newPositions);
    setXp(prev => prev + 50); // 50 XP per trade

    // Update challenges
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === 1 && !challenge.completed) {
        // First Trade challenge
        return { ...challenge, completed: true };
      }
      if (challenge.id === 2) {
        // Portfolio Builder challenge
        const invested = totalValue - 100000; // Initial cash was 100k
        return {
          ...challenge,
          progress: invested,
          completed: invested >= 50000,
        };
      }
      // Add more challenge updates here
      return challenge;
    });
    setChallenges(updatedChallenges);
  };

  const handleSelectStock = (searchResult: StockSearchResult) => {
    // Convert StockSearchResult to Stock type
    const stock: Stock = {
      symbol: searchResult.symbol,
      name: searchResult.name,
      price: marketData[searchResult.symbol]?.price || 0,
      change: marketData[searchResult.symbol]?.change || 0,
      changePercent: marketData[searchResult.symbol]?.changePercent || 0
    };
    setSelectedStock(stock);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            
            <div className="w-96">
              <StockSearch
                onSelectStock={handleSelectStock}
                placeholder="Search stocks..."
                className="w-full"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Portfolio</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">${totalValue.toFixed(2)}</span>
                <span className="text-gray-500">Available Cash: ${cash.toFixed(2)}</span>
              </div>
            </div>

            {/* Positions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Positions</h3>
              <div className="space-y-4">
                {positions.map((position) => (
                  <div key={position.symbol} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{position.symbol}</h4>
                      <p className="text-sm text-gray-500">{position.shares} shares @ ${position.avgPrice.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${(position.shares * position.currentPrice).toFixed(2)}</p>
                      <p className={`text-sm ${position.currentPrice > position.avgPrice ? 'text-green-600' : 'text-red-600'}`}>
                        {((position.currentPrice - position.avgPrice) / position.avgPrice * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience and Challenges */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">Level {level}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500">{xp % xpForNextLevel} / {xpForNextLevel} XP</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Challenges</h3>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                      <span className="text-blue-600 font-semibold">{challenge.xpReward} XP</span>
                    </div>
                    <p className="text-sm text-gray-500">{challenge.description}</p>
                    {challenge.progress !== undefined && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(challenge.progress / challenge.total!) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 