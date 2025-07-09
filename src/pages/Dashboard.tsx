import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Trophy, Target, TrendingUp, Award, Star, Plus, Search, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  totalValue: number;
  gain: number;
  gainPercent: number;
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

export function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [positions, setPositions] = useState<Position[]>([]);
  const [availableCash, setAvailableCash] = useState(100000); // Start with $100k
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeAmount, setTradeAmount] = useState('');
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: 'Diversification Master',
      description: 'Hold positions in 5 different sectors',
      xpReward: 500,
      completed: false,
      progress: 0,
      total: 5
    },
    {
      id: 2,
      title: 'First Trade',
      description: 'Make your first stock purchase',
      xpReward: 100,
      completed: false
    },
    {
      id: 3,
      title: 'Portfolio Builder',
      description: 'Invest at least $50,000',
      xpReward: 300,
      completed: false,
      progress: 0,
      total: 50000
    }
  ]);

  // Simulate real-time stock updates
  useEffect(() => {
    const updateStocks = () => {
      setPositions(prev => prev.map(pos => {
        const priceChange = (Math.random() - 0.5) * 2; // Random price movement
        const newPrice = pos.currentPrice * (1 + priceChange / 100);
        const newValue = newPrice * pos.shares;
        const newGain = newValue - (pos.avgPrice * pos.shares);
        const newGainPercent = (newGain / (pos.avgPrice * pos.shares)) * 100;
        
        return {
          ...pos,
          currentPrice: newPrice,
          totalValue: newValue,
          gain: newGain,
          gainPercent: newGainPercent
        };
      }));
    };

    const interval = setInterval(updateStocks, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Calculate total portfolio value
  const totalPortfolioValue = positions.reduce((sum, pos) => sum + pos.totalValue, 0) + availableCash;

  // Search stocks function
  const searchStocks = async (term: string) => {
    // Simulate API call with mock data
    const mockStocks: Stock[] = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 175.25, change: 2.50, changePercent: 1.45 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 325.50, change: -1.20, changePercent: -0.37 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 135.75, change: 1.75, changePercent: 1.31 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 128.90, change: 0.90, changePercent: 0.70 },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.30, change: -3.20, changePercent: -1.29 },
    ].filter(stock => 
      stock.symbol.toLowerCase().includes(term.toLowerCase()) ||
      stock.name.toLowerCase().includes(term.toLowerCase())
    );
    
    setSearchResults(mockStocks);
  };

  // Execute trade function
  const executeTrade = (stock: Stock, shares: number) => {
    const tradeValue = stock.price * shares;
    
    if (tradeValue > availableCash) {
      alert('Insufficient funds!');
      return;
    }

    const existingPosition = positions.find(p => p.symbol === stock.symbol);
    
    if (existingPosition) {
      // Update existing position
      setPositions(prev => prev.map(pos => 
        pos.symbol === stock.symbol
          ? {
              ...pos,
              shares: pos.shares + shares,
              avgPrice: (pos.avgPrice * pos.shares + stock.price * shares) / (pos.shares + shares),
              totalValue: (pos.shares + shares) * stock.price,
            }
          : pos
      ));
    } else {
      // Create new position
      setPositions(prev => [...prev, {
        symbol: stock.symbol,
        shares,
        avgPrice: stock.price,
        currentPrice: stock.price,
        totalValue: shares * stock.price,
        gain: 0,
        gainPercent: 0
      }]);
    }

    // Update cash balance
    setAvailableCash(prev => prev - tradeValue);

    // Update challenges
    if (positions.length === 0) {
      completeChallenge(2); // First Trade challenge
    }

    const investedAmount = totalPortfolioValue - availableCash;
    updateChallengeProgress(3, investedAmount);

    // Add XP for the trade
    addXp(50); // 50 XP per trade
  };

  // Challenge management
  const completeChallenge = (challengeId: number) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId
        ? { ...challenge, completed: true }
        : challenge
    ));
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      addXp(challenge.xpReward);
    }
  };

  const updateChallengeProgress = (challengeId: number, progress: number) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId
        ? { 
            ...challenge, 
            progress,
            completed: progress >= (challenge.total || 0)
          }
        : challenge
    ));
  };

  // XP and leveling system
  const addXp = (amount: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      const newLevel = Math.floor(newXp / 1000) + 1; // Level up every 1000 XP
      if (newLevel > level) {
        setLevel(newLevel);
        // Show level up animation/notification here
      }
      return newXp;
    });
  };

  useEffect(() => {
    // Simulate initial data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto">
            <motion.div
              className="w-full h-full rounded-full border-4 border-blue-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <h2 className="text-2xl font-bold text-white">Loading Your Dashboard</h2>
          <p className="text-blue-200">Preparing your fantasy investing experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Player Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Level {level}</h2>
              <p className="text-blue-200">Investment Master</p>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>XP Progress</span>
              <span>{xp} / {level * 1000}</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(xp % 1000) / 10}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
              />
            </div>
          </div>

          {/* Portfolio Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Portfolio Summary</h3>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex justify-between mb-2">
                <span>Total Value</span>
                <span className="font-bold">${totalPortfolioValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Available Cash</span>
                <span className="font-bold">${availableCash.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Trade */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Trade</h3>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  searchStocks(e.target.value);
                }}
                placeholder="Search stocks..."
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-white/50" />
            </div>
            {searchTerm && (
              <div className="mt-2 bg-white/5 rounded-xl overflow-hidden">
                {searchResults.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => {
                      setSelectedStock(stock);
                      setShowTradeModal(true);
                    }}
                    className="w-full flex items-center justify-between p-3 hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <div className="font-bold">{stock.symbol}</div>
                      <div className="text-sm text-white/70">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div>${stock.price}</div>
                      <div className={stock.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Portfolio Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6" />
            Your Positions
          </h2>

          <div className="space-y-4">
            {positions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white/70 mb-4">No positions yet. Start trading to build your portfolio!</p>
                <button
                  onClick={() => setShowTradeModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Start Trading
                </button>
              </div>
            ) : (
              positions.map((position) => (
                <motion.div
                  key={position.symbol}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/5 rounded-xl p-4"
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <div className="font-bold">{position.symbol}</div>
                      <div className="text-sm text-white/70">{position.shares} shares</div>
                    </div>
                    <div className="text-right">
                      <div>${position.totalValue.toLocaleString()}</div>
                      <div className={position.gain >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {position.gain >= 0 ? '+' : ''}{position.gainPercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-white/70">
                    <span>Avg Price: ${position.avgPrice.toFixed(2)}</span>
                    <span>Current: ${position.currentPrice.toFixed(2)}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Daily Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Target className="w-6 h-6" />
            Challenges
          </h2>

          <div className="space-y-4">
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${challenge.completed ? 'border-green-400 bg-green-400/20' : 'border-white/30'}`}>
                    {challenge.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <Star className="w-4 h-4 text-green-400" />
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{challenge.title}</div>
                    <div className="text-sm text-white/70">{challenge.description}</div>
                    {challenge.progress !== undefined && (
                      <div className="mt-2 w-full bg-white/10 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(challenge.progress / (challenge.total || 1)) * 100}%` }}
                          className="h-full rounded-full bg-blue-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <Trophy className="w-4 h-4" />
                  <span>{challenge.xpReward} XP</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trade Modal */}
      {showTradeModal && selectedStock && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Trade {selectedStock.symbol}</h3>
            <div className="mb-4">
              <div className="flex justify-between text-white/70 mb-2">
                <span>Current Price</span>
                <span>${selectedStock.price}</span>
              </div>
              <div className="flex justify-between text-white/70 mb-4">
                <span>Available Cash</span>
                <span>${availableCash.toLocaleString()}</span>
              </div>
              <input
                type="number"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                placeholder="Enter number of shares..."
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 mb-2"
              />
              <div className="text-right text-white/70">
                Total: ${(parseFloat(tradeAmount) || 0 * selectedStock.price).toLocaleString()}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowTradeModal(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const shares = parseInt(tradeAmount);
                  if (shares > 0) {
                    executeTrade(selectedStock, shares);
                    setShowTradeModal(false);
                    setTradeAmount('');
                  }
                }}
                className="flex-1 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Buy
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 