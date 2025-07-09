import React from 'react';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../contexts/QuizContext';
import { QuizResult } from './QuizResult';

export function Quiz() {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {state.currentQuestion + 1} of 5</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-blue-600 rounded-full"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {currentQuestion.options.map((option) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    currentResponse?.answers.includes(option.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <p className="text-gray-900">{option.text}</p>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={previousQuestion}
              disabled={!canGoPrevious()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                canGoPrevious()
                  ? 'text-gray-600 hover:text-gray-900'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                canGoNext()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {state.currentQuestion === 4 ? 'Complete' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 