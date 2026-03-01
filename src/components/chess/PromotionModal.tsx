import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
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
  const playerColor = useGameStore((s) => s.playerColor);

  if (!pendingPromotion) return null;

  const handleSelect = (piece: 'q' | 'r' | 'b' | 'n') => {
    promotePawn(piece);
  };

  return (
    <Modal transparent visible animationType="fade">
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={[styles.overlay, { backgroundColor: colors.promotion }]}
      >
        <Animated.View
          entering={FadeIn.delay(100).springify()}
          style={[styles.content, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            Promote pawn to
          </Text>
          <View style={styles.piecesRow}>
            {PIECES.map((p) => (
              <Pressable
                key={p.key}
                onPress={() => handleSelect(p.key)}
                style={({ pressed }) => [
                  styles.pieceButton,
                  { borderColor: colors.border },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text style={styles.pieceSymbol}>{p.symbol}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    padding: 24,
    borderRadius: 16,
    minWidth: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  piecesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pieceButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieceSymbol: {
    fontSize: 32,
  },
});
