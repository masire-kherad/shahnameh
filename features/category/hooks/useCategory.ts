import { useProgress } from '@/hooks/useProgress';
import { getCategories, getPoems } from '@/services/dataService';
import { defaultImage, getCategoryImage } from '@/services/personLoader';
import { getScenario } from '@/services/scenarioLoader';
import { Category, Poem } from '@/types/shahname';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';

export function useCategory() {
  const { cat_id } = useLocalSearchParams<{ cat_id: string }>();
  const { completedPoems } = useProgress();

  const [poems, setPoems] = useState<Poem[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isScenarioAvailable, setIsScenarioAvailable] = useState(false);
  const [categoryImage, setCategoryImage] =
    useState<ImageSourcePropType>(defaultImage);

  useEffect(() => {
    if (cat_id) {
      const poemsData = getPoems();
      const categoriesData = getCategories();
      const currentCategory = categoriesData.find(
        (c) => c.id === Number(cat_id),
      );
      if (currentCategory) {
        setCategory(currentCategory);
        setCategoryImage(getCategoryImage(currentCategory));
        const scenario = getScenario(currentCategory.image);
        setIsScenarioAvailable(scenario !== null);
      }
      const filteredPoems = poemsData.filter(
        (p) => p.cat_id === Number(cat_id),
      );
      setPoems(filteredPoems);
    }
  }, [cat_id]);

  const handlePoemPress = useCallback((poemId: number) => {
    router.push(`/reading/${poemId}`);
  }, []);

  const handlePlayPress = useCallback(() => {
    router.push(`/scenario/${cat_id}`);
  }, [cat_id]);

  return {
    poems,
    category,
    isScenarioAvailable,
    categoryImage,
    completedPoems,
    handlePoemPress,
    handlePlayPress,
  };
}
