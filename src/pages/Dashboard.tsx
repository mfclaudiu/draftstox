import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, DollarSign, Award, X, ChevronRight, AlertCircle } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [positions, setPositions] = useState<Position[]>(mockPositions);
  const [cash, setCash] = useState(100000);
  const [xp, setXp] = useState(150);
  const [level, setLevel] = useState(1);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [showApiKeyWarning, setShowApiKeyWarning] = useState(!import.meta.env.VITE_ALPHA_VANTAGE_API_KEY);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      {/* API Key Warning */}
      {showApiKeyWarning && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Alpha Vantage API key not found. Using mock data for demonstration. Get your API key at{' '}
                  <a
                    href="https://www.alphavantage.co/support/#api-key"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline hover:text-yellow-600"
                  >
                    alphavantage.co
                  </a>
                  {' '}and add it to your .env file as VITE_ALPHA_VANTAGE_API_KEY.
                </p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setShowApiKeyWarning(false)}
                    className="inline-flex rounded-md p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                  >
                    <span className="sr-only">Dismiss</span>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Portfolio</h1>
            <p className="text-gray-600">Track your investments and progress</p>
          </div>
          <button
            onClick={() => setSearchOpen(true)}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Search className="h-5 w-5 mr-2" />
            Search Stocks
          </button>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Total Value</h2>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>Available Cash: ${cash.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Portfolio</h2>
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>{positions.length} Positions</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
              <Award className="h-5 w-5 text-purple-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">Level {level}</p>
            <div className="mt-2">
              <div className="flex items-center text-sm text-gray-500">
                <span>{xp % xpForNextLevel} / {xpForNextLevel} XP</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 rounded-full h-2 transition-all duration-300"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Positions</h2>
              {positions.length > 0 ? (
                <div className="space-y-4">
                  {positions.map((position) => {
                    const stock = mockStocks.find(s => s.symbol === position.symbol);
                    if (!stock) return null;

                    const value = position.shares * position.currentPrice;
                    const gain = value - (position.shares * position.avgPrice);
                    const gainPercent = (gain / (position.shares * position.avgPrice)) * 100;

                    return (
                      <motion.div
                        key={position.symbol}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900">{position.symbol}</h3>
                          <p className="text-sm text-gray-500">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {position.shares} shares @ ${position.avgPrice.toFixed(2)}
                          </p>
                          <p className={`text-sm ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${gain.toFixed(2)} ({gainPercent.toFixed(2)}%)
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No positions yet. Start trading to build your portfolio!</p>
                </div>
              )}
            </div>
          </div>

          {/* Challenges Section */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Challenges</h2>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{challenge.title}</h3>
                        <p className="text-sm text-gray-500">{challenge.description}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-purple-600">{challenge.xpReward} XP</span>
                        {challenge.completed && (
                          <Award className="ml-2 h-5 w-5 text-purple-500" />
                        )}
                      </div>
                    </div>
                    {challenge.progress !== undefined && challenge.total !== undefined && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Progress</span>
                          <span>{challenge.progress} / {challenge.total}</span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 rounded-full h-2 transition-all duration-300"
                            style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setSearchOpen(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Search Stocks</h3>
                <div className="space-y-4">
                  {mockStocks.map((stock) => {
                    const marketPrice = marketData[stock.symbol]?.price;
                    const marketChange = marketData[stock.symbol]?.change;
                    const marketChangePercent = marketData[stock.symbol]?.changePercent;

                    return (
                      <motion.button
                        key={stock.symbol}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => {
                          setSelectedStock({
                            ...stock,
                            price: marketPrice || stock.price,
                            change: marketChange || stock.change,
                            changePercent: marketChangePercent || stock.changePercent,
                          });
                          setSearchOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="text-left">
                          <h4 className="font-medium text-gray-900">{stock.symbol}</h4>
                          <p className="text-sm text-gray-500">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ${(marketPrice || stock.price).toFixed(2)}
                          </p>
                          <p className={`text-sm ${(marketChange || stock.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {(marketChange || stock.change) >= 0 ? '+' : ''}
                            {(marketChange || stock.change).toFixed(2)} (
                            {(marketChangePercent || stock.changePercent).toFixed(2)}%)
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Trade Modal */}
      {selectedStock && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setSelectedStock(null)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setSelectedStock(null)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Trade {selectedStock.symbol}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">{selectedStock.name}</p>
                    <p className="text-2xl font-bold text-gray-900">${selectedStock.price.toFixed(2)}</p>
                    <p className={`text-sm ${selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        const shares = parseInt(prompt('How many shares to buy?') || '0');
                        if (shares > 0) {
                          handleTrade(selectedStock, shares, true);
                          setSelectedStock(null);
                        }
                      }}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => {
                        const shares = parseInt(prompt('How many shares to sell?') || '0');
                        if (shares > 0) {
                          handleTrade(selectedStock, shares, false);
                          setSelectedStock(null);
                        }
                      }}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
} 