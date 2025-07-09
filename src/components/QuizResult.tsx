import React from 'react';
import { motion } from 'framer-motion';
import { Share2, RefreshCw, ArrowRight, Shield, Scale, TrendingUp, Zap } from 'lucide-react';
import { QuizResult as QuizResultType } from '../types';

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
}

const iconMap = {
  shield: Shield,
  scales: Scale,
  'trending-up': TrendingUp,
  zap: Zap,
};

const colorMap = {
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
  red: 'from-red-500 to-red-600',
};

export function QuizResult({ result, onRestart }: QuizResultProps) {
  const IconComponent = iconMap[result.archetype.icon as keyof typeof iconMap] || Shield;
  const gradientColor = colorMap[result.archetype.color as keyof typeof colorMap] || colorMap.blue;

  const handleShare = async () => {
    const shareData = {
      title: `I'm ${result.archetype.name} on DraftStox!`,
      text: `I just discovered my investing archetype: ${result.archetype.title}. ${result.archetype.description}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(
          `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
        );
        alert('Results copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Investing Archetype
          </h1>
          <p className="text-xl text-gray-600">
            Here's what we discovered about your investing style
          </p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          {/* Archetype Header */}
          <div className={`bg-gradient-to-r ${gradientColor} p-8 text-white text-center`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <IconComponent className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              {result.archetype.name}
            </h2>
            <p className="text-xl opacity-90 mb-4">
              {result.archetype.title}
            </p>
            <div className="bg-white/20 rounded-full px-4 py-2 inline-block">
              <span className="text-sm font-medium">
                {Math.round(result.confidence)}% match
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {result.archetype.description}
            </p>

            {/* Characteristics */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Your Characteristics
                </h3>
                <ul className="space-y-2">
                  {result.archetype.characteristics.map((characteristic, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600">{characteristic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Your Strengths
                </h3>
                <ul className="space-y-2">
                  {result.archetype.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recommended Investments for You
              </h3>
              <ul className="space-y-3">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={handleShare}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share My Results
          </button>
          
          <button
            onClick={() => {
              // Scroll to waitlist section
              document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all duration-200 flex items-center gap-2"
          >
            Start Building Portfolio
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={onRestart}
            className="text-gray-600 hover:text-gray-800 px-6 py-4 font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Quiz
          </button>
        </motion.div>

        {/* Score Breakdown (Optional - could be collapsible) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Score Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(result.scores).map(([archetype, score]) => {
              const percentage = (score / Math.max(...Object.values(result.scores))) * 100;
              return (
                <div key={archetype} className="flex items-center gap-4">
                  <span className="w-20 text-sm text-gray-600 capitalize">
                    {archetype}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-10">
                    {Math.round(score)}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 