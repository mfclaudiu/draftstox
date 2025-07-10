import React from 'react';
import { ChevronRight, TrendingUp, TrendingDown, DollarSign, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onStartQuiz: () => void;
}

const samplePortfolio = {
  totalValue: 104480.43,
  positions: [
    { symbol: 'AAPL', shares: 10, price: 170.25, change: 1.91 },
    { symbol: 'MSFT', shares: 5, price: 330.50, change: 2.30 },
    { symbol: 'GOOGL', shares: 8, price: 130.75, change: 0.85 }
  ]
};

export function Hero({ onStartQuiz }: HeroProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
            <div className="lg:py-24">
              <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                <span className="block">Invest like it's</span>
                <span className="block text-blue-600">a game</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Learn investing through play — no risk, all reward. Master the market with fantasy-style portfolio building.
              </p>
              <div className="mt-10 sm:mt-12">
                <div className="sm:flex sm:justify-center lg:justify-start">
                  <motion.button
                    onClick={onStartQuiz}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Take the Quiz
                    <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              <motion.div 
                className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-50"></div>
                  <div className="relative space-y-6">
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Fantasy Portfolio</h3>
                        <p className="text-gray-600 text-sm">Level 1 Investor</p>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">50 XP</span>
                      </div>
                    </div>

                    {/* Portfolio Value */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        <span className="text-lg font-semibold text-gray-700">Total Value</span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">{formatCurrency(samplePortfolio.totalValue)}</div>
                    </div>

                    {/* Positions */}
                    <div className="space-y-3">
                      {samplePortfolio.positions.map((position, index) => (
                        <motion.div
                          key={position.symbol}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-gray-900">{position.symbol}</div>
                            <div className="text-sm text-gray-500">{position.shares} shares</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">{formatCurrency(position.price)}</div>
                            <div className={`text-sm flex items-center gap-1 ${position.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {position.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                              {formatPercent(position.change)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 