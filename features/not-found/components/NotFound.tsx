import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNotFound } from '../hooks/useNotFound';

export interface NotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

export default function NotFound(props: NotFoundProps) {
  const {
    title,
    message,
    showHomeButton,
    tintColor,
    handleGoHome,
  } = useNotFound(props);

  return (
    <View style={styles.container}>
      <IconSymbol name="info.circle.fill" size={80} color={tintColor} />
      <ThemedText type="title" style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.message}>{message}</ThemedText>
      {showHomeButton && (
        <Pressable style={[styles.button, { backgroundColor: tintColor }]} onPress={handleGoHome}>
          <ThemedText style={styles.buttonText}>بازگشت به صفحه اصلی</ThemedText>
        </Pressable>
      )}
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
  title: {
    marginTop: 20,
    textAlign: 'center',
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
