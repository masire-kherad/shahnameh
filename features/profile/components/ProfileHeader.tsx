import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

interface Props {
  name: string;
  gender: 'male' | 'female';
  onEdit: () => void;
}

const AVATARS: Record<string, any> = {
  male: require('@/assets/images/MaleUser.png'),
  female: require('@/assets/images/FemaleUser.png'),
  default: require('@/assets/images/Person/Ferdousi.png'),
};

export function ProfileHeader({ name, gender, onEdit }: Props) {
  const avatarSource = AVATARS[gender] || AVATARS.default;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={avatarSource} style={styles.image} />
        <Pressable onPress={onEdit} style={styles.editButton}>
          <IconSymbol name="pencil" size={20} color="#fff" />
        </Pressable>
      </View>
      <ThemedText type="title" style={styles.name}>
        {name || 'پروفایل'}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#ffd700',
    marginBottom: 16,
  },
  editButton: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
