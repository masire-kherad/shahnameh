import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface Props {
  isAvailable: boolean;
  onClaim: () => void;
}

export function DailyReward({ isAvailable, onClaim }: Props) {
  return (
    <Pressable
      style={[styles.button, !isAvailable && styles.disabled]}
      onPress={onClaim}
      disabled={!isAvailable}
    >
      <ThemedText style={styles.text}>
        {isAvailable ? 'دریافت پاداش روزانه' : 'پاداش امروز را دریافت کرده‌اید'}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom:32,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabled: {
    backgroundColor: '#7f8c8d',
  },
  text: {
    color: '#f0f0f0',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
