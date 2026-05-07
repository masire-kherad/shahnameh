import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLottieAnimation, UseLottieAnimationProps } from '../hooks/useLottieAnimation';

const LottieAnimation: React.FC<UseLottieAnimationProps & { children: React.ReactNode }> = (props) => {
  const { animationPath, progress } = useLottieAnimation(props);

  return (
    <View style={styles.container}>
      <LottieView
        source={animationPath}
        progress={progress}
        style={styles.animation}
        loop={false}
      />
      {props.children}
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
