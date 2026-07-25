import { useProgress } from '@/hooks/useProgress';
import { getCategories, getPoems } from '@/services/dataService';
import { Category, Poem } from '@/types/shahname';
import { useEffect, useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

export function useHome() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [poems, setPoems] = useState<Poem[]>([]);
  const { completedPoems } = useProgress();
  const { width } = useWindowDimensions();
  const containerWidth = Platform.OS === 'web' ? Math.min(width, 420) : width;

  useEffect(() => {
    const categoriesData = getCategories();
    const poemsData = getPoems();
    setCategories(categoriesData);
    setPoems(poemsData);
  }, []);

  return { categories, poems, completedPoems, containerWidth };
}
