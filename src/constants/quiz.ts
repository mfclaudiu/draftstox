import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'risk-tolerance',
    question: 'If your investment portfolio dropped 20% in a month, what would you do?',
    type: 'single',
    weight: 3,
    options: [
      {
        id: 'sell-immediately',
        text: 'Sell immediately to prevent further losses',
        value: 1,
        archetype: 'conservative'
      },
      {
        id: 'sell-some',
        text: 'Sell some positions to reduce risk',
        value: 2,
        archetype: 'conservative'
      },
      {
        id: 'hold-steady',
        text: 'Hold steady and wait for recovery',
        value: 3,
        archetype: 'balanced'
      },
      {
        id: 'buy-more',
        text: 'Buy more at the lower prices',
        value: 4,
        archetype: 'aggressive'
      },
      {
        id: 'double-down',
        text: 'Double down with all available cash',
        value: 5,
        archetype: 'speculative'
      }
    ]
  },
  {
    id: 'investment-timeline',
    question: 'What\'s your primary investment timeline?',
    type: 'single',
    weight: 2.5,
    options: [
      {
        id: 'less-than-year',
        text: 'Less than 1 year',
        value: 1,
        archetype: 'speculative'
      },
      {
        id: 'one-to-three',
        text: '1-3 years',
        value: 2,
        archetype: 'aggressive'
      },
      {
        id: 'three-to-seven',
        text: '3-7 years',
        value: 3,
        archetype: 'balanced'
      },
      {
        id: 'seven-to-fifteen',
        text: '7-15 years',
        value: 4,
        archetype: 'balanced'
      },
      {
        id: 'more-than-fifteen',
        text: 'More than 15 years',
        value: 5,
        archetype: 'conservative'
      }
    ]
  },
  {
    id: 'market-volatility',
    question: 'How do you feel about market volatility?',
    type: 'single',
    weight: 3,
    options: [
      {
        id: 'terrifying',
        text: 'It\'s terrifying - I prefer stable, predictable investments',
        value: 1,
        archetype: 'conservative'
      },
      {
        id: 'concerning',
        text: 'It\'s concerning but I can handle some ups and downs',
        value: 2,
        archetype: 'conservative'
      },
      {
        id: 'manageable',
        text: 'It\'s manageable if it means better long-term returns',
        value: 3,
        archetype: 'balanced'
      },
      {
        id: 'exciting',
        text: 'It\'s exciting - volatility creates opportunities',
        value: 4,
        archetype: 'aggressive'
      },
      {
        id: 'thrilling',
        text: 'It\'s thrilling - I love the adrenaline rush',
        value: 5,
        archetype: 'speculative'
      }
    ]
  },
  {
    id: 'research-approach',
    question: 'How much time do you spend researching investments?',
    type: 'single',
    weight: 2,
    options: [
      {
        id: 'minimal-research',
        text: 'I prefer simple, low-maintenance investments',
        value: 1,
        archetype: 'conservative'
      },
      {
        id: 'basic-research',
        text: 'I do basic research on fundamentals',
        value: 2,
        archetype: 'balanced'
      },
      {
        id: 'thorough-research',
        text: 'I thoroughly research every investment',
        value: 3,
        archetype: 'balanced'
      },
      {
        id: 'deep-research',
        text: 'I spend hours analyzing charts and trends',
        value: 4,
        archetype: 'aggressive'
      },
      {
        id: 'obsessive-research',
        text: 'I\'m constantly researching new opportunities',
        value: 5,
        archetype: 'speculative'
      }
    ]
  },
  {
    id: 'investment-goals',
    question: 'What\'s your primary investment goal?',
    type: 'single',
    weight: 2.5,
    options: [
      {
        id: 'preserve-wealth',
        text: 'Preserve my wealth and beat inflation',
        value: 1,
        archetype: 'conservative'
      },
      {
        id: 'steady-growth',
        text: 'Achieve steady, consistent growth',
        value: 2,
        archetype: 'conservative'
      },
      {
        id: 'balanced-growth',
        text: 'Balance growth with income generation',
        value: 3,
        archetype: 'balanced'
      },
      {
        id: 'maximize-returns',
        text: 'Maximize returns for long-term wealth building',
        value: 4,
        archetype: 'aggressive'
      },
      {
        id: 'get-rich-quick',
        text: 'Find the next big winner and get rich quick',
        value: 5,
        archetype: 'speculative'
      }
    ]
  }
];

export const SCORING_WEIGHTS = {
  conservative: 1,
  balanced: 1,
  aggressive: 1,
  speculative: 1
}; 