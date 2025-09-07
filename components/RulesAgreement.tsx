import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { ImageBackground, Modal, Pressable, StyleSheet, useColorScheme, View, ScrollView } from 'react-native';
import { ThemedText } from './ThemedText';

interface RulesAgreementProps {
  visible: boolean;
  onAgree: () => void;
}

export default function RulesAgreement({ visible, onAgree }: RulesAgreementProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme!);
  const [accepted, setAccepted] = useState(false);

  const handleAgree = () => {
    if (accepted) {
      onAgree();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <ImageBackground
          source={require('@/assets/images/corner.jpg')}
          style={styles.modalContent}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.contentView}>
            <ThemedText type="title" style={styles.title}>قوانین و مقررات</ThemedText>
            
            <ScrollView style={styles.rulesContainer}>
              <ThemedText style={styles.ruleText}>
                1. مسئولیت کاربر: کاربر موظف است از برنامه در چارچوب قوانین کشور و عرف فرهنگی استفاده کند. هرگونه استفادهٔ غیرقانونی، توهین‌آمیز یا سوءاستفاده از محتوای برنامه برعهدهٔ کاربر است.
              </ThemedText>
              <ThemedText style={styles.ruleText}>
                2. محدودیت‌های محتوا: این برنامه بر اساس داستان‌ها و اشعار شاهنامه ساخته شده و در برخی موارد تغییرات روایی/سناریویی دارد. کاربر می‌پذیرد که این بخش‌ها بازآفرینی تعاملی‌اند و متن اصلی شاهنامه نیستند..
              </ThemedText>
              <ThemedText style={styles.ruleText}>
                3. مسئولیت توسعه‌دهنده: توسعه‌دهنده مسئول خسارت‌های مستقیم یا غیرمستقیمی که از استفاده از برنامه ناشی شود، نیست.
              </ThemedText>
              <ThemedText style={styles.ruleText}>
                4. نظارت والدین: والدین مسئول نظارت بر استفادهٔ کودکان هستند.
              </ThemedText>
            </ScrollView>
            
            <Pressable 
              style={[styles.checkboxContainer, accepted && styles.checkboxSelected]} 
              onPress={() => setAccepted(!accepted)}
            >
              <ThemedText style={[styles.checkboxText, accepted && styles.checkboxTextSelected]}>
                من قوانین و مقررات را مطالعه کرده و می‌پذیرم
              </ThemedText>
            </Pressable>
            
            <Pressable 
              style={[styles.button, accepted ? styles.buttonEnabled : styles.buttonDisabled]} 
              onPress={handleAgree}
              disabled={!accepted}
            >
              <ThemedText style={styles.buttonText}>تایید و ادامه</ThemedText>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
}

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    writingDirection: 'ltr',
    direction: 'ltr'
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors[colorScheme].background,
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.1,
  },
  contentView: {
    backgroundColor: Colors[colorScheme].background + 'aa',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    color: Colors[colorScheme].text,
  },
  rulesContainer: {
    width: '100%',
    marginBottom: 20,
  },
  ruleText: {
    fontSize: 14,
    color: Colors[colorScheme].text,
    marginBottom: 10,
    textAlign: 'right',
  },
  checkboxContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors[colorScheme].icon,
    marginBottom: 20,
    width: '100%',
  },
  checkboxSelected: {
    backgroundColor: Colors[colorScheme].tint + '33',
    borderColor: Colors[colorScheme].tint,
  },
  checkboxText: {
    fontSize: 14,
    color: Colors[colorScheme].text,
    textAlign: 'center',
  },
  checkboxTextSelected: {
    color: Colors[colorScheme].tint,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
  },
  buttonEnabled: {
    backgroundColor: Colors[colorScheme].tint,
  },
  buttonDisabled: {
    backgroundColor: Colors[colorScheme].icon + '66',
  },
  buttonText: {
    color: Colors[colorScheme].background,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});