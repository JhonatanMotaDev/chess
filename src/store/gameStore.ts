import { create } from 'zustand';
import { Chess } from 'chess.js';
import type { Difficulty } from './settingsStore';
import type { Square } from '@/types/chess';
import { getEngineMove, getBookMove } from '@/engine';

export type GameStatus = 'playing' | 'checkmate' | 'stalemate' | 'draw' | 'promoting';

export interface GameState {
  chess: Chess;
  playerColor: 'w' | 'b';
  difficulty: Difficulty;
  boardFlipped: boolean;
  selectedSquare: Square | null;
  lastMove: { from: Square; to: Square } | null;
  legalMoves: Square[];
  capturedPieces: { w: string[]; b: string[] };
  gameStatus: GameStatus;
  pendingPromotion: { from: Square; to: Square } | null;
  isEngineThinking: boolean;
  moveHistory: string[];

  // Actions
  initGame: (playerColor: 'w' | 'b', difficulty: Difficulty) => void;
  selectSquare: (square: Square) => void;
  makeMove: (from: Square, to: Square, promotion?: 'q' | 'r' | 'b' | 'n') => void;
  makeEngineMove: () => Promise<void>;
  flipBoard: () => void;
  promotePawn: (piece: 'q' | 'r' | 'b' | 'n') => void;
  undoMove: () => void;
  resetGame: () => void;
}

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const useGameStore = create<GameState>((set, get) => ({
  chess: new Chess(),
  playerColor: 'w',
  difficulty: 'intermediate',
  boardFlipped: false,
  selectedSquare: null,
  lastMove: null,
  legalMoves: [],
  capturedPieces: { w: [], b: [] },
  gameStatus: 'playing',
  pendingPromotion: null,
  isEngineThinking: false,
  moveHistory: [],

  initGame: (playerColor, difficulty) => {
    const chess = new Chess(INITIAL_FEN);
    set({
      chess,
      playerColor,
      difficulty,
      selectedSquare: null,
      lastMove: null,
      legalMoves: [],
      capturedPieces: { w: [], b: [] },
      gameStatus: 'playing',
      pendingPromotion: null,
      isEngineThinking: false,
      moveHistory: [],
    });

    // If player is black, engine moves first
    if (playerColor === 'b') {
      setTimeout(() => get().makeEngineMove(), 500);
    }
  },

  selectSquare: (square) => {
    const { chess, playerColor, gameStatus } = get();
    if (gameStatus !== 'playing') return;
    if (chess.turn() !== playerColor) return;

    const piece = chess.get(square);
    const { selectedSquare, legalMoves } = get();

    // If clicking same square, deselect
    if (selectedSquare === square) {
      set({ selectedSquare: null, legalMoves: [] });
      return;
    }

    // If clicking a legal move target
    if (legalMoves.includes(square) && selectedSquare) {
      const pieceToMove = chess.get(selectedSquare);
      const isPromotion =
        pieceToMove?.type === 'p' &&
        (square[1] === '8' || square[1] === '1');
    
      if (isPromotion) {
        set({
          pendingPromotion: { from: selectedSquare, to: square },
          selectedSquare: null,
          legalMoves: [],
        });
        return;
      }
    
      // ❗ DO NOT call chess.move here
      get().makeMove(selectedSquare, square);
      return;
    }

    // If clicking own piece, select it
    if (piece && piece.color === playerColor) {
      const moves = chess.moves({ square, verbose: true });
      set({
        selectedSquare: square,
        legalMoves: moves.map((m) => m.to as Square),
      });
    } else {
      set({ selectedSquare: null, legalMoves: [] });
    }
  },

  makeMove: (from, to, promotion) => {
    const { chess, playerColor, difficulty, capturedPieces } = get();
  
    const piece = chess.get(from);
    const isPromotion =
      piece?.type === 'p' &&
      ((piece.color === 'w' && to[1] === '8') ||
       (piece.color === 'b' && to[1] === '1'));
  
    const move = chess.move({
      from,
      to,
      ...(isPromotion && promotion ? { promotion } : {}),
    });
  
    if (!move) return false;
  
    const newCaptured = { ...capturedPieces };
    if (move.captured) {
      newCaptured[move.color === 'w' ? 'b' : 'w'].push(move.captured);
    }
  
    let gameStatus: GameStatus = 'playing';
    if (chess.isCheckmate()) gameStatus = 'checkmate';
    else if (chess.isStalemate()) gameStatus = 'stalemate';
    else if (chess.isDraw()) gameStatus = 'draw';
  
    set({
      chess: new Chess(chess.fen()),
      selectedSquare: null,
      legalMoves: [],
      lastMove: { from, to },
      capturedPieces: newCaptured,
      gameStatus,
      moveHistory: chess.history(),
    });
  
    if (gameStatus === 'playing' && chess.turn() !== playerColor) {
      setTimeout(() => get().makeEngineMove(), 300);
    }
  
    return true;
  },

  makeEngineMove: async () => {
    const { chess, playerColor, difficulty } = get();
    if (chess.turn() === playerColor) return;
    if (chess.isGameOver()) return;

    set({ isEngineThinking: true });

    try {
      // Check opening book first (only for first few moves)
      const moveCount = chess.history().length;
      let moveResult: { from: string; to: string; delayMs?: number } | null = null;

      if (moveCount < 6) {
        const bookMove = getBookMove(chess.fen());
        if (bookMove) {
          moveResult = {
            ...bookMove,
            delayMs: 500 + Math.random() * 1000,
          };
        }
      }

      if (!moveResult) {
        const result = getEngineMove(chess.fen(), difficulty);
        moveResult = {
          from: result.move.from,
          to: result.move.to,
          delayMs: result.delayMs,
        };
      }

      // Simulate thinking delay
      await new Promise((r) => setTimeout(r, moveResult.delayMs || 1000));

      const chessInstance = get().chess;
      const move = chessInstance.move({
        from: moveResult.from as Square,
        to: moveResult.to as Square,
      });

      if (move) {
        const { capturedPieces } = get();
        const newCaptured = { ...capturedPieces };
        if (move.captured) {
          const cap = move.captured;
          newCaptured[move.color === 'w' ? 'b' : 'w'].push(cap);
        }

        let gameStatus: GameStatus = 'playing';
        if (chessInstance.isCheckmate()) gameStatus = 'checkmate';
        else if (chessInstance.isStalemate()) gameStatus = 'stalemate';
        else if (chessInstance.isDraw()) gameStatus = 'draw';

        set({
          chess: new Chess(chessInstance.fen()),
          lastMove: {
            from: moveResult.from as Square,
            to: moveResult.to as Square,
          },
          capturedPieces: newCaptured,
          gameStatus,
          moveHistory: chessInstance.history(),
        });
      }
    } finally {
      set({ isEngineThinking: false });
    }
  },

  flipBoard: () => {
    set((s) => ({ boardFlipped: !s.boardFlipped }));
  },

  promotePawn: (piece) => {
    const { pendingPromotion } = get();
    if (!pendingPromotion) return;
    get().makeMove(pendingPromotion.from, pendingPromotion.to, piece);
    set({ pendingPromotion: null });
  },

  undoMove: () => {
    const { chess, playerColor, moveHistory } = get();
    if (moveHistory.length === 0) return;

    // Undo last two moves (player + engine) if it's player's turn
    const chessCopy = new Chess(chess.fen());
    const undos = chess.turn() === playerColor ? 2 : 1;

    for (let i = 0; i < undos; i++) {
      const undone = chessCopy.undo();
      if (!undone) break;
    }

    set({
      chess: chessCopy,
      selectedSquare: null,
      legalMoves: [],
      lastMove: null,
      gameStatus: 'playing',
      moveHistory: chessCopy.history(),
    });
  },

  resetGame: () => {
    get().initGame(get().playerColor, get().difficulty);
  },
}));
