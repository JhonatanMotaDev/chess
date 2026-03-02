import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { useGameStore } from '@/store/gameStore';
import { useRouter } from 'expo-router';

export function GameOverOverlay() {
  const { colors } = useTheme();
  const router = useRouter();
  const gameStatus = useGameStore((s) => s.gameStatus);
  const chess = useGameStore((s) => s.chess);
  const playerColor = useGameStore((s) => s.playerColor);
  const resetGame = useGameStore((s) => s.resetGame);

  if (
    gameStatus !== 'checkmate' &&
    gameStatus !== 'stalemate' &&
    gameStatus !== 'draw'
  ) {
    return null;
  }

  let emoji = '';
  let title = '';
  let subtitle = '';
  let isWin = false;

  if (gameStatus === 'checkmate') {
    const winner = chess.turn() === 'w' ? 'Black' : 'White';
    isWin =
      (winner === 'White' && playerColor === 'w') ||
      (winner === 'Black' && playerColor === 'b');
    emoji = isWin ? '🏆' : '😔';
    title = isWin ? 'You Won!' : 'You Lost';
    subtitle = `${winner} wins by checkmate`;
  } else if (gameStatus === 'stalemate') {
    emoji = '🤝';
    title = 'Stalemate';
    subtitle = 'No legal moves remaining';
  } else {
    emoji = '🤝';
    title = 'Draw';
    subtitle = chess.isThreefoldRepetition()
      ? 'Draw by repetition'
      : chess.isInsufficientMaterial()
        ? 'Insufficient material'
        : 'Game drawn';
  }

  return (
    <Animated.View
      entering={FadeIn.duration(250)}
      style={styles.overlay}
    >
      <Animated.View
        entering={ZoomIn.delay(120).springify()}
        style={[styles.card, { backgroundColor: colors.surface }]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Pressable
          onPress={resetGame}
          style={({ pressed }) => [
            styles.primaryBtn,
            { backgroundColor: colors.primary },
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.primaryBtnText}>New Game</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/analysis')}
          style={({ pressed }) => [
            styles.secondaryBtn,
            { backgroundColor: colors.border },
            pressed && { opacity: 0.75 },
          ]}
        >
          <Text style={[styles.secondaryBtnText, { color: colors.text }]}>
            View Analysis
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [pressed && { opacity: 0.7 }]}
        >
          <Text style={[styles.linkText, { color: colors.textTertiary }]}>
            Back to Home
          </Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 14,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    marginBottom: 20,
  },
  primaryBtn: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 14,
  },
  secondaryBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 13,
    fontWeight: '500',
  },
});