import { CategoryScreen } from '@/features/category/components/CategoryScreen';
import { useCategory } from '@/features/category/hooks/useCategory';
import React from 'react';

export default function CategoryPage() {
  const screenData = useCategory();
  return <CategoryScreen {...screenData} />;
}
