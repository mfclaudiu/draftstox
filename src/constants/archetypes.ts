import { InvestorArchetype } from '../types';

export const INVESTOR_ARCHETYPES: Record<string, InvestorArchetype> = {
  CONSERVATIVE: {
    id: 'conservative',
    name: 'The Steady Builder',
    title: 'Conservative Investor',
    description: 'You prefer slow and steady growth with minimal risk. Your approach is methodical and focuses on long-term wealth building.',
    characteristics: [
      'Risk-averse with a focus on capital preservation',
      'Prefers diversified, stable investments',
      'Values consistent, predictable returns',
      'Takes time to research before investing'
    ],
    strengths: [
      'Excellent at avoiding major losses',
      'Disciplined approach to investing',
      'Strong focus on fundamentals',
      'Patient with long-term strategies'
    ],
    recommendations: [
      'Start with broad market ETFs (S&P 500, Total Stock Market)',
      'Consider bond funds for stability',
      'Dollar-cost average into investments',
      'Focus on companies with strong dividends'
    ],
    icon: 'shield',
    color: 'blue'
  },
  BALANCED: {
    id: 'balanced',
    name: 'The Strategic Player',
    title: 'Balanced Investor',
    description: 'You seek a healthy balance between growth potential and risk management. You\'re willing to take calculated risks for better returns.',
    characteristics: [
      'Balances growth and income investments',
      'Comfortable with moderate market volatility',
      'Seeks diversification across asset classes',
      'Regularly rebalances portfolio'
    ],
    strengths: [
      'Good at managing risk vs. reward',
      'Flexible investment approach',
      'Strong portfolio diversification',
      'Adapts well to market changes'
    ],
    recommendations: [
      'Mix of growth and value stocks',
      'Combine individual stocks with ETFs',
      'Include some international exposure',
      'Consider REITs for diversification'
    ],
    icon: 'scales',
    color: 'purple'
  },
  AGGRESSIVE: {
    id: 'aggressive',
    name: 'The Growth Hunter',
    title: 'Aggressive Investor',
    description: 'You\'re focused on maximizing returns and willing to accept higher volatility. You believe in taking calculated risks for superior gains.',
    characteristics: [
      'High risk tolerance for potential high returns',
      'Focuses on growth stocks and emerging sectors',
      'Comfortable with portfolio volatility',
      'Active in monitoring investments'
    ],
    strengths: [
      'Potential for high returns',
      'Quick to identify opportunities',
      'Not afraid of market volatility',
      'Strong conviction in investment choices'
    ],
    recommendations: [
      'Growth stocks in tech and innovation',
      'Small-cap and mid-cap companies',
      'Sector-specific ETFs (Tech, Healthcare)',
      'Some allocation to cryptocurrency'
    ],
    icon: 'trending-up',
    color: 'green'
  },
  SPECULATIVE: {
    id: 'speculative',
    name: 'The Risk Taker',
    title: 'Speculative Investor',
    description: 'You thrive on high-risk, high-reward opportunities. You\'re willing to bet big on your convictions and enjoy the thrill of the market.',
    characteristics: [
      'Very high risk tolerance',
      'Interested in emerging technologies and trends',
      'Comfortable with significant losses',
      'Enjoys researching new opportunities'
    ],
    strengths: [
      'Potential for exceptional returns',
      'Early adopter of new trends',
      'High conviction in investments',
      'Not emotionally attached to losses'
    ],
    recommendations: [
      'Individual growth stocks with high potential',
      'Cryptocurrency and DeFi projects',
      'Options and derivatives trading',
      'Penny stocks and micro-caps (small allocation)'
    ],
    icon: 'zap',
    color: 'red'
  }
};

export const ARCHETYPE_ORDER = ['CONSERVATIVE', 'BALANCED', 'AGGRESSIVE', 'SPECULATIVE']; 