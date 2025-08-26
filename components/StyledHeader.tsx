import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from './ui/IconSymbol';
import { router } from 'expo-router';

interface StyledHeaderProps {
  title: string;
}

export default function StyledHeader({ title }: StyledHeaderProps) {
  const handleProfilePress = () => {
    router.push('/profile');
  };

  return (
    <BlurView intensity={80} tint="dark" style={styles.header}>
      <ThemedText type="title" style={{ color: Colors.dark.text }}>{title}</ThemedText>
      <Pressable onPress={handleProfilePress}>
        <IconSymbol name="person.fill" size={28} color={Colors.dark.text} />
      </Pressable>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
});
