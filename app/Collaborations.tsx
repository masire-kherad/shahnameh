import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function CollaborationsScreen() {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme!);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const collaborators = [
    {
      id: 0,
      name: "سایت گنجور",
      role: "فراهم کردن پایگاه داده شعر فارسی و دسترسی به API",
      url: "https://ganjoor.net"
    },
    {
      id: 1,
      name: "علی اصلانی",
      role: "توسعه‌دهنده و ایده‌پرداز برنامه",
      url: "https://www.linkedin.com/in/ialiaslani/"
    },
    {
      id: 2,
      name: "سارا بیتوئی",
      role: "مشاوره ادبی و توسعه محتوا",
      url: "https://www.linkedin.com/in/sara-beytuie/"
    },
    {
      id: 3,
      name: "محمد خانی",
      role: "مشاور فنی و پیاده‌سازی برنامه",
      url: "https://www.linkedin.com/in/mohammad-khani2001/"
    },
    {
      id: 4,
      name: "علیرضا اسرافیلی",
      role: "مشاور بازی و تست برنامه",
      url: "https://www.linkedin.com/in/alireza-esrafili-ba3a02206/"
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>همکاران</ThemedText>
        
        <ThemedText style={styles.paragraph}>
          این پروژه با کمک و حمایت بسیاری از افراد و نهادها ممکن شده است:
        </ThemedText>

        <View style={styles.collaboratorsList}>
          {collaborators.map((collaborator) => (
            <Pressable 
              key={collaborator.id} 
              style={styles.collaboratorItem}
              onPress={() => handleLinkPress(collaborator.url)}
            >
              <View style={styles.collaboratorInfo}>
                <ThemedText style={styles.collaboratorName}>{collaborator.name}</ThemedText>
                <ThemedText style={styles.collaboratorRole}>{collaborator.role}</ThemedText>
              </View>
              <IconSymbol name="link" size={16} color={Colors[colorScheme!].tint} />
            </Pressable>
          ))}
        </View>

        <ThemedText style={styles.thanksText}>
          برای همکاری از طریق اینستاگرام aslani.ts با ما در ارتباط باشید.
        </ThemedText>
      </ScrollView>
    </View>
  );
}

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[colorScheme].background,
    writingDirection: 'ltr',
    direction: 'ltr'
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
    backgroundColor: Colors[colorScheme].tint + '20', // Light tint background
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
    marginBottom: 4,
  },
  collaboratorRole: {
    fontSize: 14,
    textAlign: 'right',
    color: Colors[colorScheme].tabIconDefault,
  },
  thanksText: {
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 24,
  },
});