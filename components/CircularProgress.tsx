import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number; // 0 to 1
  bgColor?: string;
  progressColor?: string;
  children?: React.ReactNode;
}

export default function CircularProgress({
  size,
  strokeWidth,
  progress,
  bgColor = '#ccc',
  progressColor = '#3498db',
  children,
}: CircularProgressProps) {
  const progressDegrees = progress * 360;
  const halfSize = size / 2;

  const containerStyle = {
    width: size,
    height: size,
  };

  const firstHalfStyle = {
    ...styles.half,
    transform: [
      { translateX: halfSize },
      { rotate: `${progressDegrees > 180 ? 180 : progressDegrees}deg` },
      { translateX: -halfSize },
    ],
  };

  const secondHalfStyle = {
    ...styles.half,
    transform: [
      { translateX: halfSize },
      { rotate: `${progressDegrees > 180 ? progressDegrees : 180}deg` },
      { translateX: -halfSize },
    ],
  };

  const innerCircleStyle = {
    width: size - strokeWidth * 2,
    height: size - strokeWidth * 2,
    borderRadius: (size - strokeWidth * 2) / 2,
    backgroundColor: bgColor,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.background, { backgroundColor: bgColor, borderRadius: halfSize }]} />
      <View style={[styles.progressLayer, secondHalfStyle, { backgroundColor: progressColor }]} />
      <View style={[styles.progressLayer, firstHalfStyle, { backgroundColor: progress > 0.5 ? progressColor : bgColor }]} />
      <View style={[styles.innerCircle, innerCircleStyle]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  progressLayer: {
    ...StyleSheet.absoluteFillObject,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  half: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '50%',
    height: '100%',
  },
});
