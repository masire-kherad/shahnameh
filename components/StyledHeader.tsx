import { Colors } from '@/constants/Colors';
import { getUserInfo } from '@/services/dataService';
import { BlurView } from 'expo-blur';
import { router, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { I18nManager, Image, ImageBackground, Platform, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
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

  const handleBackPress = () => {
    router.back();
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

  // Determine if we should show the back button
  const shouldShowBackButton = pathname !== '/' && pathname !== '/index' && pathname !== '/profile';
  
  // Determine the correct chevron direction for RTL
  const chevronIcon = I18nManager.isRTL ? 'chevron.right' : 'chevron.left';

  return (
    <ImageBackground
      source={require('@/assets/images/corner.jpg')}
      style={[styles.header, { paddingTop: Platform.OS === 'web' ? 24 : insets.top + 12 }]}
      imageStyle={styles.backgroundImage}
    >
      <BlurView intensity={80} tint={colorScheme} style={styles.blurView}>
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
        </View>
        <ThemedText type="title" style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          {title}
        </ThemedText>
        <View style={styles.headerContainer}>
          {shouldShowBackButton && (
            <Pressable onPress={handleBackPress} style={styles.backButton}>
              <IconSymbol name={chevronIcon} size={28} color={Colors[colorScheme ?? 'light'].text} />
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
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'none'
  },
  backButton: {
    padding: 4,
    marginLeft: 8,
  },
  title: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 60,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  genderImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
});
