import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoem } from '@/services/dataService';
import { markPoemAsComplete, addScore } from '@/services/progressService';
import { Poem, Verse } from '@/types/shahname';

type Couplet = {
  line1: string;
  line2: string;
};

export default function ReadingScreen() {
  const { poem_id } = useLocalSearchParams();
  const router = useRouter();
  const [poem, setPoem] = useState<Poem | null>(null);
  const [couplets, setCouplets] = useState<Couplet[]>([]);

  useEffect(() => {
    const poemIdNum = Number(poem_id);
    if (isNaN(poemIdNum)) {
      return;
    }

    const currentPoem = getPoem(poemIdNum);

    if (currentPoem) {
      setPoem(currentPoem);
      const poemVerses = currentPoem.verses.sort((a, b) => a.vorder - b.vorder);

      const groupedCouplets: Couplet[] = [];
      for (let i = 0; i < poemVerses.length; i += 2) {
        groupedCouplets.push({
          line1: poemVerses[i]?.text || '',
          line2: poemVerses[i + 1]?.text || '',
        });
      }
      setCouplets(groupedCouplets);
    }
  }, [poem_id]);

  const handleComplete = async () => {
    const poemIdNum = Number(poem_id);
    if (isNaN(poemIdNum)) {
      return;
    }
    await markPoemAsComplete(poemIdNum);
    await addScore(10); // Award 10 points
    router.back();
  };

  if (!poem) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Poem not found!</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title">{poem.title}</ThemedText>
      </ThemedView>

      <View style={styles.coupletsContainer}>
        {couplets.map((couplet, index) => (
          <View key={index} style={styles.couplet}>
            <ThemedText style={styles.verseText}>{couplet.line1}</ThemedText>
            <ThemedText style={styles.verseText}>{couplet.line2}</ThemedText>
          </View>
        ))}
      </View>

      <Pressable style={styles.completeButton} onPress={handleComplete}>
        <ThemedText style={styles.completeButtonText}>تکمیل</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  coupletsContainer: {
    marginBottom: 24,
  },
  couplet: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderRightWidth: 4,
    borderRightColor: '#A1CEDC',
  },
  verseText: {
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'right',
  },
  completeButton: {
    backgroundColor: '#6EBF8B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 48,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
