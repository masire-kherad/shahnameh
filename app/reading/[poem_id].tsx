import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Pressable, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoem } from '@/services/dataService';
import {
  markPoemAsComplete,
  getCompletedPoems,
  unmarkPoemAsComplete,
  isFavorite,
  addFavorite,
  removeFavorite,
} from '@/services/progressService';
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
  const [isFav, setIsFav] = useState(false);

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

      const favoriteStatus = await isFavorite(poemIdNum);
      setIsFav(favoriteStatus);

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

  const handleToggleComplete = async () => {
    const poemIdNum = Number(poem_id);
    if (isNaN(poemIdNum)) {
      return;
    }
    if (isCompleted) {
      await unmarkPoemAsComplete(poemIdNum);
    } else {
      await markPoemAsComplete(poemIdNum);
    }
    setIsCompleted(!isCompleted);
  };

  const handleToggleFavorite = async () => {
    const poemIdNum = Number(poem_id);
    if (isNaN(poemIdNum)) {
      return;
    }
    if (isFav) {
      await removeFavorite(poemIdNum);
    } else {
      await addFavorite(poemIdNum);
    }
    setIsFav(!isFav);
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

        <View style={styles.actionsContainer}>
          <Pressable
            style={[styles.button, styles.completeButton, isCompleted && styles.unCompleteButton]}
            onPress={handleToggleComplete}
          >
            <ThemedText style={styles.buttonText}>
              {isCompleted ? 'علامت به عنوان تکمیل نشده' : 'تکمیل'}
            </ThemedText>
          </Pressable>
          <Pressable style={styles.button} onPress={handleToggleFavorite}>
            <IconSymbol name="heart.fill" size={24} color={isFav ? '#e74c3c' : '#fff'} />
          </Pressable>
        </View>
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 48,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#6EBF8B',
    flex: 1,
    marginRight: 8,
  },
  unCompleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
