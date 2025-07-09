import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Star, Zap, DollarSign, Activity } from 'lucide-react';
import { Portfolio, Position } from '../types';

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
    <div className="space-y-6">
      {/* Player Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Level {userLevel}</h2>
            <p className="text-purple-200">Fantasy Investor</p>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">{dailyStreak} Day Streak!</span>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{userXP % xpForNextLevel} XP</span>
            <span>{xpForNextLevel} XP</span>
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
      </div>

      {/* Portfolio Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Value */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-6 h-6 text-green-500" />
            <h3 className="font-semibold text-gray-700">Total Value</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(portfolio.totalValue)}</p>
          <p className={`text-sm ${portfolio.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercent(portfolio.totalReturnPercent)} All Time
          </p>
        </motion.div>

        {/* Portfolio Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <h3 className="font-semibold text-gray-700">Portfolio Score</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{Math.round(diversityScore)}</p>
          <p className="text-sm text-gray-600">Based on Diversity & Performance</p>
        </motion.div>

        {/* Daily Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-6 h-6 text-purple-500" />
            <h3 className="font-semibold text-gray-700">Daily Challenge</h3>
          </div>
          <p className="text-lg font-medium text-gray-900">Add 2 More Positions</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-500 h-2 rounded-full" 
              style={{ width: `${(portfolio.positions.length / 5) * 100}%` }}
            />
          </div>
        </motion.div>
      </div>

      {/* Portfolio Visualization */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="font-semibold text-gray-700 mb-4">Portfolio Allocation</h3>
        <div className="space-y-4">
          {portfolio.positions.map((position) => (
            <div key={position.id} className="flex items-center gap-4">
              <div className="w-16 text-sm font-medium text-gray-600">
                {position.symbol}
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
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
              <div className={`text-sm font-medium ${
                position.totalReturnPercent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatPercent(position.totalReturnPercent)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Positions</p>
          <p className="text-xl font-bold text-gray-900">{portfolio.positions.length}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Available Cash</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(portfolio.virtualBalance)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Today's Change</p>
          <p className="text-xl font-bold text-green-600">+$245.50</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Trading Score</p>
          <p className="text-xl font-bold text-gray-900">78</p>
        </div>
      </div>
    </div>
  );
} 