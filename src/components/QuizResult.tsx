import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Share2, RefreshCw, ArrowRight } from 'lucide-react';

interface QuizResultProps {
  result: {
    archetype: string;
    description: string;
    traits: string[];
    strategies: string[];
  };
  onRestart: () => void;
}

export function QuizResult({ result, onRestart }: QuizResultProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Investing Archetype Is:
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">
            {result.archetype}
          </h2>
          <p className="text-lg text-gray-700 mb-8">{result.description}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Traits</h3>
              <ul className="space-y-2">
                {result.traits.map((trait, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    {trait}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Strategies</h3>
              <ul className="space-y-2">
                {result.strategies.map((strategy, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex items-center text-gray-700"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    {strategy}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Building Your Portfolio
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => {
                // Add share functionality
                alert('Sharing coming soon!');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
            >
              <Share2 className="w-5 h-5" />
              Share Result
            </button>

            <button
              onClick={onRestart}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
            >
              <RefreshCw className="w-5 h-5" />
              Retake Quiz
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 