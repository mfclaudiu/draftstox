import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { QuizQuestion, QuizResponse, QuizResult, InvestorArchetype } from '../types';
import { QUIZ_QUESTIONS } from '../constants/quiz';
import { INVESTOR_ARCHETYPES } from '../constants/archetypes';

interface QuizState {
  currentQuestion: number;
  responses: QuizResponse[];
  isCompleted: boolean;
  result: QuizResult | null;
  isLoading: boolean;
}

type QuizAction =
  | { type: 'ANSWER_QUESTION'; payload: QuizResponse }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'COMPLETE_QUIZ'; payload: QuizResult }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: QuizState = {
  currentQuestion: 0,
  responses: [],
  isCompleted: false,
  result: null,
  isLoading: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      const existingResponseIndex = state.responses.findIndex(
        r => r.questionId === action.payload.questionId
      );
      
      let newResponses;
      if (existingResponseIndex >= 0) {
        newResponses = [...state.responses];
        newResponses[existingResponseIndex] = action.payload;
      } else {
        newResponses = [...state.responses, action.payload];
      }
      
      return {
        ...state,
        responses: newResponses,
      };
    
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: Math.min(state.currentQuestion + 1, QUIZ_QUESTIONS.length - 1),
      };
    
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 0),
      };
    
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        isCompleted: true,
        result: action.payload,
        isLoading: false,
      };
    
    case 'RESET_QUIZ':
      return initialState;
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    default:
      return state;
  }
}

interface QuizContextType {
  state: QuizState;
  answerQuestion: (questionId: string, selectedOptions: string[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  getCurrentQuestion: () => QuizQuestion;
  canGoNext: () => boolean;
  canGoPrevious: () => boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const answerQuestion = (questionId: string, selectedOptions: string[]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === questionId);
    if (!question) return;

    const score: Record<string, number> = {};
    
    selectedOptions.forEach(optionId => {
      const option = question.options.find(o => o.id === optionId);
      if (option) {
        score[option.archetype] = (score[option.archetype] || 0) + (option.value * question.weight);
      }
    });

    const response: QuizResponse = {
      questionId,
      selectedOptions,
      score,
    };

    dispatch({ type: 'ANSWER_QUESTION', payload: response });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const completeQuiz = () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Calculate final scores
    const finalScores: Record<string, number> = {};
    
    state.responses.forEach(response => {
      Object.entries(response.score).forEach(([archetype, score]) => {
        finalScores[archetype] = (finalScores[archetype] || 0) + score;
      });
    });

    // Find the highest scoring archetype
    const maxScore = Math.max(...Object.values(finalScores));
    const winningArchetype = Object.entries(finalScores).find(([_, score]) => score === maxScore)?.[0];
    
    if (!winningArchetype) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    const archetype = INVESTOR_ARCHETYPES[winningArchetype.toUpperCase()];
    const confidence = (maxScore / Math.max(...Object.values(finalScores))) * 100;

    const result: QuizResult = {
      archetype,
      confidence,
      scores: finalScores,
      recommendations: archetype.recommendations,
    };

    setTimeout(() => {
      dispatch({ type: 'COMPLETE_QUIZ', payload: result });
    }, 1000); // Simulate processing time
  };

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  const getCurrentQuestion = () => {
    return QUIZ_QUESTIONS[state.currentQuestion];
  };

  const canGoNext = () => {
    const currentQuestionId = QUIZ_QUESTIONS[state.currentQuestion]?.id;
    const hasAnswer = state.responses.some(r => r.questionId === currentQuestionId);
    return hasAnswer && state.currentQuestion < QUIZ_QUESTIONS.length - 1;
  };

  const canGoPrevious = () => {
    return state.currentQuestion > 0;
  };

  const value: QuizContextType = {
    state,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz,
    getCurrentQuestion,
    canGoNext,
    canGoPrevious,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 