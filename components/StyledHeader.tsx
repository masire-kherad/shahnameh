import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { ThemedText } from './ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from './ui/IconSymbol';
import { router, usePathname } from 'expo-router';

interface StyledHeaderProps {
  title: string;
}

export default function StyledHeader({ title }: StyledHeaderProps) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const handleProfilePress = () => {
    router.push('/profile');
  };

  return (
    <BlurView intensity={80} tint="dark" style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <ThemedText type="title" style={{ color: Colors.dark.text, paddingTop: 5 }}>{title}</ThemedText>
      {pathname !== '/profile' && pathname !== '/favorites' && (
        <Pressable onPress={handleProfilePress}>
          <IconSymbol name="person.fill" size={28} color={Colors.dark.text} />
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
});
