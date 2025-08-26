import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getCategories } from '@/services/dataService';
import { Category } from '@/types/shahname';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

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

  const handleCategoryPress = (catId: number) => {
    router.push(`/category/${catId}`);
  };

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
      <ScrollView>
        {categories.map((category) => {
          return (
            <Pressable key={category.id} onPress={() => handleCategoryPress(category.id)}>
              <ThemedView style={styles.categoryItem}>
                <Text style={styles.categoryText}>{category.text}</Text>
              </ThemedView>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#A1CEDC',
  },
  categoryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
