import AudioPlayer from '@/components/AudioPlayer';
import BendedRoad from '@/components/BendedRoad';
import HorizontalProgressBar from '@/components/HorizontalProgressBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useProgress } from '@/hooks/useProgress';
import { getCategories, getPoemAudio, getPoemWithSummary } from '@/services/dataService';
import { defaultImage, getCategoryImage } from '@/services/personLoader';
import { Poem, } from '@/types/shahname';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageSourcePropType, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, View } from 'react-native';

type Couplet = {
  line1: string;
  line2: string;
  summary: string;
};


export default function ReadingScreen() {
  const router = useRouter();
  const { poem_id } = useLocalSearchParams();
  const [poem, setPoem] = useState<Poem | null>(null);
  const [couplets, setCouplets] = useState<Couplet[]>([]);
  const [audio, setAudio] = useState<any>(null);
  const [categoryImage, setCategoryImage] = useState<ImageSourcePropType>(defaultImage);
  const { completedPoems, favoritePoems, markPoemAsComplete, unmarkPoemAsComplete, addFavorite, removeFavorite } =
    useProgress();
  const [scrollProgress, setScrollProgress] = useState(0);

  const poemIdNum = Number(poem_id);
  const isCompleted = completedPoems[poemIdNum];
  const isFav = favoritePoems[poemIdNum];

  useEffect(() => {
    const loadData = async () => {
      if (isNaN(poemIdNum)) {
        return;
      }

      const currentPoem = getPoemWithSummary(poemIdNum);
      const audio = getPoemAudio(poemIdNum);
      if (audio) {
        setAudio(audio);
      }

      if (currentPoem) {
        setPoem(currentPoem);
        const poemVerses = currentPoem.verses.sort((a, b) => a.vorder - b.vorder);
        const summaries = currentPoem.summaries;

        const groupedCouplets: Couplet[] = [];
        let j = 0
        for (let i = 0; i < poemVerses.length; i += 2) {
          groupedCouplets.push({
            line1: poemVerses[i]?.text || '',
            line2: poemVerses[i + 1]?.text || '',
            summary: summaries[j] || '',
          });
          j++;
        }
        setCouplets(groupedCouplets);

        const categories = getCategories();
        const category = categories.find(c => c.id === currentPoem.cat_id);
        if (category) {
          setCategoryImage(getCategoryImage(category));
        }
      }
    };
    loadData();
  }, [poem_id]);

  const handleToggleComplete = () => {
    if (isNaN(poemIdNum)) {
      return;
    }
    if (isCompleted) {
      unmarkPoemAsComplete(poemIdNum);
    } else {
      markPoemAsComplete(poemIdNum);
      // Show congratulation screen when user marks poem as complete
      router.push({
        pathname: '/congratulation',
        params: { 
          poemTitle: poem?.title || '',
          poemId: poemIdNum.toString(),
          categoryImage: JSON.stringify(categoryImage)
        }
      });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingBottom = 48;
    const scrollableHeight = contentSize.height - layoutMeasurement.height - paddingBottom;
    if (scrollableHeight > 0) {
      const progress = Math.min(1, contentOffset.y / scrollableHeight);
      setScrollProgress(progress);
    }
  };

  const handleToggleFavorite = () => {
    if (isNaN(poemIdNum)) {
      return;
    }
    if (isFav) {
      removeFavorite(poemIdNum);
    } else {
      addFavorite(poemIdNum);
    }
  };

  if (!poem) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Poem not found!</ThemedText>
      </ThemedView>
    );
  }

  return (
    <BendedRoad imageSource={categoryImage}>
      <View style={styles.container}>
        <View style={styles.overlay} />
        <Stack.Screen options={{ title: poem.title }} />
        <HorizontalProgressBar progress={scrollProgress} />
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {isCompleted && (
            <ThemedView style={styles.headerContainer}>
              <IconSymbol name="checkmark.circle.fill" size={24} color={'#6EBF8B'} />
              <ThemedText style={styles.headerText}>خوانده شده</ThemedText>
            </ThemedView>
          )}
          <View style={styles.coupletsContainer}>
            {couplets.map((couplet, index) => (
              <ThemedView key={index} style={styles.couplet}>
                <ThemedText style={styles.verseText1}>{couplet.line1}</ThemedText>
                <ThemedText style={styles.verseText2}>{couplet.line2}</ThemedText>
                <ThemedView style={styles.summaryContainer}>
                  <ThemedText style={styles.summaryText}>{couplet.summary}</ThemedText>
                </ThemedView>
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
        <View style={styles.audioPlayerContainer}>
          <AudioPlayer uri={audio?.audio_src} />
        </View>
      </View>
    </BendedRoad>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100, // Make space for the audio player
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
    backgroundColor: 'transparent',
  },
  headerText: {
    color: '#fff',
  },
  coupletsContainer: {
    marginBottom: 24,
    writingDirection: 'ltr',
    direction: 'ltr'
  },
  couplet: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    borderEndWidth: 4,
    borderEndColor: '#A1CEDC',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  verseText1: {
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'right',
    color: '#fff',
  },
  verseText2: {
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'left',
    color: '#fff',
  },
  summaryContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
    color: '#ddd',
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
    marginEnd: 8,
  },
  unCompleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  audioPlayerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});