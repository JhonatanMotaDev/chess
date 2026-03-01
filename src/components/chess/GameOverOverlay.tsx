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

  let title = '';
  let subtitle = '';

  if (gameStatus === 'checkmate') {
    const winner = chess.turn() === 'w' ? 'Black' : 'White';
    const isPlayerWinner =
      (winner === 'White' && playerColor === 'w') ||
      (winner === 'Black' && playerColor === 'b');
    title = isPlayerWinner ? 'You Won!' : 'You Lost';
    subtitle = `${winner} wins by checkmate`;
  } else if (gameStatus === 'stalemate') {
    title = 'Stalemate';
    subtitle = 'Draw - no legal moves';
  } else {
    title = 'Draw';
    subtitle =
      chess.isThreefoldRepetition()
        ? 'Draw by repetition'
        : chess.isInsufficientMaterial()
          ? 'Draw - insufficient material'
          : 'Draw';
  }

  const handleNewGame = () => {
    resetGame();
  };

  const handleGoHome = () => {
    router.back();
  };

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.7)' }]}
    >
      <Animated.View
        entering={ZoomIn.delay(150).springify()}
        style={[styles.content, { backgroundColor: colors.surface }]}
      >
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
        <View style={styles.buttons}>
          <Pressable
            onPress={() => router.push('/analysis')}
            style={({ pressed }) => [
              styles.button,
              { borderColor: colors.border, borderWidth: 2 },
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text style={[styles.buttonTextSecondary, { color: colors.text }]}>
              View Analysis
            </Text>
          </Pressable>
          <Pressable
            onPress={handleNewGame}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.primary },
              pressed && { opacity: 0.9 },
            ]}
          >
            <Text style={styles.buttonText}>Play Again</Text>
          </Pressable>
          <Pressable
            onPress={handleGoHome}
            style={({ pressed }) => [
              styles.button,
              { borderColor: colors.border, borderWidth: 2 },
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text style={[styles.buttonTextSecondary, { color: colors.text }]}>
              Home
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    padding: 32,
    borderRadius: 16,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  buttons: {
    width: '100%',
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    fontSize: 16,
    fontWeight: '600',
  },
});
