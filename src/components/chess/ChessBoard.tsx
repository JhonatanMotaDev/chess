import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ChessSquare } from './ChessSquare';
import { ChessPiece } from './ChessPiece';
import { getBoardSquares } from '@/utils/chessUtils';
import { useGameStore } from '@/store/gameStore';
import { useTheme } from '@/theme';
import type { Square } from '@/types/chess';

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

function ChessBoardComponent() {
  const { colors } = useTheme();
  const boardFlipped = useGameStore((s) => s.boardFlipped);
  const chess = useGameStore((s) => s.chess);
  const selectedSquare = useGameStore((s) => s.selectedSquare);
  const legalMoves = useGameStore((s) => s.legalMoves);
  const lastMove = useGameStore((s) => s.lastMove);
  const selectSquare = useGameStore((s) => s.selectSquare);

  const squares = getBoardSquares(boardFlipped);
  const boardSize = Dimensions.get('window').width - 4;

  const fileOrder = boardFlipped ? [...FILES].reverse() : FILES;
  const rankOrder = boardFlipped ? [...RANKS].reverse() : RANKS;

  const handleSquarePress = useCallback(
    (square: Square) => selectSquare(square),
    [selectSquare]
  );

  return (
    <View
      style={[
        styles.board,
        {
          width: boardSize,
          height: boardSize,
          borderColor: colors.border,
        },
      ]}
    >
      {squares.map((square) => {
        const file = square[0];
        const rank = square[1];
        const fileIdx = fileOrder.indexOf(file);
        const rankIdx = rankOrder.indexOf(rank);
        const isLight = (file.charCodeAt(0) - 97 + parseInt(rank, 10)) % 2 === 1;
        const piece = chess.get(square);
        const isSelected = selectedSquare === square;
        const isHighlighted = legalMoves.includes(square);
        const isLastMove = lastMove?.from === square || lastMove?.to === square;
        const isCheck =
          piece?.type === 'k' &&
          chess.inCheck() &&
          piece.color === chess.turn();

        const showRank = fileIdx === 0;
        const showFile = rankIdx === 7;
        const coordColor = isLight ? colors.boardDark : colors.boardLight;

        return (
          <View key={square} style={styles.squareWrapper}>
            <ChessSquare
              square={square}
              isLight={isLight}
              isSelected={isSelected}
              isHighlighted={isHighlighted}
              isLastMove={isLastMove}
              isCheck={isCheck}
              hasPiece={!!piece}
              onPress={() => handleSquarePress(square)}
            />

            {showRank && (
              <Text
                style={[styles.coordRank, { color: coordColor }]}
                pointerEvents="none"
              >
                {rank}
              </Text>
            )}

            {showFile && (
              <Text
                style={[styles.coordFile, { color: coordColor }]}
                pointerEvents="none"
              >
                {file}
              </Text>
            )}

            {piece && (
              <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <View style={styles.pieceContainer}>
                  <ChessPiece piece={piece.type} color={piece.color} />
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

export const ChessBoard = memo(ChessBoardComponent);

const styles = StyleSheet.create({
  board: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  squareWrapper: {
    width: '12.5%',
    aspectRatio: 1,
  },
  pieceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coordRank: {
    position: 'absolute',
    top: 2,
    left: 3,
    fontSize: 10,
    fontWeight: '700',
    opacity: 0.9,
  },
  coordFile: {
    position: 'absolute',
    bottom: 2,
    right: 3,
    fontSize: 10,
    fontWeight: '700',
    opacity: 0.9,
  },
});