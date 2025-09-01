import React from 'react';
import { StyleSheet, View, ScrollView, Pressable, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function RahnamaScreen() {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={styles.title}>درباره‌ی ما</ThemedText>
        <ThemedText style={styles.paragraph}>
          این برنامه با عشق به شاهنامه و فرهنگ ایرانی ساخته شده است. هدف ما این است که خواندن شاهنامه را از حالت سنگین و دشوار بیرون بیاوریم و آن را به تجربه‌ای لذت‌بخش و سرگرم‌کننده تبدیل کنیم.
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          ما از ایده‌ی یادگیری زبان در اپلیکیشن‌هایی مثل دولینگو الهام گرفتیم و تلاش کردیم خواندن و یادگیری داستان‌های شاهنامه را هم با گیمیفیکیشن جذاب کنیم. یعنی هر بار که پیش می‌روید، هم با ماجراهای پهلوانان ایرانی همراه می‌شوید و هم امتیاز می‌گیرید، مرحله‌ها را باز می‌کنید و مسیرتان را ادامه می‌دهید.
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          با این کار می‌خواهیم کمک کنیم تا شاهنامه نه فقط یک اثر ادبی کهن، بلکه یک تجربه‌ی زنده و پرهیجان برای نسل امروز باشد.
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          اگر پیشنهادی دارید یا ایده‌ای برای بهتر شدن برنامه به ذهن‌تان رسید، خوشحال می‌شویم از طریق صفحه‌ی اینستاگرام با ما در میان بگذارید.
        </ThemedText>

        <View style={styles.linksContainer}>
          <Pressable style={styles.linkButton} onPress={() => handleLinkPress('https://www.instagram.com/aslani.ts')}>
            <IconSymbol name="camera" size={24} color="#fff" />
            <ThemedText style={styles.linkText}>اینستاگرام</ThemedText>
          </Pressable>
          <Pressable style={styles.linkButton} onPress={() => handleLinkPress('https://t.me/aslani_ts')}>
            <IconSymbol name="paperplane" size={24} color="#fff" />
            <ThemedText style={styles.linkText}>تلگرام</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors[colorScheme ?? 'light'].background,
  },
  container: {
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
    marginBottom: 16,
  },
  linksContainer: {
    marginTop: 32,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: 16,
  },
  linkButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
