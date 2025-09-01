import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Image, ImageBackground, useColorScheme, I18nManager, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { ThemedText } from './ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from './ui/IconSymbol';
import { router, usePathname } from 'expo-router';
import { getUserInfo } from '@/services/dataService';
import { useCurrency } from '@/hooks/useCurrency';

interface StyledHeaderProps {
  title: string;
}

export default function StyledHeader({ title }: StyledHeaderProps) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState(null);
  const { balance, isLoading: isCurrencyLoading } = useCurrency();
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    fetchUserInfo();
  }, [pathname]);

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const getGenderImage = () => {
    if (userInfo?.gender === 'male') {
      return require('@/assets/images/MaleUser.png');
    }
    if (userInfo?.gender === 'female') {
      return require('@/assets/images/FemaleUser.png');
    }
    return null;
  };

  return (
    <ImageBackground
      source={require('@/assets/images/corner.jpg')}
      style={[styles.header, { paddingTop: insets.top + 12 }]}
      imageStyle={styles.backgroundImage}
    >
      <BlurView intensity={80} tint={colorScheme} style={styles.blurView}>
        <ThemedText type="title" style={{ color: Colors[colorScheme].text }}>{title}</ThemedText>
        <View style={styles.actionsContainer}>
          {!isCurrencyLoading && (
            <View style={styles.currencyContainer}>
              <ThemedText style={styles.currencyText}>{balance} زر</ThemedText>
            </View>
          )}
          {pathname !== '/profile' &&  pathname !== '/favorites' && (
            <Pressable onPress={handleProfilePress}>
              {userInfo && getGenderImage() ? (
                <Image source={getGenderImage()} style={styles.genderImage} />
              ) : (
                <IconSymbol name="person.fill" size={28} color={Colors[colorScheme].text} />
              )}
            </Pressable>
          )}
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  header: {
    overflow: 'hidden',
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.1,
  },
  blurView: {
    ...Platform.select({
      ios: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      },
      android: {
        flexDirection: 'row',
      },
    }),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors[colorScheme].background + 'aa',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyContainer: {
    marginRight: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  currencyText: {
    fontWeight: 'bold',
    color: '#ffd700',
  },
  genderImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
});