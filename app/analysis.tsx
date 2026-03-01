import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/theme';
import { useGameStore } from '@/store/gameStore';

export default function AnalysisScreen() {
  const { colors } = useTheme();
  const chess = useGameStore((s) => s.chess);
  const moveHistory = useGameStore((s) => s.moveHistory);
  const playerColor = useGameStore((s) => s.playerColor);

  // Simplified accuracy - in full implementation would use engine analysis
  const accuracy = 85; // Placeholder

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>Game Analysis</Text>
        <View style={[styles.statRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Accuracy
          </Text>
          <Text style={[styles.value, { color: colors.primary }]}>{accuracy}%</Text>
        </View>
        <View style={[styles.statRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Total Moves
          </Text>
          <Text style={[styles.value, { color: colors.text }]}>
            {moveHistory.length}
          </Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Move List (PGN)
        </Text>
        <Text style={[styles.pgn, { color: colors.textSecondary }]}>
          {chess.pgn() || 'No moves yet'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
  },
  pgn: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'monospace',
  },
});
