import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nManager } from 'react-native';
import 'react-native-reanimated';
import StyledHeader from '@/components/StyledHeader';

import { useColorScheme } from '@/hooks/useColorScheme';

try {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
} catch (e) {
  console.log(e);
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Vazirmatn: require('../assets/fonts/Vazirmatn-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          header: ({ options }) => <StyledHeader title={options.title || ''} />,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'شاهنامه' }} />
        <Stack.Screen name="profile" options={{ title: 'پروفایل' }} />
        <Stack.Screen name="category/[cat_id]" options={{ title: 'فهرست اشعار' }} />
        <Stack.Screen name="reading/[poem_id]" options={{ title: '' }} />
        <Stack.Screen name="favorites" options={{ title: 'علاقه‌مندی‌ها' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
