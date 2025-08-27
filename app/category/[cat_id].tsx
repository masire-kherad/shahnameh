import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Pressable, ImageSourcePropType } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoems, getCategories } from '@/services/dataService';
import { getCompletedPoems, CompletedPoems } from '@/services/progressService';
import { Poem } from '@/types/shahname';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import BendedRoad from '@/components/BendedRoad';
import { defaultImage, getCategoryImage } from '@/services/personLoader';


export default function CategoryScreen() {
  const { cat_id } = useLocalSearchParams();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [completedPoems, setCompletedPoems] = useState<CompletedPoems>({});
  const [categoryImage, setCategoryImage] = useState<ImageSourcePropType>(defaultImage);

  useEffect(() => {
    const loadData = async () => {
      if (cat_id) {
        const poemsData = getPoems();
        const categoriesData = getCategories();
        const category = categoriesData.find(c => c.id === Number(cat_id));
        if (category) {
          setCategoryName(category.text);
          setCategoryImage(getCategoryImage(category));
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
    <BendedRoad imageSource={categoryImage}>
      <View style={styles.container}>
        <View style={styles.overlay} />
        <Stack.Screen options={{ title: categoryName }} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
      </View>
    </BendedRoad>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scrollViewContent: {
    padding: 16,
  },
  poemItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  completedPoemItem: {
    backgroundColor: 'rgba(110, 191, 139, 0.7)',
  },
  poemText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f0f0f0',
  },
});
