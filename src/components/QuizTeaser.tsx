import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface QuizTeaserProps {
  onStartQuiz: () => void;
}

export function QuizTeaser({ onStartQuiz }: QuizTeaserProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});

  // Sample questions from the actual quiz (first 3 questions)
  const sampleQuestions = [
    {
      question: "How do you feel about investment risk?",
      options: ["I prefer stability and minimal risk", "I can handle some ups and downs", "I'm comfortable with significant volatility", "I seek maximum returns regardless of risk"]
    },
    {
      question: "How long do you plan to hold your investments?",
      options: ["Less than 1 year", "1-5 years", "5-10 years", "More than 10 years"]
    },
    {
      question: "How do you approach investment research?",
      options: ["I analyze company financials and business models", "I study price patterns and market trends", "I prefer index funds and ETFs", "I use a combination of approaches"]
    }
  ];

  const handleOptionClick = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="font-poppins font-bold text-3xl lg:text-4xl text-gray-900 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Quick Preview Questions
        </motion.h2>
        
        <div className="space-y-8 mb-12">
          {sampleQuestions.map((item, questionIndex) => (
            <motion.div
              key={questionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: questionIndex * 0.2 }}
              className="bg-gray-50 rounded-xl p-6 text-left"
            >
              <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-4">
                {item.question}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {item.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswers[questionIndex] === optionIndex;
                  return (
                    <button
                      key={optionIndex}
                      onClick={() => handleOptionClick(questionIndex, optionIndex)}
                      className={`text-left bg-white rounded-lg p-3 border transition-all duration-200 ${
                        isSelected 
                          ? 'border-electric-teal bg-electric-teal/10 shadow-sm' 
                          : 'border-gray-200 hover:border-electric-teal hover:bg-electric-teal/5'
                      }`}
                    >
                      <span className="font-montserrat text-gray-700">{option}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={onStartQuiz}
            className="inline-flex items-center justify-center px-8 py-4 bg-electric-teal text-deep-indigo font-montserrat font-semibold text-lg rounded-lg shadow-lg hover:bg-teal-400 hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Take the DraftDNA Quiz
          </button>
        </motion.div>
      </div>
    </section>
  );
} 