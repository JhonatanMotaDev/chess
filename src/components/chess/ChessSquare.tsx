import React, { memo } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import type { Square } from '@/types/chess';
import { useTheme } from '@/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ChessSquareProps {
  square: Square;
  isLight: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isLastMove: boolean;
  isCheck: boolean;
  onPress: () => void;
}

function ChessSquareComponent({
  square,
  isLight,
  isSelected,
  isHighlighted,
  isLastMove,
  isCheck,
  onPress,
}: ChessSquareProps) {
  const { colors } = useTheme();

  const bgColor = isLight ? colors.boardLight : colors.boardDark;
  let overlayStyle: object = {};
  if (isCheck) {
    overlayStyle = {
      backgroundColor: colors.check,
      opacity: 0.6,
    };
  } else if (isSelected) {
    overlayStyle = {
      backgroundColor: 'rgba(255,255,0,0.4)',
    };
  } else if (isLastMove) {
    overlayStyle = {
      backgroundColor: colors.boardLastMove,
      opacity: 0.7,
    };
  } else if (isHighlighted) {
    overlayStyle = {
      backgroundColor: colors.boardHighlight,
      opacity: 0.5,
    };
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[
        styles.square,
        { backgroundColor: bgColor },
        Object.keys(overlayStyle).length > 0 && overlayStyle,
      ]}
    >
      <View style={styles.inner} />
    </AnimatedPressable>
  );
}

export const ChessSquare = memo(ChessSquareComponent);

const styles = StyleSheet.create({
  square: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    width: '100%',
  },
});
