/**
 * Simplified opening book - common first moves to add variety.
 * In a production app, this could be loaded from a PGN or JSON file.
 */
export const OPENING_MOVES: Record<string, string[]> = {
  // Position FEN (simplified) -> possible moves in UCI format
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1': [
    'e2e4', // King's pawn
    'd2d4', // Queen's pawn
    'c2c4', // English
    'g1f3', // Reti
    'b1c3', // Van't Kruijs
  ],
  'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1': [
    'e7e5', // Open game
    'c7c5', // Sicilian
    'e7e6', // French
    'c7c6', // Caro-Kann
    'g8f6', // Indian
  ],
  'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1': [
    'g8f6',
    'd7d5',
    'e7e6',
    'c7c5',
  ],
};

const normalizeFen = (fen: string): string => {
  return fen.split(' ').slice(0, 4).join(' ');
};

/**
 * Get a random book move if position is in opening book.
 * Returns null if no book move available.
 */
export function getBookMove(fen: string): { from: string; to: string } | null {
  const normalized = normalizeFen(fen);
  const moves = OPENING_MOVES[normalized];
  if (!moves || moves.length === 0) return null;

  const uci = moves[Math.floor(Math.random() * moves.length)];
  return {
    from: uci.slice(0, 2),
    to: uci.slice(2, 4),
  };
}
