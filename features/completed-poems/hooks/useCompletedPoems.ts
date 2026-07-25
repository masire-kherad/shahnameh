import { useProgress } from '@/hooks/useProgress';
import { getCategories, getPoems } from '@/services/dataService';
import { Category, Poem } from '@/types/shahname';
import { useEffect, useState } from 'react';

export function useCompletedPoems() {
  const { completedPoems } = useProgress();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const poemsData = getPoems();
    const categoriesData = getCategories();
    
    const completedPoemsList = poemsData.filter(poem => completedPoems[poem.id]);
    setPoems(completedPoemsList);
    setCategories(categoriesData);
  }, [completedPoems]);

  const getCategoryName = (catId: number) => {
    const category = categories.find(c => c.id === catId);
    return category ? category.text : '';
  };

  return { poems, getCategoryName };
}
