import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getCategories, getPoems } from '@/services/dataService';
import { getCompletedPoems } from '@/services/progressService';
import { Category, Poem } from '@/types/shahname';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>اشعار تکمیل شده</ThemedText>
        
        {poems.length === 0 ? (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>هنوز هیچ شعری را تکمیل نکرده‌اید</ThemedText>
          </ThemedView>
        ) : (
          poems.map((poem) => (
            <Pressable 
              key={poem.id} 
              onPress={() => router.push(`/reading/${poem.id}`)}
              style={styles.poemItem}
            >
              <ThemedView>
                <ThemedText style={styles.poemText}>{poem.title}</ThemedText>
                <ThemedText style={styles.categoryText}>{getCategoryName(poem.cat_id)}</ThemedText>
              </ThemedView>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  poemItem: {
    marginBottom: 12,
  },
  poemText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
});