import { QuizResponse, QuizResult, InvestorArchetype } from '../types';
import { INVESTOR_ARCHETYPES } from '../constants/archetypes';

export function calculateQuizResult(responses: QuizResponse[]): QuizResult {
  // Calculate final scores for each archetype
  const finalScores: Record<string, number> = {
    conservative: 0,
    balanced: 0,
    aggressive: 0,
    speculative: 0,
  };

  responses.forEach(response => {
    Object.entries(response.score).forEach(([archetype, score]) => {
      finalScores[archetype] = (finalScores[archetype] || 0) + score;
    });
  });

  // Find the highest scoring archetype
  const maxScore = Math.max(...Object.values(finalScores));
  const winningArchetype = Object.entries(finalScores).find(([_, score]) => score === maxScore)?.[0];
  
  if (!winningArchetype) {
    throw new Error('Unable to determine archetype');
  }

  const archetype = INVESTOR_ARCHETYPES[winningArchetype.toUpperCase()];
  const totalPossibleScore = Object.values(finalScores).reduce((sum, score) => sum + score, 0);
  const confidence = totalPossibleScore > 0 ? (maxScore / totalPossibleScore) * 100 : 0;

  return {
    archetype,
    confidence: Math.min(Math.max(confidence, 0), 100), // Clamp between 0-100
    scores: finalScores,
    recommendations: archetype.recommendations,
  };
}

export function getArchetypeIcon(iconName: string): string {
  const iconMap: Record<string, string> = {
    shield: '🛡️',
    scales: '⚖️',
    'trending-up': '📈',
    zap: '⚡',
  };
  
  return iconMap[iconName] || '📊';
}

export function getArchetypeColor(colorName: string): string {
  const colorMap: Record<string, string> = {
    blue: '#3B82F6',
    purple: '#8B5CF6',
    green: '#10B981',
    red: '#EF4444',
  };
  
  return colorMap[colorName] || '#3B82F6';
}

export function formatScore(score: number): string {
  return Math.round(score).toString();
}

export function getConfidenceLevel(confidence: number): string {
  if (confidence >= 80) return 'Very High';
  if (confidence >= 60) return 'High';
  if (confidence >= 40) return 'Moderate';
  if (confidence >= 20) return 'Low';
  return 'Very Low';
} 