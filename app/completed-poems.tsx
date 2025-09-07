import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, ImageBackground, Pressable, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoems, getCategories } from '@/services/dataService';
import { getCompletedPoems } from '@/services/progressService';
import { Poem, Category } from '@/types/shahname';
import { router } from 'expo-router';

export default function CompletedPoemsScreen() {
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
      source={require('@/assets/images/Person/Ferdousi.png')}
      style={[styles.container, Platform.OS === 'web' ? {
        width: '100%',
        height: '100%',
      } : {}]}
    >
      <View style={styles.overlay} />
      <ScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={{ padding: 15 }}>اشعار تکمیل شده</ThemedText>
        </ThemedView>

        {poems.length === 0 ? (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>هنوز هیچ شعری را تکمیل نکرده‌اید</ThemedText>
          </ThemedView>
        ) : (
          poems.map((poem) => (
            <Pressable key={poem.id} onPress={() => router.push(`/reading/${poem.id}`)}>
              <ThemedView style={styles.poemItem}>
                <ThemedText style={styles.poemText}>{poem.title}</ThemedText>
                <ThemedText style={styles.categoryText}>{getCategoryName(poem.cat_id)}</ThemedText>
              </ThemedView>
            </Pressable>
          ))
        )}
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    margin: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
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
    color: '#fff',
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    color: '#fff',
  },
});