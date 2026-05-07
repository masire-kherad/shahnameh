import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCallback, useMemo } from 'react';
import { Linking, StyleSheet } from 'react-native';

export interface Collaborator {
  id: number;
  name: string;
  role: string;
  url: string;
}

const createStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].background,
      writingDirection: 'ltr',
    },
    contentContainer: {
      padding: 24,
    },
    title: {
      textAlign: 'center',
      marginBottom: 24,
    },
    paragraph: {
      fontSize: 16,
      lineHeight: 28,
      textAlign: 'right',
      marginBottom: 24,
    },
    collaboratorsList: {
      marginBottom: 24,
    },
    collaboratorItem: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors[colorScheme].tint + '20',
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
    },
    collaboratorInfo: {
      flex: 1,
      marginRight: 12,
    },
    collaboratorName: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    collaboratorRole: {
      fontSize: 14,
      color: Colors[colorScheme].text,
      textAlign: 'right',
      marginTop: 4,
    },
    thanksText: {
      fontSize: 16,
      lineHeight: 28,
      textAlign: 'center',
      marginTop: 24,
    },
  });

export function useCollaborations() {
  const colorScheme = useColorScheme()!;   // guaranteed by the app’s providers

  const collaborators: Collaborator[] = useMemo(
    () => [
      {
        id: 0,
        name: "سایت گنجور",
        role: "فراهم کردن پایگاه داده شعر فارسی و دسترسی به API",
        url: "https://ganjoor.net",
      },
      {
        id: 1,
        name: "علی اصلانی",
        role: "توسعه‌دهنده و ایده‌پرداز برنامه",
        url: "https://www.linkedin.com/in/ialiaslani/",
      },
      {
        id: 2,
        name: "سارا بیتوئی",
        role: "مشاور ادبی و طراحی",
        url: "https://www.linkedin.com/in/sara-beytuie/",
      },
      {
        id: 3,
        name: "محمد خانی",
        role: "مشاور فنی و پیاده‌سازی برنامه",
        url: "https://www.linkedin.com/in/mohammad-khani2001/",
      },
      {
        id: 4,
        name: "علیرضا اسرافیلی",
        role: "مشاور تحلیل و تست برنامه",
        url: "https://www.linkedin.com/in/alireza-esrafili-ba3a02206/",
      },
    ],
    [],
  );

  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  const tintColor = useMemo(() => Colors[colorScheme].tint, [colorScheme]);

  const handleLinkPress = useCallback((url: string) => {
    Linking.openURL(url);
  }, []);

  return { collaborators, handleLinkPress, styles, tintColor };
}
