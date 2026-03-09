import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/theme';
import { useSettingsStore } from '@/store/settingsStore';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { playerElo, theme } = useSettingsStore();

  const getTitle = (elo: number) => {
    if (elo >= 2500) return 'Grandmaster';
    if (elo >= 2000) return 'Master';
    if (elo >= 1600) return 'Expert';
    if (elo >= 1200) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <View style={styles.header}>
        <View>
          <Text style={[styles.welcome, { color: colors.textSecondary }]}>Bem-vindo,</Text>
          <Text style={[styles.title, { color: colors.text }]}>{getTitle(playerElo)}</Text>
        </View>
        <View style={[styles.eloBadge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.eloEmoji}>🏆</Text>
          <Text style={[styles.eloText, { color: colors.text }]}>{playerElo}</Text>
        </View>
      </View>

      <Pressable
        onPress={() => router.push('/difficulty')}
        style={({ pressed }) => [
          styles.newGameBtn,
          { backgroundColor: colors.primary, opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
        ]}
      >
        <View style={styles.newGameContent}>
          <View>
            <Text style={styles.newGameTitle}>Novo Jogo</Text>
            <Text style={styles.newGameSub}>Desafiar o motor IA</Text>
          </View>
          <View style={styles.playIconWrap}>
            <Ionicons name="play" size={22} color={colors.primary} />
          </View>
        </View>
      </Pressable>

      <View style={styles.menuSection}>
        <Text style={[styles.menuLabel, { color: colors.textSecondary }]}>MENU</Text>

        <Pressable
          onPress={() => router.push('/settings')}
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <View style={[styles.menuIconWrap, { backgroundColor: '#1e6ef720' }]}>
            <Ionicons name="settings" size={18} color="#4a9eff" />
          </View>
          <Text style={[styles.menuItemText, { color: colors.text }]}>Configurações</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 64 : 44,
    paddingBottom: Platform.OS === 'ios' ? 48 : 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  welcome: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  eloBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  eloEmoji: {
    fontSize: 14,
  },
  eloText: {
    fontSize: 15,
    fontWeight: '700',
  },
  newGameBtn: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  newGameContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  newGameTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  newGameSub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '500',
  },
  playIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuSection: {
    gap: 10,
  },
  menuLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 14,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
});