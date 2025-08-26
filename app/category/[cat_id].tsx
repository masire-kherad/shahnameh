import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoems } from '@/services/dataService';
import { getCompletedPoems, CompletedPoems } from '@/services/progressService';
import { Poem } from '@/types/shahname';
import { router, useLocalSearchParams } from 'expo-router';

export default function CategoryScreen() {
  const { cat_id } = useLocalSearchParams();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [completedPoems, setCompletedPoems] = useState<CompletedPoems>({});

  useEffect(() => {
    const loadData = async () => {
      if (cat_id) {
        const poemsData = getPoems();
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
    <ScrollView style={styles.container}>
      {poems.map((poem, index) => {
        const isCompleted = completedPoems[poem.id];
        return (
          <Pressable key={poem.id} onPress={() => handlePoemPress(poem.id)}>
            <ThemedView style={[styles.poemItem, isCompleted ? styles.completedPoemItem : {}]}>
              <Text style={styles.poemText}>{poem.title}</Text>
            </ThemedView>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  poemItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#A1CEDC', // Incomplete color
  },
  completedPoemItem: {
    backgroundColor: '#6EBF8B', // Completed color
  },
  poemText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
