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
  hasPiece: boolean;
  onPress: () => void;
}

function ChessSquareComponent({
  square,
  isLight,
  isSelected,
  isHighlighted,
  isLastMove,
  isCheck,
  hasPiece,
  onPress,
}: ChessSquareProps) {
  const { colors } = useTheme();

  const bgColor = isLight ? colors.boardLight : colors.boardDark;

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.square, { backgroundColor: bgColor }]}
    >
      {isLastMove && !isSelected && !isCheck && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.boardLastMove, opacity: 0.6 },
          ]}
        />
      )}

      {isSelected && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.boardHighlight, opacity: 0.7 },
          ]}
        />
      )}

      {isCheck && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.check, opacity: 0.55 },
          ]}
        />
      )}

      {isHighlighted && !isSelected && (
        <View style={styles.dotWrap} pointerEvents="none">
          {hasPiece ? (
            <View
              style={[
                styles.captureRing,
                {
                  borderColor: isLight
                    ? 'rgba(0,0,0,0.18)'
                    : 'rgba(0,0,0,0.22)',
                },
              ]}
            />
          ) : (
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: isLight
                    ? 'rgba(0,0,0,0.15)'
                    : 'rgba(0,0,0,0.2)',
                },
              ]}
            />
          )}
        </View>
      )}
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
  dotWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: '33%',
    aspectRatio: 1,
    borderRadius: 999,
  },
  captureRing: {
    width: '90%',
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 6,
  },
});