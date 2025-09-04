import { Colors } from '@/constants/Colors';
import { useCurrency } from '@/hooks/useCurrency';
import { getUserInfo } from '@/services/dataService';
import { BlurView } from 'expo-blur';
import { router, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Platform, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

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
      style={[styles.header, { paddingTop: Platform.OS === 'web' ? 24 : insets.top + 12 }]}
      imageStyle={styles.backgroundImage}
    >
      <BlurView intensity={80} tint={colorScheme} style={styles.blurView}>
        <View style={styles.titleContainer}>
            <ThemedText type="title" style={{ color: Colors[colorScheme ?? 'light'].text, fontSize: 20 }}>{title}</ThemedText>
        </View>
        <View style={styles.actionsContainer}>
            {pathname !== '/profile' && pathname !== '/favorites' && (
              <Pressable onPress={handleProfilePress}>
                {userInfo && getGenderImage() ? (
                  <Image source={getGenderImage()} style={styles.genderImage} />
                ) : (
                  <IconSymbol name="person.fill" size={28} color={Colors[colorScheme ?? 'light'].text} />
                )}
              </Pressable>
            )}
            {!isCurrencyLoading && (
              <View style={styles.currencyContainer}>
                <ThemedText style={styles.currencyText}>{balance} زر</ThemedText>
              </View>
            )}
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  header: {
    overflow: 'hidden',
    paddingBottom: 12,
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.1,
    width: '100%',
    height: '100%',
  },
  blurView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row-reverse',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'none'
  },
  titleContainer: {
    paddingTop: 5,
    paddingBottom: 10,
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
