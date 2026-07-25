import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { useParallaxScrollView, UseParallaxScrollViewProps } from '../hooks/useParallaxScrollView';

interface ParallaxScrollViewProps extends UseParallaxScrollViewProps {
  children: React.ReactNode;
  headerImage?: React.ReactNode;
}

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: ParallaxScrollViewProps) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const { HEADER_HEIGHT, backgroundColor, bottomTabOverflow } = useParallaxScrollView({
    headerBackgroundColor,
  });

  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom: bottomTabOverflow }}
        contentContainerStyle={{ paddingBottom: bottomTabOverflow }}
      >
        <Animated.View style={[styles.header, { height: HEADER_HEIGHT, backgroundColor }, headerAnimatedStyle]}>
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
});
