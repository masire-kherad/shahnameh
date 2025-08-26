import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Pressable, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoem } from '@/services/dataService';
import { markPoemAsComplete, getCompletedPoems } from '@/services/progressService';
import { Poem, Verse } from '@/types/shahname';
import { IconSymbol } from '@/components/ui/IconSymbol';

type Couplet = {
  line1: string;
  line2: string;
};

export default function ReadingScreen() {
  const { poem_id } = useLocalSearchParams();
  const router = useRouter();
  const [poem, setPoem] = useState<Poem | null>(null);
  const [couplets, setCouplets] = useState<Couplet[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const poemIdNum = Number(poem_id);
      if (isNaN(poemIdNum)) {
        return;
      }

      const completedPoems = await getCompletedPoems();
      if (completedPoems[poemIdNum]) {
        setIsCompleted(true);
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
    };
    loadData();
  }, [poem_id]);

  const handleComplete = async () => {
    const poemIdNum = Number(poem_id);
    if (isNaN(poemIdNum)) {
      return;
    }
    await markPoemAsComplete(poemIdNum);
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
    <ImageBackground
      source={require('@/assets/images/rostam.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <Stack.Screen options={{ title: poem.title }} />
      <ScrollView>
        {isCompleted && (
          <ThemedView style={styles.headerContainer}>
            <IconSymbol name="checkmark.circle.fill" size={24} color={'#6EBF8B'} />
            <ThemedText>خوانده شده</ThemedText>
          </ThemedView>
        )}
        <View style={styles.coupletsContainer}>
          {couplets.map((couplet, index) => (
            <ThemedView key={index} style={styles.couplet}>
              <ThemedText style={styles.verseText}>{couplet.line1}</ThemedText>
              <ThemedText style={styles.verseText}>{couplet.line2}</ThemedText>
            </ThemedView>
          ))}
        </View>

        <Pressable style={styles.completeButton} onPress={handleComplete}>
          <ThemedText style={styles.completeButtonText}>تکمیل</ThemedText>
        </Pressable>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  coupletsContainer: {
    marginBottom: 24,
  },
  couplet: {
    marginBottom: 16,
    padding: 12,
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
