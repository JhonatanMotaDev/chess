import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useTheme } from '@/theme';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { formatMovelist } from '@/utils/chessUtils';
import { PIECE_SYMBOLS } from '@/utils/chessUtils';

function GamePanelComponent() {
  const { colors } = useTheme();
  const chess = useGameStore((s) => s.chess);
  const playerColor = useGameStore((s) => s.playerColor);
  const capturedPieces = useGameStore((s) => s.capturedPieces);
  const isEngineThinking = useGameStore((s) => s.isEngineThinking);
  const flipBoard = useGameStore((s) => s.flipBoard);
  const undoMove = useGameStore((s) => s.undoMove);
  const resetGame = useGameStore((s) => s.resetGame);
  const gameStatus = useGameStore((s) => s.gameStatus);
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

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.playersRow, { borderBottomColor: colors.border }]}>
        <View style={styles.playerInfo}>
          <View style={[styles.playerIndicator, { backgroundColor: colors.primary }]} />
          <Text style={[styles.playerName, { color: colors.text }]}>You</Text>
          <Text style={[styles.rating, { color: colors.textTertiary }]}>{playerElo}</Text>
        </View>
        {isEngineThinking && (
          <Text style={[styles.thinking, { color: colors.primary }]}>
            Thinking...
          </Text>
        )}
        <View style={styles.playerInfo}>
          <View style={[styles.playerIndicator, { backgroundColor: colors.textTertiary }]} />
          <Text style={[styles.playerName, { color: colors.text }]}>Computer</Text>
          <Text style={[styles.rating, { color: colors.textTertiary }]}>
            {engineElo[difficulty]}
          </Text>
        </View>
      </View>

      <View style={[styles.capturedRow, { borderBottomColor: colors.border }]}>
        <View style={styles.capturedSection}>
          <Text style={[styles.capturedLabel, { color: colors.textSecondary }]}>
            You captured:
          </Text>
          <Text style={styles.capturedPieces}>
            {capturedByPlayer.map((p, i) => (
              <Text key={i}>{getPieceSymbol(p, opponentColor)}</Text>
            ))}
            {capturedByPlayer.length === 0 && (
              <Text style={{ color: colors.textTertiary }}>—</Text>
            )}
          </Text>
        </View>
        <View style={styles.capturedSection}>
          <Text style={[styles.capturedLabel, { color: colors.textSecondary }]}>
            Computer captured:
          </Text>
          <Text style={styles.capturedPieces}>
            {capturedByEngine.map((p, i) => (
              <Text key={i}>{getPieceSymbol(p, playerColor)}</Text>
            ))}
            {capturedByEngine.length === 0 && (
              <Text style={{ color: colors.textTertiary }}>—</Text>
            )}
          </Text>
        </View>
      </View>

      <View style={styles.movesSection}>
        <Text style={[styles.movesTitle, { color: colors.text }]}>Moves</Text>
        <ScrollView
          style={styles.movesScroll}
          contentContainerStyle={styles.movesContent}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {moveList.map((move, i) => (
            <Text
              key={i}
              style={[styles.moveItem, { color: colors.text }]}
            >
              {move}{' '}
            </Text>
          ))}
          {moveList.length === 0 && (
            <Text style={[styles.moveItem, { color: colors.textTertiary }]}>
              —
            </Text>
          )}
        </ScrollView>
      </View>

      <View style={[styles.actionsRow, { borderTopColor: colors.border }]}>
        <Pressable
          onPress={flipBoard}
          style={({ pressed }) => [
            styles.actionButton,
            { borderColor: colors.border },
            pressed && { opacity: 0.8 },
          ]}
        >
          <Text style={[styles.actionText, { color: colors.text }]}>Flip</Text>
        </Pressable>
        {undoEnabled && (
          <Pressable
            onPress={undoMove}
            style={({ pressed }) => [
              styles.actionButton,
              { borderColor: colors.border },
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text style={[styles.actionText, { color: colors.text }]}>Undo</Text>
          </Pressable>
        )}
        <Pressable
          onPress={resetGame}
          style={({ pressed }) => [
            styles.actionButton,
            { backgroundColor: colors.primary },
            pressed && { opacity: 0.9 },
          ]}
        >
          <Text style={[styles.actionText, { color: '#fff' }]}>New Game</Text>
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
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  playersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  playerInfo: {
    alignItems: 'center',
    flex: 1,
  },
  playerIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
  },
  rating: {
    fontSize: 12,
    marginTop: 2,
  },
  thinking: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  capturedRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderBottomWidth: 1,
  },
  capturedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  capturedLabel: {
    fontSize: 12,
  },
  capturedPieces: {
    fontSize: 16,
  },
  movesSection: {
    padding: 12,
  },
  movesTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  movesScroll: {
    maxHeight: 60,
  },
  movesContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moveItem: {
    fontSize: 13,
    marginRight: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    borderTopWidth: 1,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
