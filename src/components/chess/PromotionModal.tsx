import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { useGameStore } from '@/store/gameStore';

const PIECES = [
  { key: 'q' as const, symbol: '♕', label: 'Queen' },
  { key: 'r' as const, symbol: '♖', label: 'Rook' },
  { key: 'b' as const, symbol: '♗', label: 'Bishop' },
  { key: 'n' as const, symbol: '♘', label: 'Knight' },
];

export function PromotionModal() {
  const { colors } = useTheme();
  const pendingPromotion = useGameStore((s) => s.pendingPromotion);
  const promotePawn = useGameStore((s) => s.promotePawn);

  if (!pendingPromotion) return null;

  return (
    <Modal transparent visible animationType="fade">
      <Animated.View
        entering={FadeIn.duration(180)}
        style={styles.overlay}
      >
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.textSecondary }]}>
            PROMOTE PAWN
          </Text>
          <View style={styles.piecesRow}>
            {PIECES.map((p) => (
              <Pressable
                key={p.key}
                onPress={() => promotePawn(p.key)}
                style={({ pressed }) => [
                  styles.pieceBtn,
                  { backgroundColor: colors.border },
                  pressed && { opacity: 0.75, transform: [{ scale: 0.95 }] },
                ]}
              >
                <Text style={styles.pieceSymbol}>{p.symbol}</Text>
                <Text style={[styles.pieceLabel, { color: colors.textTertiary }]}>
                  {p.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    minWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  title: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  piecesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pieceBtn: {
    width: 64,
    height: 72,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  pieceSymbol: {
    fontSize: 34,
    color: '#f0ead8',
  },
  pieceLabel: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});