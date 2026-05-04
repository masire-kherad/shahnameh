import { Colors } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Modal, Platform, Pressable, StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import { ThemedText } from './ThemedText';

interface UserInfoModalProps {
  visible: boolean;
  onClose: (name: string, gender: 'male' | 'female') => void;
  initialName?: string;
  initialGender?: 'male' | 'female';
}

export default function UserInfoModal({ visible, onClose, initialName = '', initialGender = 'male' }: UserInfoModalProps) {
  const [name, setName] = useState(initialName);
  const [gender, setGender] = useState<'male' | 'female'>(initialGender);
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme!);

  useEffect(() => {
    setName(initialName);
    setGender(initialGender);
  }, [initialName, initialGender, visible]);

  const handleClose = () => {
    if (name.trim() && gender) {
      onClose(name.trim(), gender);
    }
  };

  // For web platform, we need to ensure the modal is properly positioned
  const modalProps = Platform.OS === 'web' 
    ? { 
        visible, 
        transparent: true, 
        animationType: "fade" as const,
        onRequestClose: handleClose
      } 
    : { 
        visible, 
        transparent: true, 
        animationType: "fade" as const
      };

  return (
    <Modal {...modalProps}>
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
              placeholderTextColor={Colors[colorScheme!].text}
              value={name}
              onChangeText={setName}
            />
            <ThemedText style={styles.genderLabel}>جنسیت خود را انتخاب کنید</ThemedText>
            <View style={styles.genderContainer}>
              <Pressable
                style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
                onPress={() => setGender('male')}
              >
                <ThemedText style={[styles.genderText, gender === 'male' && styles.genderTextSelected]}>آقا</ThemedText>
              </Pressable>
              <Pressable
                style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
                onPress={() => setGender('female')}
              >
                <ThemedText style={[styles.genderText, gender === 'female' && styles.genderTextSelected]}>خانوم</ThemedText>
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
    writingDirection: 'ltr',
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
  genderTextSelected: {
    color: 'rgba(0, 0, 0, 0.6)',
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
