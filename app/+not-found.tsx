import NotFound from '@/components/NotFound';
import { Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'صفحه یافت نشد' }} />
      <NotFound 
        title="صفحه مورد نظر یافت نشد" 
        message="متأسفانه صفحه‌ای که به دنبال آن بودید یافت نشد." 
      />
    </>
  );
}
