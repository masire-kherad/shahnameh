import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LoadingProps } from '../components/Loading';

export function useLoading({ message = 'در حال بارگذاری...' }: LoadingProps) {
  const colorScheme = useColorScheme();

  return {
    message,
    colorScheme,
    tintColor: Colors[colorScheme ?? 'light'].tint,
  };
}
