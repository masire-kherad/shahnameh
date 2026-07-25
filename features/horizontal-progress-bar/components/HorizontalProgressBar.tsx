import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface HorizontalProgressBarProps {
  progress: number; 
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
  const progressWidth = progress * 100; 

  return (
    <View style={[styles.container, { height, backgroundColor: bgColor }]}>
      <View
        style={[
          styles.progress,
          { width: `${progressWidth}%`, backgroundColor: progressColor },
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
