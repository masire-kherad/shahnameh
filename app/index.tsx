import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, useWindowDimensions, Platform } from 'react-native';
import { getCategories, getPoems } from '@/services/dataService';
import { Category, Poem } from '@/types/shahname';
import { useProgress } from '@/hooks/useProgress';
import Roadmap from '@/components/Roadmap';

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [poems, setPoems] = useState<Poem[]>([]);
  const { completedPoems } = useProgress();
  const { width } = useWindowDimensions();
  const containerWidth = Platform.OS === 'web' ? Math.min(width, 420) : width;

  useEffect(() => {
    const loadData = () => {
      const categoriesData = getCategories();
      const poemsData = getPoems();
      setCategories(categoriesData);
      setPoems(poemsData);
    };
    loadData();
  }, []);

  return (
    <ImageBackground
      source={require('@/assets/images/bg.png')}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <Roadmap categories={categories} poems={poems} completedPoems={completedPoems} width={containerWidth} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
