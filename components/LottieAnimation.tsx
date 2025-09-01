import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

interface LottieAnimationProps {
  animationPath: any;
  progress: number;
  children: React.ReactNode;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationPath, progress, children }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={animationPath}
        progress={progress}
        style={styles.animation}
        loop={false}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animation: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default LottieAnimation;
