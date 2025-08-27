import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Image, ImageBackground, useColorScheme, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { ThemedText } from './ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from './ui/IconSymbol';
import { router, usePathname } from 'expo-router';
import { getUserInfo } from '@/services/dataService';

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
            <ThemedText type="title" style={{ color: Colors[colorScheme ?? 'light'].text }}>{title}</ThemedText>
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
  },
  blurView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors[colorScheme ?? 'light'].background + 'aa',
    flexDirection: 'column'
  },
  titleContainer: {
    paddingTop: 5,
    paddingBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  genderImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
});
