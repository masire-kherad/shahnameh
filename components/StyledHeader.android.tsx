import { Colors } from '@/constants/Colors';
import { getUserInfo } from '@/services/dataService';
import { BlurView } from 'expo-blur';
import { router, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

interface StyledHeaderProps {
  title: string;
}

export default function StyledHeader({ title }: Readonly<StyledHeaderProps>) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<any>(null);
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme!);

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
  const shouldShowBackButton = pathname !== '/' && pathname !== '/index';
  
  // Determine the correct chevron direction for RTL
  const chevronIcon = 'chevron.left';

  return (
    <ImageBackground
      source={require('@/assets/images/corner.jpg')}
      style={[styles.header, { paddingTop: insets.top + 12 }]}
      imageStyle={styles.backgroundImage}
    >
      <BlurView intensity={80} style={styles.blurView}>
        <View style={styles.actionsContainer}>
          {pathname !== '/profile' && 
           pathname !== '/favorites' && 
           pathname !== '/Info' && 
           pathname !== '/Collaborations' && 
           pathname !== '/completed-poems' && (
            <Pressable onPress={handleProfilePress}>
              {userInfo && getGenderImage() ? (
                <Image source={getGenderImage()} style={styles.genderImage} />
              ) : (
                <IconSymbol name="person.fill" size={28} color={Colors[colorScheme!].text} />
              )}
            </Pressable>
          )}
        </View>
        <ThemedText type="title" style={[styles.title, { color: Colors[colorScheme!].text }]}>
          {title}
        </ThemedText>
        <View style={styles.headerContainer}>
          {shouldShowBackButton && (
            <Pressable onPress={handleBackPress} style={styles.backButton}>
              <IconSymbol name={chevronIcon} size={28} color={Colors[colorScheme!].text} />
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
    backgroundColor: Colors[colorScheme].background + 'aa',
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.1,
  },
  blurView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors[colorScheme].background + 'dd',
  },
  backButton: {
    padding: 4,
    marginLeft: 8,
  },
  title: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
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