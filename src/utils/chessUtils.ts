import type { Chess } from 'chess.js';
import type { Square } from '@/types/chess';

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

/**
 * Get all squares in board order (a8 to h1 for standard view).
 */
export function getBoardSquares(flipped: boolean): Square[] {
  const squares: Square[] = [];
  const rankOrder = flipped ? [...RANKS].reverse() : RANKS;
  const fileOrder = flipped ? [...FILES].reverse() : FILES;

  for (const rank of rankOrder) {
    for (const file of fileOrder) {
      squares.push(`${file}${rank}` as Square);
    }
  }
  return squares;
}

/**
 * Convert square index (0-63) to square notation.
 */
export function indexToSquare(index: number, flipped: boolean): Square {
  const fileIdx = flipped ? 7 - (index % 8) : index % 8;
  const rankIdx = flipped ? Math.floor(index / 8) : 7 - Math.floor(index / 8);
  return `${FILES[fileIdx]}${RANKS[rankIdx]}` as Square;
}

/**
 * Get piece symbol for display (Unicode chess characters).
 */
export const PIECE_SYMBOLS: Record<string, string> = {
  wk: '♔',
  wq: '♕',
  wr: '♖',
  wb: '♗',
  wn: '♘',
  wp: '♙',
  bk: '♚',
  bq: '♛',
  br: '♜',
  bb: '♝',
  bn: '♞',
  bp: '♟',
};

export function getPieceSymbol(type: string, color: string): string {
  const key = `${color === 'w' ? 'w' : 'b'}${type}`;
  return PIECE_SYMBOLS[key] || '';
}

/**
 * Parse PGN movelist for display.
 */
export function formatMovelist(chess: Chess): string[] {
  const history = chess.history();
  const result: string[] = [];
  let currentMoveNumber = 1;

  for (let i = 0; i < history.length; i++) {
    if (i % 2 === 0) {
      result.push(`${currentMoveNumber}. ${history[i]}`);
      if (i === history.length - 1) {
        currentMoveNumber++;
      }
    } else {
      result[result.length - 1] += ` ${history[i]}`;
      currentMoveNumber++;
    }
  }
  return result;
}
