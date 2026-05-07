import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import RulesAgreement from '@/features/rules-agreement/components/RulesAgreement';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useInfo } from '../hooks/useInfo';

export default function Info() {
  const { showRules, setShowRules, handleLinkPress, styles } = useInfo();

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

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>درباره‌ی توسعه‌ آینده</ThemedText>
          <ThemedText style={styles.paragraph}>
            در حال حاضر قسمت چالش به صورت آزمایشی و تنها به قسمت کیومرث، هوشنگ و طهمورث اضافه شده است که درصورت گرفتن بازخورد مناسب ادامه پیدا می‌کند. با ارائه بازخوردهایتان در اینستاگرام در توسعه این برنامه با ما همکاری کنید.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>قوانین و مقررات</ThemedText>
          <ThemedText style={styles.paragraph}>
            برای مشاهده قوانین و مقررات استفاده از این برنامه، روی دکمه زیر کلیک کنید.
          </ThemedText>
          <Pressable style={styles.collaborationButton} onPress={() => setShowRules(true)}>
            <ThemedText style={styles.collaborationButtonText}>مشاهده قوانین و مقررات</ThemedText>
          </Pressable>
        </View>

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
      <RulesAgreement visible={showRules} onAgree={() => setShowRules(false)} />
    </View>
  );
}
