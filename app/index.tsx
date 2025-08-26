import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoems } from '@/services/dataService';
import { getCompletedPoems, CompletedPoems } from '@/services/progressService';
import { Poem } from '@/types/shahname';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [completedPoems, setCompletedPoems] = useState<CompletedPoems>({});
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadData = async () => {
      const poemsData = getPoems();
      const completedData = await getCompletedPoems();
      setPoems(poemsData);
      setCompletedPoems(completedData);
    };
    loadData();
  }, []);

  const handlePoemPress = (poemId: number) => {
    router.push(`/reading/${poemId}`);
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">شاهنامه</ThemedText>
        <Pressable onPress={handleProfilePress}>
          <IconSymbol name="person.fill" size={28} color={Colors[colorScheme ?? 'light'].text} />
        </Pressable>
      </ThemedView>
      <ScrollView>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
