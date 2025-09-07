import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { useRouter } from 'expo-router';
import { IconSymbol } from './ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface NotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

export default function NotFound({ 
  title = 'صفحه مورد نظر یافت نشد', 
  message = 'متأسفانه صفحه‌ای که به دنبال آن بودید یافت نشد.',
  showHomeButton = true
}: NotFoundProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <IconSymbol name="info.circle.fill" size={80} color={Colors[colorScheme ?? 'light'].tint} />
      <ThemedText type="title" style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.message}>{message}</ThemedText>
      {showHomeButton && (
        <Pressable style={styles.button} onPress={handleGoHome}>
          <ThemedText style={styles.buttonText}>بازگشت به صفحه اصلی</ThemedText>
        </Pressable>
      )}
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
    backgroundColor: Colors[colorScheme ?? 'light'].tint,
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