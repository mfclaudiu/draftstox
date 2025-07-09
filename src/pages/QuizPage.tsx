import React from 'react';
import { Quiz } from '../components/Quiz';
import { QuizProvider } from '../contexts/QuizContext';

export function QuizPage() {
  return (
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  );
} 