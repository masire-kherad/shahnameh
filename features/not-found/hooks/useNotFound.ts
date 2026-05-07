import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export interface UseNotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

export function useNotFound({
  title = 'صفحه مورد نظر یافت نشد',
  message = 'متأسفانه صفحه‌ای که به دنبال آن بودید یافت نشد.',
  showHomeButton = true
}: UseNotFoundProps = {}) {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleGoHome = () => {
    router.push('/');
  };

  return {
    title,
    message,
    showHomeButton,
    colorScheme,
    tintColor: Colors[colorScheme ?? 'light'].tint,
    handleGoHome,
  };
}
