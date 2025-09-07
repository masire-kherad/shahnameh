import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from './ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = 'در حال بارگذاری...' }: LoadingProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme!);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
      <ThemedText style={styles.message}>{message}</ThemedText>
    </View>
  );
}

const createStyles = (colorScheme: 'light' | 'dark' | undefined) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});