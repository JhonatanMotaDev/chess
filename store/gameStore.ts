import { create } from 'zustand';
import { Chess } from 'chess.js';
import type { Difficulty } from './settingsStore'; // Verify this file exists

interface GameState {
  chess: Chess;
  moveHistory: string[];
  playerColor: 'w' | 'b';
  difficulty: Difficulty;
  capturedPieces: { w: string[]; b: string[] };
  gameStatus: 'playing' | 'checkmate' | 'stalemate' | 'draw';
  initGame: (color: 'w' | 'b', difficulty: Difficulty) => void;
  makeMove: (move: string) => boolean;
}

export const useGameStore = create<GameState>((set, get) => ({
  chess: new Chess(),
  moveHistory: [],
  playerColor: 'w',
  difficulty: 'intermediate',
  capturedPieces: { w: [], b: [] },
  gameStatus: 'playing',
  initGame: (color, difficulty) => {
    const newChess = new Chess();
    set({ chess: newChess, moveHistory: [], playerColor: color, difficulty, capturedPieces: { w: [], b: [] }, gameStatus: 'playing' });
    // Placeholder: Initialize engine based on difficulty (e.g., set Elo)
  },
  makeMove: (move) => {
    const { chess, playerColor } = get();
    if (chess.turn() !== playerColor) return false;
    try {
      const result = chess.move(move);
      if (result) {
        const newMoveHistory = [...get().moveHistory, move];
        const captured = result.captured ? (result.color === 'w' ? 'b' : 'w') + result.captured : null;
        const newCaptured = { ...get().capturedPieces };
        if (captured) {
          newCaptured[result.color === 'w' ? 'b' : 'w'].push(captured);
        }
        let status: GameState['gameStatus'] = 'playing';
        if (chess.isCheckmate()) status = 'checkmate';
        else if (chess.isStalemate()) status = 'stalemate';
        else if (chess.isDraw()) status = 'draw';
        set({ moveHistory: newMoveHistory, capturedPieces: newCaptured, gameStatus: status });
        return true;
      }
    } catch {
      // Invalid move
    }
    return false;
  },
}));
