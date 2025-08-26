import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, ImageBackground, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoems, getCategories } from '@/services/dataService';
import { getCompletedPoems, CompletedPoems } from '@/services/progressService';
import { Poem, Category } from '@/types/shahname';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const poemsData = getPoems();
      const categoriesData = getCategories();
      const completedData = await getCompletedPoems();
      const completedPoemsList = poemsData.filter(poem => completedData[poem.id]);
      setPoems(completedPoemsList);
      setCategories(categoriesData);
    };
    loadData();
  }, []);

  const getCategoryName = (catId: number) => {
    const category = categories.find(c => c.id === catId);
    return category ? category.text : '';
  };

  return (
    <ImageBackground
      source={require('@/assets/images/rostam.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <ScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">اشعار تکمیل شده</ThemedText>
        </ThemedView>

        <Pressable style={styles.favoritesButton} onPress={() => router.push('/favorites')}>
          <ThemedText style={styles.favoritesButtonText}>علاقه‌مندی‌ها</ThemedText>
        </Pressable>

        {poems.map((poem) => (
          <Pressable key={poem.id} onPress={() => router.push(`/reading/${poem.id}`)}>
            <ThemedView style={styles.poemItem}>
              <ThemedText style={styles.poemText}>{poem.title}</ThemedText>
              <ThemedText style={styles.categoryText}>{getCategoryName(poem.cat_id)}</ThemedText>
            </ThemedView>
          </Pressable>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  poemItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#6EBF8B',
  },
  poemText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  favoritesButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  favoritesButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
