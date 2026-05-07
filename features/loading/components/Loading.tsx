import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useLoading } from '../hooks/useLoading';

export interface LoadingProps {
  message?: string;
}

export default function Loading({ message = 'در حال بارگذاری...' }: LoadingProps) {
  const { tintColor } = useLoading({ message });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={tintColor} />
      <ThemedText style={styles.message}>{message}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
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
