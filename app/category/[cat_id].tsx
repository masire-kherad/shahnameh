import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Pressable, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoems, getCategories } from '@/services/dataService';
import { getCompletedPoems, CompletedPoems } from '@/services/progressService';
import { Poem } from '@/types/shahname';
import { router, useLocalSearchParams, Stack } from 'expo-router';

export default function CategoryScreen() {
  const { cat_id } = useLocalSearchParams();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [completedPoems, setCompletedPoems] = useState<CompletedPoems>({});

  useEffect(() => {
    const loadData = async () => {
      if (cat_id) {
        const poemsData = getPoems();
        const categoriesData = getCategories();
        const category = categoriesData.find(c => c.id === Number(cat_id));
        if (category) {
          setCategoryName(category.text);
        }
        const filteredPoems = poemsData.filter(p => p.cat_id === Number(cat_id));
        const completedData = await getCompletedPoems();
        setPoems(filteredPoems);
        setCompletedPoems(completedData);
      }
    };
    loadData();
  }, [cat_id]);

  const handlePoemPress = (poemId: number) => {
    router.push(`/reading/${poemId}`);
  };

  return (
    <ImageBackground
      source={require('@/assets/images/rostam.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <Stack.Screen options={{ title: categoryName }} />
      <ScrollView>
        {poems.map((poem, index) => {
          const isCompleted = completedPoems[poem.id];
          return (
            <Pressable key={poem.id} onPress={() => handlePoemPress(poem.id)}>
              <ThemedView style={[styles.poemItem, isCompleted ? styles.completedPoemItem : {}]}>
                <ThemedText style={styles.poemText}>{poem.title}</ThemedText>
              </ThemedView>
            </Pressable>
          );
        })}
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
  poemItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  completedPoemItem: {
    backgroundColor: '#6EBF8B', // Completed color remains the same
  },
  poemText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
