import React from 'react';
import { Play, ArrowRight, BarChart3 } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
  onJoinWaitlist: () => void;
}

export function Hero({ onStartQuiz, onJoinWaitlist }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Invest like it's a game.</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Because it is.
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Learn investing through play — no risk, all reward. Master the market with fantasy-style portfolio building.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={onStartQuiz}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Take the Quiz
            </button>
            <button 
              onClick={onJoinWaitlist}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/40 flex items-center gap-2"
            >
              Join the Waitlist
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Hero Visual */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6 h-64 sm:h-80 flex items-center justify-center">
              <div className="text-center text-white">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                <h3 className="text-2xl font-bold mb-2">Fantasy-Style Dashboard</h3>
                <p className="text-gray-300">Interactive portfolio visualization coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 