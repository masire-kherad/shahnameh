import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet, Modal } from 'react-native';
import { ThemedText } from './ThemedText';

interface UserInfoModalProps {
  visible: boolean;
  onClose: (name: string, gender: 'male' | 'female') => void;
}

export default function UserInfoModal({ visible, onClose }: UserInfoModalProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  const handleClose = () => {
    if (name && gender) {
      onClose(name, gender);
    }
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ThemedText type="title">اطلاعات شما</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="نام خود را وارد کنید"
            value={name}
            onChangeText={setName}
          />
          <ThemedText>جنسیت خود را انتخاب کنید</ThemedText>
          <View style={styles.genderContainer}>
            <Pressable onPress={() => setGender('male')}>
              <Image
                source={require('@/assets/images/MaleUser.png')}
                style={[styles.genderImage, gender === 'male' && styles.selectedGender]}
              />
            </Pressable>
            <Pressable onPress={() => setGender('female')}>
              <Image
                source={require('@/assets/images/FemaleUser.png')}
                style={[styles.genderImage, gender === 'female' && styles.selectedGender]}
              />
            </Pressable>
          </View>
          <Pressable style={styles.button} onPress={handleClose}>
            <ThemedText style={styles.buttonText}>ذخیره</ThemedText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: 200,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 200,
    marginVertical: 10,
  },
  genderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  selectedGender: {
    borderColor: '#007BFF',
    borderWidth: 3,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
  },
});
