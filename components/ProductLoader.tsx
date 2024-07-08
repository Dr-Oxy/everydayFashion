import { StyleSheet, View } from 'react-native';
import { useState, useEffect, useRef } from 'react';

import { ThemedView } from './ThemedView';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const ProductLoader = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.5, {
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.6, 1),
        }),
        withTiming(1, {
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.6, 1),
        }),
      ),
      -1, // Infinite loop
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <ThemedView style={styles.loadView}>
      <Animated.View style={[styles.loadImg, animatedStyle]}></Animated.View>
    </ThemedView>
  );
};

export default ProductLoader;

const styles = StyleSheet.create({
  loadView: {
    width: '48%',
  },
  loadImg: {
    height: 220,
    backgroundColor: '#393535',
  },
});
