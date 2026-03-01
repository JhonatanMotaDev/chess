import type { Chess } from 'chess.js';

export interface MoveEvaluation {
  move: string;
  san: string;
  score: number;
  isBlunder: boolean;
  isMistake: boolean;
  isInaccuracy: boolean;
}

const BLUNDER_THRESHOLD = 300; // centipawns
const MISTAKE_THRESHOLD = 150;
const INACCURACY_THRESHOLD = 75;

/**
 * Calculate approximate accuracy based on move evaluations.
 * Perfect play = 100%, blunders reduce significantly.
 */
export function calculateAccuracy(evaluations: MoveEvaluation[]): number {
  if (evaluations.length === 0) return 100;

  let totalScore = 0;
  let maxPossible = evaluations.length * 100;

  for (const eval_ of evaluations) {
    if (eval_.isBlunder) {
      totalScore += 0;
    } else if (eval_.isMistake) {
      totalScore += 50;
    } else if (eval_.isInaccuracy) {
      totalScore += 75;
    } else {
      totalScore += 100;
    }
  }

  return Math.round((totalScore / maxPossible) * 100);
}

/**
 * Classify a move quality based on centipawn loss.
 */
export function classifyMoveQuality(
  playedScore: number,
  bestScore: number,
  isWhite: boolean
): { isBlunder: boolean; isMistake: boolean; isInaccuracy: boolean } {
  const diff = isWhite ? bestScore - playedScore : playedScore - bestScore;

  return {
    isBlunder: diff >= BLUNDER_THRESHOLD,
    isMistake: diff >= MISTAKE_THRESHOLD && diff < BLUNDER_THRESHOLD,
    isInaccuracy: diff >= INACCURACY_THRESHOLD && diff < MISTAKE_THRESHOLD,
  };
}
