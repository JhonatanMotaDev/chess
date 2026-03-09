import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

export function PromotionModal() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.text, { color: colors.text }]}>Promotion Modal Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, borderRadius: 10, marginHorizontal: 20, marginTop: 10 },
  text: { fontSize: 16 },
});
