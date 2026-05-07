import BendedRoad from '@/components/BendedRoad';
import HorizontalProgressBar from '@/components/HorizontalProgressBar';
import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Poem } from '@/types/shahname';
import { Stack } from 'expo-router';
import React from 'react';
import {
    ImageSourcePropType,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { Couplet } from '../hooks/useReading';

interface ReadingScreenProps {
  poem: Poem | null;
  couplets: Couplet[];
  categoryImage: ImageSourcePropType;
  showMeanings: boolean;
  isLoading: boolean;
  scrollProgress: number;
  isCompleted: boolean;
  isFav: boolean;
  handleToggleComplete: () => void;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleToggleFavorite: () => void;
}

export function ReadingScreen({
  poem,
  couplets,
  categoryImage,
  showMeanings,
  isLoading,
  scrollProgress,
  isCompleted,
  isFav,
  handleToggleComplete,
  handleScroll,
  handleToggleFavorite,
}: ReadingScreenProps) {
  // ── Loading state ──
  if (isLoading) {
    return <Loading message="در حال بارگذاری شعر..." />;
  }

  // ── Not found state ──
  if (!poem) {
    return (
      <NotFound
        title="شعر مورد نظر یافت نشد"
        message="متأسفانه شعری که به دنبال آن بودید یافت نشد."
      />
    );
  }

  // ── Main render ──
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
              <IconSymbol
                name="checkmark.circle.fill"
                size={24}
                color={'#6EBF8B'}
              />
              <ThemedText style={styles.headerText}>خوانده شده</ThemedText>
            </ThemedView>
          )}

          <View style={styles.coupletsContainer}>
            {couplets.map((couplet, index) => (
              <ThemedView key={index} style={styles.couplet}>
                <ThemedText style={styles.verseText1}>
                  {couplet.line1}
                </ThemedText>
                <ThemedText style={styles.verseText2}>
                  {couplet.line2}
                </ThemedText>
                {showMeanings && (
                  <ThemedView style={styles.summaryContainer}>
                    <ThemedText style={styles.summaryText}>
                      {couplet.summary}
                    </ThemedText>
                  </ThemedView>
                )}
              </ThemedView>
            ))}
          </View>

          <View style={styles.actionsContainer}>
            <Pressable
              style={[
                styles.button,
                styles.completeButton,
                isCompleted && styles.unCompleteButton,
              ]}
              onPress={handleToggleComplete}
            >
              <ThemedText style={styles.buttonText}>
                {isCompleted
                  ? 'علامت به عنوان تکمیل نشده'
                  : 'تکمیل'}
              </ThemedText>
            </Pressable>
            <Pressable style={styles.button} onPress={handleToggleFavorite}>
              <IconSymbol
                name="heart.fill"
                size={24}
                color={isFav ? '#e74c3c' : '#fff'}
              />
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </BendedRoad>
  );
}

// ── Styles (identical to original) ──
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
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
});
