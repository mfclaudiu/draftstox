import React, { useState } from 'react';
import { Target, Trophy, GamepadIcon, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  details: string[];
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Take a Quiz',
    description: 'Discover your investing archetype with our personalized quiz. Are you a cautious saver or bold risk-taker?',
    icon: <Target className="w-10 h-10 text-white" />,
    gradient: 'from-purple-500 to-blue-500',
    details: [
      '5 thoughtful questions about your risk tolerance',
      'Smart branching logic adapts to your answers',
      'Results in one of 4 investing archetypes',
      'Personalized recommendations for your style'
    ]
  },
  {
    id: 2,
    title: 'Build Your Portfolio',
    description: 'Create your fantasy investment portfolio with virtual money. Experiment with stocks, ETFs, and crypto safely.',
    icon: <GamepadIcon className="w-10 h-10 text-white" />,
    gradient: 'from-cyan-500 to-teal-500',
    details: [
      'Start with $100,000 in virtual currency',
      'Choose from real stocks, ETFs, and crypto',
      'Live market data and real-time pricing',
      'No risk - perfect for learning and experimentation'
    ]
  },
  {
    id: 3,
    title: 'Climb the Leaderboard',
    description: 'Compete with friends, earn DraftPoints, and unlock achievements as you master investing strategies.',
    icon: <Trophy className="w-10 h-10 text-white" />,
    gradient: 'from-orange-500 to-red-500',
    details: [
      'Daily and weekly leaderboards',
      'Earn XP for smart investment decisions',
      'Unlock badges and achievements',
      'Challenge friends and learn together'
    ]
  }
];

export function HowItWorks() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to start your investing journey through gamified learning
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.id} className="text-center group">
              <div 
                className={`bg-gradient-to-r ${step.gradient} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-200 cursor-pointer`}
                onClick={() => setSelectedStep(step.id)}
              >
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.id}. {step.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                {step.description}
              </p>
              <button
                onClick={() => setSelectedStep(step.id)}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Learn more
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const step = steps.find(s => s.id === selectedStep);
                if (!step) return null;
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`bg-gradient-to-r ${step.gradient} w-16 h-16 rounded-full flex items-center justify-center`}>
                        {step.icon}
                      </div>
                      <button
                        onClick={() => setSelectedStep(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-lg">What you'll get:</h4>
                      <ul className="space-y-2">
                        {step.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 