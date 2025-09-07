import BendedRoad from '@/components/BendedRoad';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useProgress } from '@/hooks/useProgress';
import { getCategories, getPoems } from '@/services/dataService';
import { defaultImage, getCategoryImage } from '@/services/personLoader';
import { getScenario } from '@/services/scenarioLoader';
import { Category, Poem } from '@/types/shahname';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageSourcePropType, Pressable, ScrollView, StyleSheet, View } from 'react-native';


export default function CategoryScreen() {
  const { cat_id } = useLocalSearchParams();
  const { completedPoems } = useProgress();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isScenarioAvailable, setIsScenarioAvailable] = useState(false);
  const [categoryImage, setCategoryImage] = useState<ImageSourcePropType>(defaultImage);

  useEffect(() => {
    if (cat_id) {
      const poemsData = getPoems();
      const categoriesData = getCategories();
      const currentCategory = categoriesData.find(c => c.id === Number(cat_id));
      if (currentCategory) {
        setCategory(currentCategory);
        setCategoryImage(getCategoryImage(currentCategory));
        const scenario = getScenario(currentCategory.image);
        setIsScenarioAvailable(scenario !== null);
      }
      const filteredPoems = poemsData.filter(p => p.cat_id === Number(cat_id));
      setPoems(filteredPoems);
    }
  }, [cat_id]);

  const handlePoemPress = (poemId: number) => {
    router.push(`/reading/${poemId}`);
  };

  const handlePlayPress = () => {
    router.push(`/scenario/${cat_id}`);
  };

  return (
    <BendedRoad imageSource={categoryImage}>
      <View style={styles.container}>
        <View style={styles.overlay} />
        <Stack.Screen options={{ title: category?.text ?? 'فهرست اشعار' }} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
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
        {category?.text !== 'آغاز کتاب' && (
        <Pressable
          style={[styles.playButton, !isScenarioAvailable && styles.disabledButton]}
          onPress={handlePlayPress}
          disabled={!isScenarioAvailable}
        >
          <ThemedText style={styles.playButtonText}>چالش</ThemedText>
        </Pressable>
        )}
      </View>
    </BendedRoad>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 80, // Add padding to the bottom to avoid overlap with the button
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
  playButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f0f0f0',
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
});
