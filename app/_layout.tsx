import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { I18nManager, Platform, View, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import StyledHeaderIos from '@/components/StyledHeader.ios';
import StyledHeaderAndroid from '@/components/StyledHeader.android';
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
      <View style={styles.container}>
        <View style={styles.content}>
          <Stack
            screenOptions={{
              header: ({ options }) => {
                if (Platform.OS === 'web') {
                  return <StyledHeader title={options.title || ''} />;
                }
                if (Platform.OS === 'ios') {
                  return <StyledHeaderIos title={options.title || ''} />;
                }
                return <StyledHeaderAndroid title={options.title || ''} />;
              },
            }}
          >
            <Stack.Screen name="index" options={{ title: 'شاهنامه' }} />
            <Stack.Screen name="profile" options={{ title: 'پروفایل' }} />
            <Stack.Screen name="category/[cat_id]" options={{ title: 'فهرست اشعار' }} />
            <Stack.Screen name="reading/[poem_id]" options={{ title: '' }} />
            <Stack.Screen name="scenario/[cat_id]" options={{ title: 'Scenario' }} />
            <Stack.Screen name="Info" options={{ title: 'راهنما' }} />
            <Stack.Screen name="favorites" options={{ title: 'علاقه‌مندی‌ها' }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <UserInfoModal visible={modalVisible} onClose={handleModalClose} />
          <StatusBar style="auto" />
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      web: {
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
      },
    }),
  },
  content: {
    flex: 1,
    ...Platform.select({
      web: {
        maxWidth: 420,
        width: '100%',
        backgroundColor: 'white'
      },
    }),
  },
});
