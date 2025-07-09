import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Trophy, Target, TrendingUp, Award, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - will be replaced with real data from backend
  const portfolioData = {
    totalValue: 25000,
    dayChange: 450,
    dayChangePercent: 1.8,
    level: 5,
    xp: 2750,
    xpToNextLevel: 5000,
    badges: ['First Trade', 'Diamond Hands', 'Risk Manager'],
    dailyChallenges: [
      { id: 1, title: 'Research 3 stocks', completed: true, xp: 100 },
      { id: 2, title: 'Make a trade', completed: false, xp: 150 },
      { id: 3, title: 'Check market news', completed: false, xp: 50 },
    ],
    allocation: [
      { name: 'Tech', value: 40, color: '#8b5cf6' },
      { name: 'Finance', value: 25, color: '#3b82f6' },
      { name: 'Healthcare', value: 20, color: '#06b6d4' },
      { name: 'Energy', value: 15, color: '#10b981' },
    ],
  };

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
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
              <h2 className="text-2xl font-bold">Level {portfolioData.level}</h2>
              <p className="text-blue-200">Investment Master</p>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>XP Progress</span>
              <span>{portfolioData.xp} / {portfolioData.xpToNextLevel}</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(portfolioData.xp / portfolioData.xpToNextLevel) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
              />
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Badges Earned</h3>
            <div className="flex flex-wrap gap-3">
              {portfolioData.badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1"
                >
                  <Award className="w-4 h-4" />
                  <span className="text-sm">{badge}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Portfolio Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6" />
            Portfolio Value
          </h2>
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            ${portfolioData.totalValue.toLocaleString()}
          </motion.div>

          <div className={`text-lg ${portfolioData.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolioData.dayChange >= 0 ? '+' : ''}{portfolioData.dayChange.toLocaleString()} 
            ({portfolioData.dayChangePercent}%) Today
          </div>

          <div className="mt-8">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={portfolioData.allocation}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={60}
                  animationDuration={1000}
                >
                  {portfolioData.allocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
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
            Daily Challenges
          </h2>

          <div className="space-y-4">
            {portfolioData.dailyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
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
                  <span>{challenge.title}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <Trophy className="w-4 h-4" />
                  <span>{challenge.xp} XP</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 