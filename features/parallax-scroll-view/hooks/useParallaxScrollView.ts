import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useMemo } from 'react';

const HEADER_HEIGHT = 250;

export interface UseParallaxScrollViewProps {
  headerBackgroundColor?: string;
}

export function useParallaxScrollView({
  headerBackgroundColor,
}: UseParallaxScrollViewProps = {}) {
  const colorScheme = useColorScheme();
  const bottomTabOverflow = useBottomTabOverflow();

  const backgroundColor = useMemo(() => {
    if (headerBackgroundColor) {
      return headerBackgroundColor;
    }
    return colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
  }, [colorScheme, headerBackgroundColor]);

  return {
    HEADER_HEIGHT,
    backgroundColor,
    bottomTabOverflow,
  };
}
