import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface ChessPieceProps {
  piece: string;
  color: 'w' | 'b';
  isDragging?: boolean;
}

const PIECE_IMAGES: Record<string, ReturnType<typeof require>> = {
  wk: require('../../../assets/pieces/wk.png'),
  wq: require('../../../assets/pieces/wq.png'),
  wr: require('../../../assets/pieces/wr.png'),
  wb: require('../../../assets/pieces/wb.png'),
  wn: require('../../../assets/pieces/wn.png'),
  wp: require('../../../assets/pieces/wp.png'),
  bk: require('../../../assets/pieces/bk.png'),
  bq: require('../../../assets/pieces/bq.png'),
  br: require('../../../assets/pieces/br.png'),
  bb: require('../../../assets/pieces/bb.png'),
  bn: require('../../../assets/pieces/bn.png'),
  bp: require('../../../assets/pieces/bp.png'),
};

function ChessPieceComponent({ piece, color, isDragging = false }: ChessPieceProps) {
  const key = `${color}${piece}`;
  const imageSource = PIECE_IMAGES[key];

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: isDragging ? 1.1 : scale.value }],
    opacity: isDragging ? 0.85 : 1,
  }));

  if (!imageSource) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="contain"
        fadeDuration={0}
      />
    </Animated.View>
  );
}

export const ChessPiece = memo(ChessPieceComponent);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: '85%',
    height: '85%',
    backgroundColor: 'transparent',
  },
});