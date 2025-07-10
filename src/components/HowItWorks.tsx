import React, { useState } from 'react';
import { Target, Trophy, GamepadIcon, ChevronRight, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  details: string[];
  color: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Take a Quiz',
    description: 'Discover your investing archetype with our personalized quiz. Are you a cautious saver or bold risk-taker?',
    icon: <Target className="w-10 h-10 text-white" />,
    gradient: 'from-blue-500 to-indigo-600',
    color: 'blue',
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
    gradient: 'from-cyan-500 to-blue-500',
    color: 'cyan',
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
    gradient: 'from-orange-500 to-pink-500',
    color: 'orange',
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
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Three simple steps to start your investing journey through gamified learning
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 via-cyan-200 to-orange-200"></div>
          
          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div 
                  className={`bg-gradient-to-r ${step.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  onClick={() => setSelectedStep(step.id)}
                >
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                  <span className={`w-8 h-8 rounded-full bg-${step.color}-100 text-${step.color}-600 flex items-center justify-center text-sm font-semibold`}>
                    {step.id}
                  </span>
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {step.description}
                </p>
                <motion.button
                  onClick={() => setSelectedStep(step.id)}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-${step.color}-50 text-${step.color}-600 hover:bg-${step.color}-100 transition-colors duration-200 font-medium`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const step = steps.find(s => s.id === selectedStep);
                if (!step) return null;
                
                return (
                  <>
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className={`bg-gradient-to-r ${step.gradient} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}>
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                          <p className={`text-${step.color}-600 font-medium`}>Step {step.id} of 3</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedStep(null)}
                        className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="space-y-6">
                      <h4 className="font-semibold text-gray-900 text-xl flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full bg-${step.color}-500`}></span>
                        What you'll get:
                      </h4>
                      <div className="grid gap-4">
                        {step.details.map((detail, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-start gap-4 p-4 rounded-xl bg-${step.color}-50`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-${step.color}-500 mt-2`}></div>
                            <span className="text-gray-700">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
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