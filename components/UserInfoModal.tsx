import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ImageBackground, StyleSheet, Modal, useColorScheme } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';

interface UserInfoModalProps {
  visible: boolean;
  onClose: (name: string, gender: 'male' | 'female') => void;
}

export default function UserInfoModal({ visible, onClose }: UserInfoModalProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const handleClose = () => {
    if (name && gender) {
      onClose(name, gender);
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
            <ThemedText type="title" style={styles.title}>اطلاعات شما</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="نام خود را وارد کنید"
              placeholderTextColor={Colors[colorScheme].text}
              value={name}
              onChangeText={setName}
            />
            <ThemedText style={styles.genderLabel}>جنسیت خود را انتخاب کنید</ThemedText>
            <View style={styles.genderContainer}>
              <Pressable
                style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
                onPress={() => setGender('male')}
              >
                <ThemedText style={styles.genderText}>مرد</ThemedText>
              </Pressable>
              <Pressable
                style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
                onPress={() => setGender('female')}
              >
                <ThemedText style={styles.genderText}>زن</ThemedText>
              </Pressable>
            </View>
            <Pressable style={styles.button} onPress={handleClose}>
              <ThemedText style={styles.buttonText}>ذخیره</ThemedText>
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
  },
  modalContent: {
    width: '80%',
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
  input: {
    height: 40,
    borderColor: Colors[colorScheme].icon,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    color: Colors[colorScheme].text,
    fontSize: 14,
  },
  genderLabel: {
    fontSize: 14,
    color: Colors[colorScheme].text,
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors[colorScheme].icon,
  },
  selectedGender: {
    backgroundColor: Colors[colorScheme].tint,
    borderColor: Colors[colorScheme].tint,
  },
  genderText: {
    fontSize: 14,
    color: Colors[colorScheme].text,
  },
  button: {
    backgroundColor: Colors[colorScheme].tint,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: Colors[colorScheme].background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
