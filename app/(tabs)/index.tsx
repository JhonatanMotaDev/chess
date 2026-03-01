import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { useSettingsStore } from '@/store/settingsStore';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { playerElo } = useSettingsStore();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        style={styles.content}
      >
        <Text style={[styles.title, { color: colors.text }]}>Chess</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Play against a human-like AI
        </Text>
        <Text style={[styles.elo, { color: colors.textTertiary }]}>
          Your rating: {playerElo}
        </Text>

        <Pressable
          onPress={() => router.push('/difficulty')}
          style={({ pressed }) => [
            styles.playButton,
            { backgroundColor: colors.primary },
            pressed && styles.playButtonPressed,
          ]}
        >
          <Text style={styles.playButtonText}>Play vs Computer</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/settings')}
          style={({ pressed }) => [
            styles.settingsButton,
            { borderColor: colors.border },
            pressed && styles.settingsButtonPressed,
          ]}
        >
          <Text style={[styles.settingsButtonText, { color: colors.text }]}>
            Settings
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    opacity: 0.8,
  },
  elo: {
    fontSize: 14,
    marginBottom: 48,
    opacity: 0.6,
  },
  playButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  playButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  settingsButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
    width: '100%',
    alignItems: 'center',
  },
  settingsButtonPressed: {
    opacity: 0.8,
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
