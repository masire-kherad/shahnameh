import { useProgress } from '@/hooks/useProgress';
import { getCategories, getPoems } from '@/services/dataService';
import { Category, Poem } from '@/types/shahname';
import { useEffect, useState } from 'react';

export function useFavorites() {
  const { favoritePoems } = useProgress();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const poemsData = getPoems();
    const categoriesData = getCategories();
    
    const favoritePoemsList = poemsData.filter(poem => favoritePoems[poem.id]);
    setPoems(favoritePoemsList);
    setCategories(categoriesData);
  }, [favoritePoems]);

  const getCategoryName = (catId: number) => {
    const category = categories.find(c => c.id === catId);
    return category ? category.text : '';
  };

  return { poems, getCategoryName };
}
