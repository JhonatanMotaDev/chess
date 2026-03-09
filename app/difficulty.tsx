import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight, LinearTransition } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/theme';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import type { Difficulty } from '@/store/settingsStore';

import WhiteKing from '../assets/pieces/wk.png';
import BlackKing from '../assets/pieces/bk.png';

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

  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Difficulty>('intermediate');
  const [selectedColor, setSelectedColor] = React.useState<'w' | 'b'>('w');

  const handleSelectDifficulty = (key: Difficulty) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDifficulty(key);
  };

  const handleSelectColor = (color: 'w' | 'b') => {
    Haptics.selectionAsync();
    setSelectedColor(color);
  };

  const handleStart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    initGame(selectedColor, selectedDifficulty);
    router.replace('/game/play');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Novo Jogo</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Escolha o nível do desafio
        </Text>
      </Animated.View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Dificuldade</Text>
        {DIFFICULTIES.map((d, i) => {
          const isSelected = selectedDifficulty === d.key;
          return (
            <Animated.View key={d.key} entering={FadeInRight.delay(150 + i * 50)} layout={LinearTransition.springify()}>
              <Pressable
                onPress={() => handleSelectDifficulty(d.key)}
                style={({ pressed }) => [
                  styles.option,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.surface,
                    borderColor: isSelected ? colors.primary : colors.border,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
              >
                <View>
                  <Text style={[styles.optionText, { color: isSelected ? '#fff' : colors.text }]}>{d.label}</Text>
                  <Text style={[styles.optionSubtext, { color: isSelected ? 'rgba(255,255,255,0.7)' : colors.textSecondary }]}>
                    ELO {engineElo[d.key]}
                  </Text>
                </View>
                {isSelected && <Text style={styles.checkIcon}>✓</Text>}
              </Pressable>
            </Animated.View>
          );
        })}
      </View>

          <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Jogar de</Text>
        <View style={styles.colorRow}>
          <Pressable
            onPress={() => handleSelectColor('w')}
            style={[
              styles.colorButton,
              {
                backgroundColor: selectedColor === 'w' ? colors.primary : colors.surface,
                borderColor: selectedColor === 'w' ? colors.primary : colors.border,
              },
            ]}
          >
            <Image source={WhiteKing} style={styles.pieceImage} resizeMode="contain" />
            <Text style={[styles.colorButtonText, { color: selectedColor === 'w' ? '#fff' : colors.text }]}>Brancas</Text>
          </Pressable>

          <Pressable
            onPress={() => handleSelectColor('b')}
            style={[
              styles.colorButton,
              {
                backgroundColor: selectedColor === 'b' ? colors.primary : colors.surface,
                borderColor: selectedColor === 'b' ? colors.primary : colors.border,
              },
            ]}
          >
            <Image source={BlackKing} style={styles.pieceImage} resizeMode="contain" />
            <Text style={[styles.colorButtonText, { color: selectedColor === 'b' ? '#fff' : colors.text }]}>Pretas</Text>
          </Pressable>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(500)} style={styles.footer}>
        <Pressable
          onPress={handleStart}
          style={({ pressed }) => [
            styles.startButton,
            { backgroundColor: colors.primary, opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.startButtonText}>Começar</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 24, 
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, opacity: 0.7, marginTop: 2 },
  section: { marginVertical: 10 },
  sectionLabel: { 
    fontSize: 11, 
    fontWeight: '700', 
    letterSpacing: 1, 
    marginBottom: 10, 
    textTransform: 'uppercase' 
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: { fontSize: 16, fontWeight: '700' },
  optionSubtext: { fontSize: 12, marginTop: 1 },
  checkIcon: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  colorRow: { flexDirection: 'row', gap: 12 },
  colorButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  pieceImage: {
    width: 44,
    height: 44,
    marginBottom: 4,
  },
  colorButtonText: { fontSize: 14, fontWeight: '700' },
  footer: {
    marginTop: 'auto',
  },
  startButton: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  startButtonText: { color: '#fff', fontSize: 18, fontWeight: '800' },
});