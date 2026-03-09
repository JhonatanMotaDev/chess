export const OPENING_MOVES: Record<string, string[]> = {
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1': [
    'e2e4',
    'd2d4',
    'c2c4',
    'g1f3',
    'b1c3',
  ],
  'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1': [
    'e7e5',
    'c7c5',
    'e7e6',
    'c7c6',
    'g8f6',
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
