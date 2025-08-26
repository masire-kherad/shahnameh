import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Pressable, ImageBackground, ImageSourcePropType } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoems, getCategories } from '@/services/dataService';
import { getCompletedPoems, CompletedPoems } from '@/services/progressService';
import { Poem, Category } from '@/types/shahname';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import BendedRoad from '@/components/BendedRoad';

const categoryImages: { [key: string]: any } = {
  aghaz: require('@/assets/images/Person/Ferdousi.png'),
  qmars: require('@/assets/images/Person/Qmars.png'),
  hushang: require('@/assets/images/Person/Hooshang.png'),
  tahmoores: require('@/assets/images/Person/Tahmores.png'),
  jamshid: require('@/assets/images/Person/Jamshid.png'),
  zahak: require('@/assets/images/Person/Zahak.png'),
  fereydoon: require('@/assets/images/Person/Fereidoon.png'),
  manoochehr: require('@/assets/images/Person/Manoochehr.png'),
  nozar: require('@/assets/images/Person/Nozar.png'),
  zutahmasb: require('@/assets/images/Person/ZooTahmasp.png'),
  garshasp: require('@/assets/images/Person/Garshasp.png'),
  kqobad: require('@/assets/images/Person/Kqobad.png'),
};

const defaultImage = require('@/assets/images/icon.png');

const getCategoryImage = (category: Category) => {
  const key = category.url.split('/').pop();
  if (key && categoryImages[key]) {
    return categoryImages[key];
  }
  return defaultImage;
};

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
    color: '#FFFFFF',
  },
});
