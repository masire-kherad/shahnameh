import { useEffect } from 'react';
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export function useHelloWave() {
  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withTiming(10, { duration: 1500 }),
      -1,
      true
    );
  }, []);

  return rotationAnimation;
}
