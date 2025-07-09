import React from 'react';
import { ChevronLeft, ChevronRight, Loader, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../contexts/QuizContext';
import { QuizResult } from './QuizResult';
import { useNavigate } from 'react-router-dom';

export function Quiz() {
  const navigate = useNavigate();
  const {
    state,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz,
    getCurrentQuestion,
    canGoNext,
    canGoPrevious,
  } = useQuiz();

  if (state.isCompleted && state.result) {
    return <QuizResult result={state.result} onRestart={resetQuiz} />;
  }

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Calculating Your Archetype</h2>
          <p className="text-gray-600">Analyzing your responses to find your perfect investing style...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  const progress = ((state.currentQuestion + 1) / 5) * 100;
  const currentResponse = state.responses.find(r => r.questionId === currentQuestion.id);

  const handleAnswerSelect = (optionId: string) => {
    answerQuestion(currentQuestion.id, [optionId]);
  };

  const handleNext = () => {
    if (state.currentQuestion === 4) {
      completeQuiz();
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      {/* Header with Home Button */}
      <div className="max-w-4xl mx-auto mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Rest of the quiz content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Discover Your Investing Archetype
          </h1>
          <p className="text-xl text-gray-600">
            Question {state.currentQuestion + 1} of 5
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 leading-relaxed">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => {
                const isSelected = currentResponse?.selectedOptions.includes(option.id);
                
                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-colors duration-200 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-full h-full rounded-full bg-white scale-50" />
                        )}
                      </div>
                      <span className="text-lg text-gray-800 leading-relaxed">
                        {option.text}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={previousQuestion}
            disabled={!canGoPrevious()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              canGoPrevious()
                ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  i <= state.currentQuestion
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!currentResponse}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentResponse
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {state.currentQuestion === 4 ? 'Get Results' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 