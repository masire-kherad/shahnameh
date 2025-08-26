import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, ImageBackground } from 'react-native';
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
    <ImageBackground
      source={require('@/assets/images/rostam.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <ScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">اشعار تکمیل شده</ThemedText>
        </ThemedView>

        {poems.map((poem) => (
          <ThemedView key={poem.id} style={styles.poemItem}>
            <ThemedText style={styles.poemText}>{poem.title}</ThemedText>
          </ThemedView>
        ))}
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  poemItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#6EBF8B',
  },
  poemText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
