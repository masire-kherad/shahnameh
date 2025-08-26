import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoems } from '@/services/dataService';
import { getCompletedPoems, CompletedPoems } from '@/services/progressService';
import { Poem } from '@/types/shahname';

export default function ProfileScreen() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [completedPoems, setCompletedPoems] = useState<CompletedPoems>({});

  useEffect(() => {
    const loadData = async () => {
      const poemsData = getPoems();
      const completedData = await getCompletedPoems();
      const completedPoemsList = poemsData.filter(poem => completedData[poem.id]);
      setPoems(completedPoemsList);
    };
    loadData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Completed Poems</ThemedText>
      </ThemedView>

      {poems.map((poem) => (
        <ThemedView key={poem.id} style={styles.poemItem}>
          <Text style={styles.poemText}>{poem.title}</Text>
        </ThemedView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  poemItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#6EBF8B', // Completed color
  },
  poemText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
