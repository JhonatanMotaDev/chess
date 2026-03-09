import type { Difficulty } from '@/store/settingsStore';

export type EngineLevel = 1 | 2 | 3 | 4 | 5;

export const DIFFICULTY_TO_LEVEL: Record<Difficulty, EngineLevel> = {
  beginner: 1,
  intermediate: 3,
  advanced: 4,
  master: 5,
};

export const DIFFICULTY_RANDOMNESS: Record<Difficulty, number> = {
  beginner: 200,
  intermediate: 50,
  advanced: 10,
  master: 0,
};

export const DIFFICULTY_DELAY_MS: Record<Difficulty, { min: number; max: number }> = {
  beginner: { min: 800, max: 2000 },
  intermediate: { min: 1200, max: 3000 },
  advanced: { min: 2000, max: 5000 },
  master: { min: 3000, max: 8000 },
};
