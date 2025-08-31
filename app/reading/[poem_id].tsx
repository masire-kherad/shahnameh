import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Pressable, ImageSourcePropType, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoemWithSummary, getCategories } from '@/services/dataService';
import { Poem, } from '@/types/shahname';
import { IconSymbol } from '@/components/ui/IconSymbol';
import BendedRoad from '@/components/BendedRoad';
import { defaultImage, getCategoryImage, getCharacterAnimation } from '@/services/personLoader';
import { useProgress } from '@/hooks/useProgress';
import { useThemeColor } from '@/hooks/useThemeColor';
import HorizontalProgressBar from '@/components/HorizontalProgressBar';
import LottieAnimation from '@/components/LottieAnimation';

type Couplet = {
  line1: string;
  line2: string;
  summary: string;
};


export default function ReadingScreen() {
  const { poem_id } = useLocalSearchParams();
  const [poem, setPoem] = useState<Poem | null>(null);
  const [couplets, setCouplets] = useState<Couplet[]>([]);
  const [categoryImage, setCategoryImage] = useState<ImageSourcePropType>(defaultImage);
  const [characterAnimation, setCharacterAnimation] = useState<any | null>(null);
  const { completedPoems, favoritePoems, markPoemAsComplete, unmarkPoemAsComplete, addFavorite, removeFavorite } =
    useProgress();
  const [scrollProgress, setScrollProgress] = useState(0);

  const poemIdNum = Number(poem_id);
  const isCompleted = completedPoems[poemIdNum];
  const isFav = favoritePoems[poemIdNum];
  const overlayColor = useThemeColor({ light: 'rgba(0,0,0,0.5)', dark: 'rgba(0,0,0,0.5)' }, 'overlay');

  useEffect(() => {
    const loadData = async () => {
      if (isNaN(poemIdNum)) {
        return;
      }

      const currentPoem = getPoemWithSummary(poemIdNum);

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
          setCharacterAnimation(getCharacterAnimation(category));
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

  const renderContent = () => (
    <View style={styles.container}>
      <Stack.Screen options={{ title: poem.title }} />
      <HorizontalProgressBar progress={scrollProgress} />
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16} style={{ paddingVertical: 20 }}>
        {isCompleted && (
          <ThemedView style={styles.headerContainer}>
            <IconSymbol name="checkmark.circle.fill" size={24} color={'#6EBF8B'} />
            <ThemedText style={styles.headerText}>خوانده شده</ThemedText>
          </ThemedView>
        )}
        <View style={styles.coupletsContainer}>
          {couplets.map((couplet, index) => (
            <ThemedView key={index} style={styles.couplet}>
              <ThemedText style={styles.verseText}>{couplet.line1}</ThemedText>
              <ThemedText style={styles.verseText}>{couplet.line2}</ThemedText>
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
    </View>
  );

  if (characterAnimation) {
    return (
      <LottieAnimation animationPath={characterAnimation} progress={scrollProgress}>
        <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
        {renderContent()}
      </LottieAnimation>
    );
  }

  return (
    <BendedRoad imageSource={categoryImage}>
      {renderContent()}
    </BendedRoad>
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
    backgroundColor: 'transparent',
  },
  headerText: {
    color: '#fff',
  },
  coupletsContainer: {
    marginBottom: 24,
    writingDirection: 'ltr',
  },
  couplet: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    borderEndWidth: 4,
    borderEndColor: '#A1CEDC',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  verseText: {
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'right',
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
});
