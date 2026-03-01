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
  const boardSize = Dimensions.get('window').width - 32;
  const squareSize = boardSize / 8;
  const coordSize = 16;
  const totalSize = boardSize + coordSize;

  const fileOrder = boardFlipped ? [...FILES].reverse() : FILES;
  const rankOrder = boardFlipped ? [...RANKS].reverse() : RANKS;

  const handleSquarePress = useCallback(
    (square: Square) => {
      selectSquare(square);
    },
    [selectSquare]
  );

  return (
    <View style={styles.container}>
      <View style={[styles.coordRow, { width: totalSize }]}>
        <View style={[styles.rankCoord, { width: coordSize }]} />
        {fileOrder.map((f) => (
          <View key={f} style={[styles.fileCoord, { width: squareSize }]}>
            <Text style={[styles.coordText, { color: colors.textTertiary }]}>{f}</Text>
          </View>
        ))}
      </View>
      <View style={styles.boardRow}>
        <View style={[styles.rankCoords, { width: coordSize, height: boardSize }]}>
          {rankOrder.map((r) => (
            <View key={r} style={[styles.rankCoordItem, { height: squareSize }]}>
              <Text style={[styles.coordText, { color: colors.textTertiary }]}>{r}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.board, { width: boardSize, height: boardSize }]}>
          {squares.map((square) => {
        const file = square[0];
        const rank = square[1];
        const isLight =
          (file.charCodeAt(0) - 97 + parseInt(rank, 10)) % 2 === 1;
        const piece = chess.get(square);
        const isSelected = selectedSquare === square;
        const isHighlighted = legalMoves.includes(square);
        const isLastMove =
          lastMove?.from === square || lastMove?.to === square;
        const isCheck =
          piece?.type === 'k' &&
          chess.inCheck() &&
          piece.color === chess.turn();

        return (
          <View key={square} style={styles.squareWrapper}>
            <ChessSquare
              square={square}
              isLight={isLight}
              isSelected={isSelected}
              isHighlighted={isHighlighted}
              isLastMove={isLastMove}
              isCheck={isCheck}
              onPress={() => handleSquarePress(square)}
            />
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
      </View>
    </View>
  );
}

export const ChessBoard = memo(ChessBoardComponent);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  coordRow: {
    flexDirection: 'row',
    paddingLeft: 16,
    marginBottom: 2,
  },
  rankCoord: {},
  fileCoord: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardRow: {
    flexDirection: 'row',
  },
  rankCoords: {
    justifyContent: 'space-around',
    paddingTop: 2,
  },
  rankCoordItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coordText: {
    fontSize: 11,
    fontWeight: '500',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
});
