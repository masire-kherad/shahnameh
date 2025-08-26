import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, I18nManager } from 'react-native';
import { Category } from '@/types/shahname';
import { router } from 'expo-router';
import { View as MotiView } from 'moti';

interface RoadmapProps {
  categories: Category[];
}

export default function Roadmap({ categories }: RoadmapProps) {
  const handleCategoryPress = (catId: number) => {
    router.push(`/category/${catId}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.map((category, index) => {
        const isOdd = index % 2 !== 0;
        const positionStyle = isOdd ? styles.odd : styles.even;

        return (
          <MotiView
            key={category.id}
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 100 }}
            style={[styles.nodeContainer, positionStyle]}
          >
            <Pressable onPress={() => handleCategoryPress(category.id)}>
              <View style={styles.node}>
                <Text style={styles.nodeText}>{category.text}</Text>
              </View>
            </Pressable>
            {index < categories.length - 1 && (
              <View style={[styles.path, isOdd ? styles.pathOdd : styles.pathEven]} />
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
  nodeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  odd: {
    alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
  },
  even: {
    alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
  },
  node: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#A1CEDC',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nodeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  path: {
    position: 'absolute',
    width: 4,
    height: 60,
    backgroundColor: '#A1CEDC',
    top: 100,
    zIndex: -1,
  },
  pathOdd: {
    [I18nManager.isRTL ? 'right' : 'left']: '50%',
    transform: [{ translateX: I18nManager.isRTL ? 2 : -2 }, { rotate: '20deg' }],
  },
  pathEven: {
    [I18nManager.isRTL ? 'left' : 'right']: '50%',
    transform: [{ translateX: I18nManager.isRTL ? -2 : 2 }, { rotate: '-20deg' }],
  },
});
