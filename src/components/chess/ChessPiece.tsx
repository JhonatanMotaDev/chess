import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface ChessPieceProps {
  piece: string;
  color: 'w' | 'b';
  isDragging?: boolean;
}

const PIECE_MAP: Record<string, string> = {
  wp: '♙',
  wn: '♘',
  wb: '♗',
  wr: '♖',
  wq: '♕',
  wk: '♔',
  bp: '♟',
  bn: '♞',
  bb: '♝',
  br: '♜',
  bq: '♛',
  bk: '♚',
};

function ChessPieceComponent({ piece, color }: ChessPieceProps) {
  const symbol = PIECE_MAP[`${color}${piece}`] || '';

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.Text
      style={[styles.piece, animatedStyle]}
      allowFontScaling={false}
    >
      {symbol}
    </Animated.Text>
  );
}

export const ChessPiece = memo(ChessPieceComponent);

const styles = StyleSheet.create({
  piece: {
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});