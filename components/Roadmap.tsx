import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, I18nManager, Image } from 'react-native';
import { Category, Poem } from '@/types/shahname';
import { router } from 'expo-router';
import { View as MotiView } from 'moti';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { CompletedPoems } from '@/services/progressService';
import { ThemedText } from './ThemedText';
import HorizontalProgressBar from './HorizontalProgressBar';

interface RoadmapProps {
  categories: Category[];
  poems: Poem[];
  completedPoems: CompletedPoems;
}

const images = [
  require('@/assets/images/ferdousi.png'),
  require('@/assets/images/rostam.jpg'),
  require('@/assets/images/shahdokht.png'),
];

export default function Roadmap({ categories, poems, completedPoems }: RoadmapProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'].persian;

  const handleCategoryPress = (catId: number) => {
    router.push(`/category/${catId}`);
  };

  const getCategoryProgress = (catId: number) => {
    const categoryPoems = poems.filter(p => p.cat_id === catId);
    const completedCategoryPoems = categoryPoems.filter(p => completedPoems[p.id]);
    return {
      total: categoryPoems.length,
      completed: completedCategoryPoems.length,
    };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={[styles.title, { color: Colors.dark.text }]}>نقشه راه</ThemedText>
      {categories.map((category, index) => {
        const isOdd = index % 2 !== 0;
        const positionStyle = isOdd ? styles.odd : styles.even;
        const progress = getCategoryProgress(category.id);
        const progressValue = progress.total > 0 ? progress.completed / progress.total : 0;
        const isCompleted = progress.total > 0 && progress.completed === progress.total;
        const pathColor = isCompleted ? colors.completed : colors.path;
        const imageSource = images[index % images.length];

        return (
          <MotiView
            key={category.id}
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 100 }}
            style={[styles.nodeContainer, positionStyle]}
          >
            <Pressable onPress={() => handleCategoryPress(category.id)}>
              <Image source={imageSource} style={styles.nodeImage} />
            </Pressable>
            <Text style={styles.nodeText}>{category.text}</Text>
            <View style={styles.progressContainer}>
              <HorizontalProgressBar
                progress={progressValue}
                bgColor={colors.background}
                progressColor={colors.path}
              />
              {progress.total > 0 && (
                <Text style={styles.progressText}>
                  {progress.completed} / {progress.total}
                </Text>
              )}
            </View>
            {index < categories.length - 1 && (
              <View style={[styles.path, { backgroundColor: pathColor }, isOdd ? styles.pathOdd : styles.pathEven]} />
            )}
          </MotiView>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
  },
  nodeContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  odd: {
    alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
  },
  even: {
    alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
  },
  nodeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  nodeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  progressContainer: {
    width: 100,
    marginTop: 8,
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  path: {
    position: 'absolute',
    width: 8,
    height: 80,
    top: 100,
    zIndex: -1,
  },
  pathOdd: {
    [I18nManager.isRTL ? 'right' : 'left']: '50%',
    transform: [{ translateX: I18nManager.isRTL ? 4 : -4 }, { rotate: '25deg' }],
  },
  pathEven: {
    [I18nManager.isRTL ? 'left' : 'right']: '50%',
    transform: [{ translateX: I18nManager.isRTL ? -4 : 4 }, { rotate: '-25deg' }],
  },
});
