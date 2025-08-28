import React from 'react';
import { View, StyleSheet } from 'react-native';

interface HorizontalProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  bgColor?: string;
  progressColor?: string;
}

export default function HorizontalProgressBar({
  progress,
  height = 8,
  bgColor = '#ccc',
  progressColor = '#109499ff',
}: HorizontalProgressBarProps) {
  return (
    <View style={[styles.container, { height, backgroundColor: bgColor }]}>
      <View
        style={[
          styles.progress,
          { width: `${progress * 100}%`, backgroundColor: progressColor },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
});
