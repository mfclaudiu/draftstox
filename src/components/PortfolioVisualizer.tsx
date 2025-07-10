import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Star, Zap, DollarSign, Activity, PieChart, BarChart2, TrendingDown } from 'lucide-react';
import { Portfolio, Position } from '../types';
import { Helmet } from 'react-helmet-async';

interface PortfolioVisualizerProps {
  portfolio: Portfolio;
  userLevel: number;
  userXP: number;
  dailyStreak: number;
}

export function PortfolioVisualizer({ portfolio, userLevel, userXP, dailyStreak }: PortfolioVisualizerProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  // Calculate XP needed for next level (example formula)
  const xpForNextLevel = Math.floor(1000 * Math.pow(1.5, userLevel - 1));
  const xpProgress = (userXP % xpForNextLevel) / xpForNextLevel * 100;

  // Calculate portfolio diversity score
  const diversityScore = Math.min(
    100,
    (portfolio.positions.length / 10) * 100 // Example: 10 positions = 100% diversity
  );

  return (
    <>
      <Helmet>
        <title>Fantasy Stock Portfolio - Level {userLevel} Investor Dashboard</title>
        <meta name="description" content={`Track your fantasy stock portfolio with ${portfolio.positions.length} positions. Current value: ${formatCurrency(portfolio.totalValue)}. Level ${userLevel} investor with ${dailyStreak} day streak!`} />
        <meta name="keywords" content="fantasy trading, stock portfolio, investment game, stock market simulator" />
      </Helmet>

      <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
        {/* Player Stats Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-300" />
                Level {userLevel}
              </h2>
              <p className="text-purple-200">Fantasy Investor</p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">{dailyStreak} Day Streak!</span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{userXP % xpForNextLevel} XP</span>
              <span>{xpForNextLevel} XP needed</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Portfolio Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Value */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold text-gray-700">Total Value</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(portfolio.totalValue)}</p>
            <p className={`text-sm flex items-center gap-1 ${portfolio.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolio.totalReturnPercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {formatPercent(portfolio.totalReturnPercent)} All Time
            </p>
          </motion.div>

          {/* Portfolio Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <PieChart className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold text-gray-700">Portfolio Score</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{Math.round(diversityScore)}</p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <BarChart2 className="w-4 h-4" />
              Based on Diversity & Performance
            </p>
          </motion.div>

          {/* Daily Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-purple-500" />
              <h3 className="font-semibold text-gray-700">Daily Challenge</h3>
            </div>
            <p className="text-lg font-medium text-gray-900">Add 2 More Positions</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
              <motion.div 
                className="bg-purple-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(portfolio.positions.length / 5) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Portfolio Visualization */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-500" />
            Portfolio Allocation
          </h3>
          <div className="space-y-4">
            {portfolio.positions.map((position) => (
              <motion.div 
                key={position.id} 
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 min-w-[120px]">
                  <div className="w-16 text-sm font-medium text-gray-600">
                    {position.symbol}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{position.name}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(position.totalValue)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(position.totalValue / portfolio.totalValue) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div className={`text-sm font-medium flex items-center gap-1 ${
                  position.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {position.totalReturnPercent >= 0 ? 
                    <TrendingUp className="w-4 h-4" /> : 
                    <TrendingDown className="w-4 h-4" />
                  }
                  {formatPercent(position.totalReturnPercent)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              Positions
            </p>
            <p className="text-xl font-bold text-gray-900">{portfolio.positions.length}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Available Cash
            </p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(portfolio.virtualBalance)}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Today's Change
            </p>
            <p className="text-xl font-bold text-green-600">+$245.50</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Trading Score
            </p>
            <p className="text-xl font-bold text-gray-900">78</p>
          </motion.div>
        </div>
      </div>
    </>
  );
} 