import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useTheme } from '@/theme';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { formatMovelist, PIECE_SYMBOLS } from '@/utils/chessUtils';

function GamePanelComponent() {
  const { colors } = useTheme();
  const chess = useGameStore((s) => s.chess);
  const playerColor = useGameStore((s) => s.playerColor);
  const capturedPieces = useGameStore((s) => s.capturedPieces);
  const isEngineThinking = useGameStore((s) => s.isEngineThinking);
  const flipBoard = useGameStore((s) => s.flipBoard);
  const undoMove = useGameStore((s) => s.undoMove);
  const resetGame = useGameStore((s) => s.resetGame);
  const { playerElo, engineElo } = useSettingsStore();
  const difficulty = useGameStore((s) => s.difficulty);
  const undoEnabled = useSettingsStore((s) => s.undoEnabled);

  const moveList = formatMovelist(chess);
  const opponentColor = playerColor === 'w' ? 'b' : 'w';
  const capturedByPlayer = capturedPieces[opponentColor];
  const capturedByEngine = capturedPieces[playerColor];

  const getPieceSymbol = (piece: string, color: 'w' | 'b') => {
    const key = `${color}${piece}`;
    return PIECE_SYMBOLS[key] || piece;
  };

  const PlayerRow = ({
    label,
    rating,
    color,
    captured,
    capturedColor,
    isThinking,
  }: {
    label: string;
    rating: string | number;
    color: 'w' | 'b';
    captured: string[];
    capturedColor: 'w' | 'b';
    isThinking?: boolean;
  }) => (
    <View style={[styles.playerRow, { borderBottomColor: colors.border }]}>
      <View
        style={[
          styles.avatar,
          {
            backgroundColor: color === 'w' ? '#e8e0d0' : '#2a2520',
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={{ fontSize: 16 }}>{color === 'w' ? '♔' : '♚'}</Text>
      </View>
      <View style={styles.playerMeta}>
        <View style={styles.playerNameRow}>
          <Text style={[styles.playerName, { color: colors.text }]}>{label}</Text>
          <Text style={[styles.playerRating, { color: colors.textTertiary }]}>
            ({rating})
          </Text>
          {isThinking && (
            <View style={[styles.thinkingDot, { backgroundColor: colors.primary }]} />
          )}
        </View>
        <Text style={[styles.capturedPieces, { color: colors.textSecondary }]}>
          {captured.length > 0
            ? captured.map((p, i) => getPieceSymbol(p, capturedColor)).join('')
            : ''}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>

      {/* Engine player (top) */}
      <PlayerRow
        label="Computer"
        rating={engineElo[difficulty]}
        color={opponentColor}
        captured={capturedByEngine}
        capturedColor={playerColor}
        isThinking={isEngineThinking}
      />

      {/* Move list */}
      <View style={[styles.movesSection, { borderBottomColor: colors.border }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.movesScroll}
          contentContainerStyle={styles.movesContent}
        >
          {moveList.length > 0 ? (
            moveList.map((move, i) => (
              <View
                key={i}
                style={[
                  styles.moveChip,
                  i % 2 === 0 && styles.moveChipWhite,
                  { borderColor: colors.border },
                ]}
              >
                <Text style={[styles.moveNumber, { color: colors.textTertiary }]}>
                  {i % 2 === 0 ? `${Math.floor(i / 2) + 1}.` : ''}
                </Text>
                <Text style={[styles.moveText, { color: colors.text }]}>{move}</Text>
              </View>
            ))
          ) : (
            <Text style={[styles.noMoves, { color: colors.textTertiary }]}>
              Game not started
            </Text>
          )}
        </ScrollView>
      </View>

      {/* Human player (bottom) */}
      <PlayerRow
        label="You"
        rating={playerElo}
        color={playerColor}
        captured={capturedByPlayer}
        capturedColor={opponentColor}
      />

      {/* Action buttons */}
      <View style={[styles.actions, { borderTopColor: colors.border }]}>
        <Pressable
          onPress={flipBoard}
          style={({ pressed }) => [
            styles.iconBtn,
            { backgroundColor: colors.border },
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={[styles.iconBtnText, { color: colors.textSecondary }]}>⟳</Text>
        </Pressable>

        {undoEnabled && (
          <Pressable
            onPress={undoMove}
            style={({ pressed }) => [
              styles.iconBtn,
              { backgroundColor: colors.border },
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text style={[styles.iconBtnText, { color: colors.textSecondary }]}>↩</Text>
          </Pressable>
        )}

        <Pressable
          onPress={resetGame}
          style={({ pressed }) => [
            styles.newGameBtn,
            { backgroundColor: colors.primary },
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.newGameText}>New Game</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const GamePanel = memo(GamePanelComponent);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerMeta: {
    flex: 1,
  },
  playerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  playerName: {
    fontSize: 15,
    fontWeight: '600',
  },
  playerRating: {
    fontSize: 13,
  },
  thinkingDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    marginLeft: 4,
    opacity: 0.9,
  },
  capturedPieces: {
    fontSize: 14,
    marginTop: 2,
    letterSpacing: 1,
  },
  movesSection: {
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  movesScroll: {
    maxHeight: 44,
  },
  movesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 2,
  },
  moveChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 2,
  },
  moveChipWhite: {},
  moveNumber: {
    fontSize: 12,
  },
  moveText: {
    fontSize: 13,
    fontWeight: '500',
  },
  noMoves: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnText: {
    fontSize: 18,
    fontWeight: '600',
  },
  newGameBtn: {
    flex: 1,
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newGameText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});