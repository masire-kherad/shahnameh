import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getCategories } from '@/services/dataService';
import { Category } from '@/types/shahname';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Roadmap from '@/components/Roadmap';

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadData = () => {
      const categoriesData = getCategories();
      setCategories(categoriesData);
    };
    loadData();
  }, []);

  const handleProfilePress = () => {
    router.push('/profile');
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">شاهنامه</ThemedText>
        <Pressable onPress={handleProfilePress}>
          <IconSymbol name="person.fill" size={28} color={Colors[colorScheme ?? 'light'].text} />
        </Pressable>
      </ThemedView>
      <Roadmap categories={categories} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
});
