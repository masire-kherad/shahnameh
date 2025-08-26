import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getCategories, getPoems } from '@/services/dataService';
import { Category, Poem } from '@/types/shahname';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { getCompletedPoems, CompletedPoems } from '@/services/progressService';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Roadmap from '@/components/Roadmap';

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [poems, setPoems] = useState<Poem[]>([]);
  const [completedPoems, setCompletedPoems] = useState<CompletedPoems>({});
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadData = async () => {
      const categoriesData = getCategories();
      const poemsData = getPoems();
      const completedData = await getCompletedPoems();
      setCategories(categoriesData);
      setPoems(poemsData);
      setCompletedPoems(completedData);
    };
    loadData();
  }, []);

  return (
    <ImageBackground
      source={require('@/assets/images/bg.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <Roadmap categories={categories} poems={poems} completedPoems={completedPoems} />
    </ImageBackground>
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
});
