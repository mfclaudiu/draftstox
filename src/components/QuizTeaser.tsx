import React from 'react';
import { Play, Star } from 'lucide-react';

interface QuizTeaserProps {
  onStartQuiz: () => void;
}

export function QuizTeaser({ onStartQuiz }: QuizTeaserProps) {
  return (
    <section id="quiz-teaser" className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
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
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <p className="text-gray-700 font-medium mb-2">✨ Quick Preview Questions:</p>
            <div className="text-left space-y-2 text-gray-600">
              <p>• How do you feel about market volatility?</p>
              <p>• What's your investment timeline?</p>
              <p>• Risk tolerance vs. potential returns?</p>
            </div>
          </div>
          
          <button 
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            Start Quiz Now
          </button>
        </div>
      </div>
    </section>
  );
} 