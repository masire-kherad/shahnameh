import { CompletedPoems } from '@/services/progressService';
import type { Category, Poem } from '@/types/shahname';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { I18nManager, ImageSourcePropType, Platform } from 'react-native';

interface UseRoadmapProps {
  categories: Category[];
  poems: Poem[];
  completedPoems: CompletedPoems;
  containerWidth: number;
}

export function useRoadmap({ categories, poems, completedPoems, containerWidth }: UseRoadmapProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | null>(null);
  const [scrollY, setScrollY] = useState(0);

  const nodePositions = useMemo(() => {
    const positions = [];
    const nodeHeight = 100;
    const nodeMarginBottom = 60;
    const verticalSpacing = nodeHeight + nodeMarginBottom + 20;
    const containerPadding = 40;
    const contentWidth = containerWidth - 2 * containerPadding;

    for (let i = 0; i < categories.length; i++) {
      const isOdd = i % 2 !== 0;
      const offset = containerPadding + (isOdd ? contentWidth - 50 : 50);
      const y = i * verticalSpacing + 100;
      positions.push({ offset, y });
    }
    return positions;
  }, [categories, containerWidth]);

  const pathD = useMemo(() => {
    if (nodePositions.length < 2) return '';
    let d = `M ${(I18nManager.isRTL || Platform.OS === 'android') ? containerWidth - nodePositions[0].offset : nodePositions[0].offset} ${nodePositions[0].y}`;
    for (let i = 0; i < nodePositions.length - 1; i++) {
      const p1 = nodePositions[i];
      const p2 = nodePositions[i + 1];
      const p1x = (I18nManager.isRTL || Platform.OS === 'android') ? containerWidth - p1.offset : p1.offset;
      const p2x = (I18nManager.isRTL || Platform.OS === 'android') ? containerWidth - p2.offset : p2.offset;
      const midX = (p1x + p2x) / 2;
      const midY = (p1.y + p2.y) / 2;
      d += ` Q ${p1x} ${midY}, ${midX} ${midY}`;
      d += ` Q ${p2x} ${midY}, ${p2x} ${p2.y}`;
    }
    return d;
  }, [nodePositions, containerWidth]);

  const contentHeight = nodePositions.length > 0
    ? nodePositions[nodePositions.length - 1].y + 200
    : 0;

  const handleCategoryPress = (catId: number) => {
    router.push(`/category/${catId}`);
  };

  const handleLongPress = (image: ImageSourcePropType) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const getCategoryProgress = (catId: number) => {
    const categoryPoems = poems.filter(p => p.cat_id === catId);
    const completedCategoryPoems = categoryPoems.filter(p => completedPoems[p.id]);
    return {
      total: categoryPoems.length,
      completed: completedCategoryPoems.length,
    };
  };

  return {
    nodePositions,
    pathD,
    contentHeight,
    modalVisible,
    setModalVisible,
    selectedImage,
    scrollY,
    setScrollY,
    handleCategoryPress,
    handleLongPress,
    getCategoryProgress,
  };
}
