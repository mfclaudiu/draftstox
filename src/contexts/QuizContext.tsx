import React, { createContext, useContext, useReducer } from 'react';

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface QuizState {
  currentQuestion: number;
  responses: { questionId: string; answers: string[] }[];
  isLoading: boolean;
  isCompleted: boolean;
  result: {
    archetype: string;
    description: string;
    traits: string[];
    strategies: string[];
  } | null;
}

type QuizAction =
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; answers: string[] } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' };

const questions: Question[] = [
  {
    id: 'risk_tolerance',
    text: 'How do you feel about investment risk?',
    options: [
      { id: 'conservative', text: 'I prefer stability and minimal risk' },
      { id: 'moderate', text: 'I can handle some ups and downs' },
      { id: 'aggressive', text: 'I\'m comfortable with significant volatility' },
      { id: 'very_aggressive', text: 'I seek maximum returns regardless of risk' }
    ]
  },
  {
    id: 'investment_horizon',
    text: 'How long do you plan to hold your investments?',
    options: [
      { id: 'short_term', text: 'Less than 1 year' },
      { id: 'medium_term', text: '1-5 years' },
      { id: 'long_term', text: '5-10 years' },
      { id: 'very_long_term', text: 'More than 10 years' }
    ]
  },
  {
    id: 'research_style',
    text: 'How do you approach investment research?',
    options: [
      { id: 'fundamental', text: 'I analyze company financials and business models' },
      { id: 'technical', text: 'I study price patterns and market trends' },
      { id: 'passive', text: 'I prefer index funds and ETFs' },
      { id: 'mixed', text: 'I use a combination of approaches' }
    ]
  },
  {
    id: 'portfolio_goal',
    text: 'What\'s your primary investment goal?',
    options: [
      { id: 'income', text: 'Generate regular income' },
      { id: 'growth', text: 'Long-term capital appreciation' },
      { id: 'balanced', text: 'Balance between growth and income' },
      { id: 'speculation', text: 'Short-term trading profits' }
    ]
  },
  {
    id: 'market_view',
    text: 'How do you view market opportunities?',
    options: [
      { id: 'contrarian', text: 'I look for undervalued opportunities' },
      { id: 'momentum', text: 'I follow market trends' },
      { id: 'opportunistic', text: 'I seek special situations' },
      { id: 'systematic', text: 'I follow a strict investment system' }
    ]
  }
];

const archetypes = {
  'The Steady Builder': {
    description: 'You\'re a methodical investor focused on long-term wealth building through stable, reliable investments.',
    traits: [
      'Risk-averse but not risk-avoidant',
      'Values steady, predictable returns',
      'Focuses on fundamentals',
      'Prefers established companies'
    ],
    strategies: [
      'Dividend-paying stocks',
      'Blue-chip companies',
      'Value investing',
      'Dollar-cost averaging'
    ]
  },
  'The Strategic Player': {
    description: 'You balance growth opportunities with risk management, taking calculated positions based on thorough analysis.',
    traits: [
      'Research-driven approach',
      'Balanced risk tolerance',
      'Adaptable strategy',
      'Long-term perspective'
    ],
    strategies: [
      'Growth at reasonable price',
      'Sector rotation',
      'Quality growth stocks',
      'Strategic rebalancing'
    ]
  },
  'The Growth Hunter': {
    description: 'You seek high-growth opportunities and are willing to accept volatility for potentially higher returns.',
    traits: [
      'High risk tolerance',
      'Growth-focused',
      'Embraces innovation',
      'Active portfolio management'
    ],
    strategies: [
      'Emerging technology stocks',
      'High-growth sectors',
      'Momentum investing',
      'Aggressive position sizing'
    ]
  },
  'The Risk Taker': {
    description: 'You thrive on high-risk, high-reward opportunities and enjoy the thrill of active trading.',
    traits: [
      'Very high risk tolerance',
      'Short-term focused',
      'Opportunistic approach',
      'Embraces volatility'
    ],
    strategies: [
      'Momentum trading',
      'Emerging markets',
      'Sector-focused investing',
      'Aggressive growth stocks'
    ]
  }
};

const initialState: QuizState = {
  currentQuestion: 0,
  responses: [],
  isLoading: false,
  isCompleted: false,
  result: null
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        ...state,
        responses: [
          ...state.responses.filter(r => r.questionId !== action.payload.questionId),
          action.payload
        ]
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: Math.min(state.currentQuestion + 1, questions.length - 1)
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 0)
      };
    case 'COMPLETE_QUIZ':
      const result = calculateResult(state.responses);
      return {
        ...state,
        isLoading: false,
        isCompleted: true,
        result
      };
    case 'RESET_QUIZ':
      return initialState;
    default:
      return state;
  }
}

function calculateResult(responses: { questionId: string; answers: string[] }[]): QuizState['result'] {
  // Simple scoring system - can be made more sophisticated
  const scores = {
    conservative: 0,
    balanced: 0,
    aggressive: 0,
    speculative: 0
  };

  responses.forEach(response => {
    const answer = response.answers[0]; // Taking first answer for simplicity
    
    // Risk tolerance
    if (response.questionId === 'risk_tolerance') {
      if (answer === 'conservative') scores.conservative += 2;
      if (answer === 'moderate') scores.balanced += 2;
      if (answer === 'aggressive') scores.aggressive += 2;
      if (answer === 'very_aggressive') scores.speculative += 2;
    }
    
    // Investment horizon
    if (response.questionId === 'investment_horizon') {
      if (answer === 'short_term') scores.speculative += 2;
      if (answer === 'medium_term') scores.aggressive += 1;
      if (answer === 'long_term') scores.balanced += 2;
      if (answer === 'very_long_term') scores.conservative += 2;
    }
    
    // Research style
    if (response.questionId === 'research_style') {
      if (answer === 'fundamental') scores.conservative += 1;
      if (answer === 'technical') scores.aggressive += 1;
      if (answer === 'passive') scores.balanced += 2;
      if (answer === 'mixed') scores.balanced += 1;
    }
    
    // Portfolio goal
    if (response.questionId === 'portfolio_goal') {
      if (answer === 'income') scores.conservative += 2;
      if (answer === 'growth') scores.aggressive += 2;
      if (answer === 'balanced') scores.balanced += 2;
      if (answer === 'speculation') scores.speculative += 2;
    }
    
    // Market view
    if (response.questionId === 'market_view') {
      if (answer === 'contrarian') scores.conservative += 1;
      if (answer === 'momentum') scores.aggressive += 1;
      if (answer === 'opportunistic') scores.speculative += 1;
      if (answer === 'systematic') scores.balanced += 1;
    }
  });

  // Determine highest score
  const maxScore = Math.max(...Object.values(scores));
  const archetype = (() => {
    if (scores.conservative === maxScore) return 'The Steady Builder';
    if (scores.balanced === maxScore) return 'The Strategic Player';
    if (scores.aggressive === maxScore) return 'The Growth Hunter';
    return 'The Risk Taker';
  })();

  return {
    archetype,
    ...archetypes[archetype as keyof typeof archetypes]
  };
}

const QuizContext = createContext<{
  state: QuizState;
  answerQuestion: (questionId: string, answers: string[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  getCurrentQuestion: () => Question;
  canGoNext: () => boolean;
  canGoPrevious: () => boolean;
} | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const answerQuestion = (questionId: string, answers: string[]) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { questionId, answers } });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const completeQuiz = () => {
    dispatch({ type: 'COMPLETE_QUIZ' });
  };

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  const getCurrentQuestion = () => questions[state.currentQuestion];

  const canGoNext = () => {
    const currentQuestionId = questions[state.currentQuestion].id;
    return state.responses.some(r => r.questionId === currentQuestionId);
  };

  const canGoPrevious = () => state.currentQuestion > 0;

  return (
    <QuizContext.Provider
      value={{
        state,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        completeQuiz,
        resetQuiz,
        getCurrentQuestion,
        canGoNext,
        canGoPrevious
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 