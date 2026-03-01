import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import type { Difficulty } from '@/store/settingsStore';

const DIFFICULTIES: { key: Difficulty; label: string; elo: string }[] = [
  { key: 'beginner', label: 'Beginner', elo: '~800' },
  { key: 'intermediate', label: 'Intermediate', elo: '~1200' },
  { key: 'advanced', label: 'Advanced', elo: '~1600' },
  { key: 'master', label: 'Master', elo: '~2200' },
];

export default function DifficultyScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { engineElo } = useSettingsStore();
  const initGame = useGameStore((s) => s.initGame);

  const [selectedDifficulty, setSelectedDifficulty] =
    React.useState<Difficulty>('intermediate');
  const [selectedColor, setSelectedColor] = React.useState<'w' | 'b'>('w');

  const handleStart = () => {
    initGame(selectedColor, selectedDifficulty);
    router.replace('/game/play');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Choose Difficulty
          </Text>
          {DIFFICULTIES.map((d, i) => (
            <Animated.View
              key={d.key}
              entering={FadeInDown.delay(150 + i * 50).springify()}
            >
              <Pressable
                onPress={() => setSelectedDifficulty(d.key)}
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      selectedDifficulty === d.key
                        ? colors.primary
                        : colors.surface,
                    borderColor:
                      selectedDifficulty === d.key
                        ? colors.primary
                        : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color:
                        selectedDifficulty === d.key ? '#fff' : colors.text,
                    },
                  ]}
                >
                  {d.label}
                </Text>
                <Text
                  style={[
                    styles.optionSubtext,
                    {
                      color:
                        selectedDifficulty === d.key
                          ? 'rgba(255,255,255,0.8)'
                          : colors.textSecondary,
                    },
                  ]}
                >
                  Engine: {engineElo[d.key]} ELO
                </Text>
              </Pressable>
            </Animated.View>
          ))}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Play as
          </Text>
          <View style={styles.colorRow}>
            <Pressable
              onPress={() => setSelectedColor('w')}
              style={[
                styles.colorButton,
                {
                  backgroundColor:
                    selectedColor === 'w' ? colors.primary : colors.surface,
                  borderColor:
                    selectedColor === 'w' ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={styles.pieceSymbol}>♔</Text>
              <Text
                style={[
                  styles.colorButtonText,
                  { color: selectedColor === 'w' ? '#fff' : colors.text },
                ]}
              >
                White
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedColor('b')}
              style={[
                styles.colorButton,
                {
                  backgroundColor:
                    selectedColor === 'b' ? colors.primary : colors.surface,
                  borderColor:
                    selectedColor === 'b' ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={styles.pieceSymbol}>♚</Text>
              <Text
                style={[
                  styles.colorButtonText,
                  { color: selectedColor === 'b' ? '#fff' : colors.text },
                ]}
              >
                Black
              </Text>
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <Pressable
            onPress={handleStart}
            style={({ pressed }) => [
              styles.startButton,
              { backgroundColor: colors.primary },
              pressed && styles.startButtonPressed,
            ]}
          >
            <Text style={styles.startButtonText}>Start Game</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 48,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  option: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionSubtext: {
    fontSize: 12,
    marginTop: 4,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 16,
  },
  colorButton: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  pieceSymbol: {
    fontSize: 32,
    marginBottom: 8,
  },
  colorButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  startButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  startButtonPressed: {
    opacity: 0.9,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
