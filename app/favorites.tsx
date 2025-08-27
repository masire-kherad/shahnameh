import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, ImageBackground, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoems, getCategories } from '@/services/dataService';
import { useProgress } from '@/hooks/useProgress';
import { Poem, Category } from '@/types/shahname';
import { router } from 'expo-router';

export default function FavoritesScreen() {
  const { favoritePoems } = useProgress();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const poemsData = getPoems();
    const categoriesData = getCategories();
    const favoritePoemsList = poemsData.filter(poem => favoritePoems[poem.id]);
    setPoems(favoritePoemsList);
    setCategories(categoriesData);
  }, [favoritePoems]);

  const getCategoryName = (catId: number) => {
    const category = categories.find(c => c.id === catId);
    return category ? category.text : '';
  };

  return (
    <ImageBackground
      source={require('@/assets/images/Person/Ferdousi.png')}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <ScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={{ padding: 15 }}>علاقه‌مندی‌ها</ThemedText>
        </ThemedView>

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
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  poemItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#3498db',
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
});
