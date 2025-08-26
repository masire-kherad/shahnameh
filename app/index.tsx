import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getCategories, getPoems } from '@/services/dataService';
import { Category, Poem } from '@/types/shahname';
import { router } from 'expo-router';
import { getCompletedPoems, CompletedPoems } from '@/services/progressService';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Roadmap from '@/components/Roadmap';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [poems, setPoems] = useState<Poem[]>([]);
  const [completedPoems, setCompletedPoems] = useState<CompletedPoems>({});
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

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

  const handleProfilePress = () => {
    router.push('/profile');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/rostam.jpg')}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.overlay} />
      <ThemedView style={styles.header}>
        <ThemedText type="title">شاهنامه</ThemedText>
        <Pressable onPress={handleProfilePress}>
          <IconSymbol name="person.fill" size={28} color={Colors[colorScheme ?? 'light'].text} />
        </Pressable>
      </ThemedView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
});
