import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChessBoard } from '@/components/chess/ChessBoard';
import { GamePanel } from '@/components/chess/GamePanel';
import { PromotionModal } from '@/components/chess/PromotionModal';
import { GameOverOverlay } from '@/components/chess/GameOverOverlay';
import { useTheme } from '@/theme';
import { useGameStore } from '@/store/gameStore';

export default function GameScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const initGame = useGameStore((s) => s.initGame);
  const chess = useGameStore((s) => s.chess);
  const playerColor = useGameStore((s) => s.playerColor);
  const difficulty = useGameStore((s) => s.difficulty);

  useEffect(() => {
    if (chess.fen().includes('8/8/8/8/8/8/8/8')) {
      initGame('w', 'intermediate');
    }
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.primary }]}>Menu</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Player vs Computer ({difficulty})
        </Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ChessBoard />
        <GamePanel />
      </ScrollView>

      <PromotionModal />
      <GameOverOverlay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    paddingVertical: 16,
    paddingBottom: 32,
  },
});
