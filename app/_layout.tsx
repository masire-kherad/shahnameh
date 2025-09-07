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
import RulesAgreement from '@/components/RulesAgreement';
import { getUserInfo, getRulesAgreed, setRulesAgreed } from '@/services/dataService';

try {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
} catch (e) {
  // Error handling for RTL configuration
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Vazirmatn: require('../assets/fonts/Vazirmatn-Regular.ttf'),
  });
  const [userInfo, setUserInfoState] = useState(null);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [userInfoModalVisible, setUserInfoModalVisible] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      const rulesAgreed = await getRulesAgreed();
      const info = await getUserInfo();
      
      if (!rulesAgreed) {
        setRulesModalVisible(true);
      } else if (!info) {
        setUserInfoModalVisible(true);
      } else {
        setUserInfoState(info);
      }
    };
    checkUserStatus();
  }, []);

  if (!loaded) {
    return null;
  }

  const handleRulesAgreed = async () => {
    await setRulesAgreed();
    setRulesModalVisible(false);
    // Check if we need to show user info modal
    const info = await getUserInfo();
    if (!info) {
      setUserInfoModalVisible(true);
    }
  };

  const handleUserInfoClose = async (name: string, gender: 'male' | 'female') => {
    await setUserInfo(name, gender);
    setUserInfoState({ name, gender });
    setUserInfoModalVisible(false);
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
            <Stack.Screen name="Info" options={{ title: 'درباره‌ما' }} />
            <Stack.Screen name="Collaborations" options={{ title: 'همکاران' }} />
            <Stack.Screen name="favorites" options={{ title: 'علاقه‌مندی‌ها' }} />
            <Stack.Screen name="completed-poems" options={{ title: 'اشعار تکمیل شده' }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <RulesAgreement visible={rulesModalVisible} onAgree={handleRulesAgreed} />
          <UserInfoModal visible={userInfoModalVisible} onClose={handleUserInfoClose} />
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
