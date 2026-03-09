import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, { FadeIn, ZoomIn, FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { useGameStore } from '@/store/gameStore';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

const { width } = Dimensions.get('window');

type IconName = ComponentProps<typeof Ionicons>['name'];

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

  let emoji: IconName = 'help-circle-outline';
  let title = '';
  let subtitle = '';
  let isWin = false;

  if (gameStatus === 'checkmate') {
    const winner = chess.turn() === 'w' ? 'Black' : 'White';
    isWin =
      (winner === 'White' && playerColor === 'w') ||
      (winner === 'Black' && playerColor === 'b');
    emoji = isWin ? 'trophy' : 'sad-outline';
    title = isWin ? 'Vitória!' : 'Fim de Jogo';
    subtitle = `O jogador de ${winner === 'White' ? 'brancas' : 'pretas'} venceu por xeque-mate.`;
  } else if (gameStatus === 'stalemate') {
    emoji = 'git-commit-outline';
    title = 'Afogamento';
    subtitle = 'Não há lances legais restantes. Empate.';
  } else {
    emoji = 'hand-left-outline';
    title = 'Empate';
    subtitle = chess.isThreefoldRepetition()
      ? 'Repetição de três posições.'
      : chess.isInsufficientMaterial()
        ? 'Material insuficiente para mate.'
        : 'A partida terminou empatada.';
  }

  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.85)' }]}
    >
      <Animated.View
        entering={ZoomIn.duration(500).springify().damping(15)}
        style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <View style={[styles.iconContainer, { backgroundColor: isWin ? '#FFD70020' : colors.border }]}>
          <Ionicons name={emoji} size={44} color={isWin ? '#FFD700' : colors.primary} />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>

        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.buttonContainer}>
          <Pressable
            onPress={resetGame}
            style={({ pressed }) => [
              styles.primaryBtn,
              { backgroundColor: colors.primary },
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
          >
            <Ionicons name="refresh" size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.primaryBtnText}>Nova Partida</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/analysis')}
            style={({ pressed }) => [
              styles.secondaryBtn,
              { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
              pressed && { backgroundColor: colors.border },
            ]}
          >
            <Ionicons name="analytics" size={20} color={colors.text} style={{ marginRight: 8 }} />
            <Text style={[styles.secondaryBtnText, { color: colors.text }]}>
              Analisar Jogo
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.linkBtn, pressed && { opacity: 0.5 }]}
          >
            <Text style={[styles.linkText, { color: colors.textTertiary }]}>
              Voltar ao Início
            </Text>
          </Pressable>
        </Animated.View>
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
    zIndex: 1000,
  },
  card: {
    width: width * 0.85,
    maxWidth: 340,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
  },
  primaryBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkBtn: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});