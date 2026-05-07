import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useHapticTab } from '../hooks/useHapticTab';

export function HapticTab(props: BottomTabBarButtonProps) {
  const tabProps = useHapticTab(props);

  return <PlatformPressable {...tabProps} />;
}
