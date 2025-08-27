import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
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
    <BlurView intensity={80} tint="dark" style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <ThemedText type="title" style={{ color: Colors.dark.text }}>{title}</ThemedText>
      {pathname !== '/profile' && (
        <Pressable onPress={handleProfilePress}>
          {userInfo && getGenderImage() ? (
            <Image source={getGenderImage()} style={styles.genderImage} />
          ) : (
            <IconSymbol name="person.fill" size={28} color={Colors.dark.text} />
          )}
        </Pressable>
      )}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  genderImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
});
