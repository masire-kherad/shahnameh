import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';

export function useHapticTab(props: BottomTabBarButtonProps) {
  const handlePressIn = (ev: any) => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    props.onPressIn?.(ev);
  };

  return {
    ...props,
    onPressIn: handlePressIn,
  };
}
