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

  const innerCircleStyle = {
    width: size - strokeWidth * 2,
    height: size - strokeWidth * 2,
    borderRadius: (size - strokeWidth * 2) / 2,
    backgroundColor: 'transparent',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  };

  const halfCircleContainer = {
    width: halfSize,
    height: size,
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    top: 0,
  };

  const halfCircle = {
    width: size,
    height: size,
    borderRadius: halfSize,
    borderWidth: strokeWidth,
    borderColor: progressColor,
    position: 'absolute',
    left: 0,
    top: 0,
  };

  const firstHalfRotate = progressDegrees > 180 ? 180 : progressDegrees;
  const secondHalfRotate = progressDegrees > 180 ? progressDegrees - 180 : 0;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.background, { backgroundColor: bgColor, width: size, height: size, borderRadius: halfSize }]} />
      <View style={[halfCircleContainer, { transform: [{ rotate: '180deg' }] }]}>
        <View
          style={[
            halfCircle,
            {
              transform: [{ rotate: `${secondHalfRotate}deg` }],
            },
          ]}
        />
      </View>
      <View style={halfCircleContainer}>
        <View
          style={[
            halfCircle,
            {
              transform: [{ rotate: `${firstHalfRotate}deg` }],
            },
          ]}
        />
      </View>
      <View style={innerCircleStyle}>{children}</View>
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
    zIndex: 1,
  },
});
