import { useAudioTrack } from '@/contexts/AudioTrackContext';
import { useProgress } from '@/hooks/useProgress';
import { getCategories, getPoemAudio, getPoemWithSummary, getShowMeanings } from '@/services/dataService';
import { defaultImage, getCategoryImage } from '@/services/personLoader';
import { Poem } from '@/types/shahname';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ImageSourcePropType, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type Couplet = {
  line1: string;
  line2: string;
  summary: string;
};

export function useReading() {
  const router = useRouter();
  const { poem_id } = useLocalSearchParams<{ poem_id: string }>();

  const [poem, setPoem] = useState<Poem | null>(null);
  const [couplets, setCouplets] = useState<Couplet[]>([]);
  const [audio, setAudio] = useState<any>(null);
  const [categoryImage, setCategoryImage] =
    useState<ImageSourcePropType>(defaultImage);
  const [showMeanings, setShowMeanings] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { setTrack, clearTrack, isPlaying } = useAudioTrack();
  const {
    completedPoems,
    favoritePoems,
    markPoemAsComplete,
    unmarkPoemAsComplete,
    addFavorite,
    removeFavorite,
  } = useProgress();

  const hasPlayedRef = useRef(false);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const poemIdNum = Number(poem_id);
  const isCompleted = completedPoems[poemIdNum];
  const isFav = favoritePoems[poemIdNum];

  // ── Track whether user ever played audio on this screen ──
  useEffect(() => {
    if (isPlaying) {
      hasPlayedRef.current = true;
    }
  }, [isPlaying]);

  // ── Load poem data & tell global player ──
  useEffect(() => {
    // Reset per-mount
    hasPlayedRef.current = false;

    const loadData = async () => {
      if (isNaN(poemIdNum)) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const showMeaningsPref = await getShowMeanings();
        setShowMeanings(showMeaningsPref);

        const currentPoem = getPoemWithSummary(poemIdNum);
        const audioData = getPoemAudio(poemIdNum);

        if (currentPoem) {
          setPoem(currentPoem);

          // ── Global track management ──
          if (audioData) {
            setAudio(audioData);
            setTrack({
              uri: audioData.audio_src,
              title: currentPoem.title,
            });
          } else {
            clearTrack();
          }

          const poemVerses = currentPoem.verses.sort(
            (a, b) => a.vorder - b.vorder,
          );
          const summaries = currentPoem.summaries;

          const groupedCouplets: Couplet[] = [];
          let j = 0;
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
          const category = categories.find((c) => c.id === currentPoem.cat_id);
          if (category) {
            setCategoryImage(getCategoryImage(category));
          }
        }
      } catch (error) {
        console.error('Failed to load poem data', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // ── Cleanup on unmount or poem_id change ──
    return () => {
      // Use ref for latest isPlaying (avoid stale closure)
      if (!isPlayingRef.current && !hasPlayedRef.current) {
        clearTrack();
      }
    };
  }, [poem_id]);

  // ── Handlers ──
  const handleToggleComplete = useCallback(() => {
    if (isNaN(poemIdNum)) return;
    if (isCompleted) {
      unmarkPoemAsComplete(poemIdNum);
    } else {
      markPoemAsComplete(poemIdNum);
      router.push({
        pathname: '/congratulation',
        params: {
          poemTitle: poem?.title || '',
          poemId: poemIdNum.toString(),
          categoryImage: JSON.stringify(categoryImage),
        },
      });
    }
  }, [isCompleted, poemIdNum, poem?.title, categoryImage]);

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingBottom = 48;
    const scrollableHeight =
      contentSize.height - layoutMeasurement.height - paddingBottom;
    if (scrollableHeight > 0) {
      const progress = Math.min(1, contentOffset.y / scrollableHeight);
      setScrollProgress(progress);
    }
  };

  const handleToggleFavorite = useCallback(() => {
    if (isNaN(poemIdNum)) return;
    if (isFav) {
      removeFavorite(poemIdNum);
    } else {
      addFavorite(poemIdNum);
    }
  }, [isFav, poemIdNum]);

  return {
    poem,
    couplets,
    audio,
    categoryImage,
    showMeanings,
    isLoading,
    scrollProgress,
    isCompleted,
    isFav,
    handleToggleComplete,
    handleScroll,
    handleToggleFavorite,
  };
}
