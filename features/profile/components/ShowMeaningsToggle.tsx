import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

interface Props {
  checked: boolean;
  onToggle: () => void;
}

export function ShowMeaningsToggle({ checked, onToggle }: Props) {
  return (
    <Pressable style={styles.container} onPress={onToggle}>
      <View style={[styles.row, { flexDirection: Platform.OS !== 'android' ? 'row-reverse' : 'row' }]}>
        <View style={[styles.checkbox, checked && styles.checked]}>
          {checked && <IconSymbol name="checkmark" size={16} color="#fff" />}
        </View>
        <ThemedText style={styles.label}>نمایش معانی اشعار</ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  checked: {
    backgroundColor: '#3498db',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
