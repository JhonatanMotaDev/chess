import { ai } from 'js-chess-engine';
import type { Difficulty } from '@/store/settingsStore';
import {
  DIFFICULTY_TO_LEVEL,
  DIFFICULTY_RANDOMNESS,
  DIFFICULTY_DELAY_MS,
} from './types';

export interface EngineResult {
  from: string;
  to: string;
  san: string;
}

function parseHistoryEntry(entry: Record<string, string>): { from: string; to: string } | null {
  const entries = Object.entries(entry);
  if (entries.length === 0) return null;
  const [[from, to]] = entries;
  return {
    from: from.toLowerCase(),
    to: to.toLowerCase(),
  };
}

export function getEngineMove(
  fen: string,
  difficulty: Difficulty
): { move: EngineResult; delayMs: number } {
  const level = DIFFICULTY_TO_LEVEL[difficulty];
  const randomness = DIFFICULTY_RANDOMNESS[difficulty];
  const delayRange = DIFFICULTY_DELAY_MS[difficulty];

  const result = ai(fen, {
    level,
    play: false,
    randomness,
  });

  const parsed = parseHistoryEntry(result.move);
  if (!parsed) {
    throw new Error('Engine returned invalid move');
  }

  const delayMs =
    delayRange.min +
    Math.random() * (delayRange.max - delayRange.min);

  return {
    move: {
      from: parsed.from,
      to: parsed.to,
      san: `${parsed.from}-${parsed.to}`,
    },
    delayMs,
  };
}
