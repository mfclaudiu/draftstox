import React from 'react';
import { Play, Star, TrendingUp, Clock, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizTeaserProps {
  onStartQuiz: () => void;
}

export function QuizTeaser({ onStartQuiz }: QuizTeaserProps) {
  const questions = [
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      text: "How do you feel about market volatility?",
      description: "Understand your comfort with market ups and downs"
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-500" />,
      text: "What's your investment timeline?",
      description: "Define your short and long-term financial goals"
    },
    {
      icon: <BarChart2 className="w-5 h-5 text-indigo-500" />,
      text: "Risk tolerance vs. potential returns?",
      description: "Balance between safety and growth potential"
    }
  ];

  return (
    <section id="quiz-teaser" className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Discover Your Investing Archetype
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Take our 2-minute quiz to unlock personalized investment strategies and find your perfect starting point.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-blue-600">✨</span>
              <h3 className="text-lg font-semibold text-gray-900">Quick Preview Questions</h3>
            </div>
            <div className="grid gap-4">
              {questions.map((question, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 text-left">
                    <div className="bg-gray-50 rounded-full p-2 mt-1">
                      {question.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">{question.text}</p>
                      <p className="text-sm text-gray-500">{question.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.button 
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            Start Quiz Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 