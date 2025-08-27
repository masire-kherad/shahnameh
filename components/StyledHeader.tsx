import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

interface StyledHeaderProps {
  title: string;
}

export default function StyledHeader({ title }: StyledHeaderProps) {
  return (
    <View style={styles.header}>
      <ThemedText type="title">{title}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
