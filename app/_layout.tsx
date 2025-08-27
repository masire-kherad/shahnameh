import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nManager, View } from 'react-native';
import 'react-native-reanimated';
import StyledHeader from '@/components/StyledHeader';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useEffect, useState } from 'react';
import UserInfoModal from '@/components/UserInfoModal';
import { getUserInfo, setUserInfo } from '@/services/dataService';

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
  const [userInfo, setUserInfoState] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const checkUserInfo = async () => {
      const info = await getUserInfo();
      if (!info) {
        setModalVisible(true);
      } else {
        setUserInfoState(info);
      }
    };
    checkUserInfo();
  }, []);

  if (!loaded) {
    return null;
  }

  const handleModalClose = async (name: string, gender: 'male' | 'female') => {
    await setUserInfo(name, gender);
    setUserInfoState({ name, gender });
    setModalVisible(false);
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
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
        <UserInfoModal visible={modalVisible} onClose={handleModalClose} />
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}
