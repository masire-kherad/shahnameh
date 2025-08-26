import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getRoadmap } from '@/services/dataService';
import { getCompletedPoems, CompletedPoems } from '@/services/progressService';
import { Category, Poem } from '@/types/shahname';
import { View as MotiView } from 'moti';
import { router } from 'expo-router';

// Define the type for the roadmap data with poems included
type RoadmapSection = Category & {
  poems: Poem[];
};

export default function HomeScreen() {
  const [roadmap, setRoadmap] = useState<RoadmapSection[]>([]);
  const [completedPoems, setCompletedPoems] = useState<CompletedPoems>({});

  useEffect(() => {
    const loadData = async () => {
      const roadmapData = getRoadmap();
      const completedData = await getCompletedPoems();
      setRoadmap(roadmapData);
      setCompletedPoems(completedData);
    };
    loadData();
  }, []);

  const handlePoemPress = (poemId: number) => {
    router.push(`/reading/${poemId}`);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">شاهنامه</ThemedText>
      </ThemedView>

      {roadmap.map((section) => (
        <View key={section.id} style={styles.sectionContainer}>
          <ThemedText type="subtitle">{section.text}</ThemedText>
          <View style={styles.poemContainer}>
            {section.poems.map((poem, poemIndex) => {
              const isCompleted = completedPoems[poem.id];
              return (
                <Pressable key={poem.id} onPress={() => handlePoemPress(poem.id)}>
                  <MotiView
                    from={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: poemIndex * 100 }}
                    style={[styles.poemNode, isCompleted && styles.completedPoemNode]}
                  >
                    <Text style={styles.poemText}>{poemIndex + 1}</Text>
                  </MotiView>
                </Pressable>
              );
            })}
          </View>
        </View>
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
  sectionContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  poemContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  poemNode: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#A1CEDC', // Incomplete color
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completedPoemNode: {
    backgroundColor: '#6EBF8B', // Completed color
  },
  poemText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
