import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onStartQuiz: () => void;
}

export function Hero({ onStartQuiz }: HeroProps) {
  return (
    <section className="relative bg-deep-indigo text-white py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-deep-indigo to-blue-900"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Play the market before you pay the market.
        </motion.h1>
        
        <motion.p 
          className="font-montserrat text-lg sm:text-xl lg:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Build confidence, strategy, and instinct as an investor — no money at risk, just pure skill-building. DraftStox turns investing into a game of growth.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={onStartQuiz}
            className="inline-flex items-center justify-center px-8 py-4 bg-electric-teal text-deep-indigo font-montserrat font-semibold text-lg rounded-lg shadow-lg hover:bg-teal-400 hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Take the Quiz — Find Your Investor Archetype
          </button>
        </motion.div>
      </div>
    </section>
  );
} 