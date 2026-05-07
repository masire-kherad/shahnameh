import HorizontalProgressBar from '@/components/HorizontalProgressBar';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { toFarsiNumber } from '@/services/localization';
import { getCategoryImage } from '@/services/personLoader';
import { CompletedPoems } from '@/services/progressService';
import type { Category, Poem } from '@/types/shahname';
import { View as MotiView } from 'moti';
import React from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRoadmap } from '../hooks/useRoadmap';

interface RoadmapProps {
  categories: Category[];
  poems: Poem[];
  completedPoems: CompletedPoems;
  width: number;
}

export default function Roadmap({ categories, poems, completedPoems, width: containerWidth }: RoadmapProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'].persian;
  const { height: windowHeight } = useWindowDimensions();

  const {
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
  } = useRoadmap({ categories, poems, completedPoems, containerWidth });

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)}>
          {selectedImage && (
            <Image source={selectedImage} style={styles.modalImage} />
          )}
        </Pressable>
      </Modal>

      <ScrollView
        contentContainerStyle={[styles.container, { height: contentHeight }]}
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <Svg height={contentHeight} width={containerWidth} style={StyleSheet.absoluteFill}>
          <Path d={pathD} stroke={colors.path} strokeWidth="8" fill="none" />
        </Svg>

        <ThemedText type="title" style={[styles.title, { color: Colors.dark.text }]}>
          مسیر خرد
        </ThemedText>

        {categories.map((category, index) => {
          const { offset, y } = nodePositions[index];
          const progress = getCategoryProgress(category.id);
          const progressValue = progress.total > 0 ? progress.completed / progress.total : 0;
          const imageSource = getCategoryImage(category);
          const isVisible = y > scrollY - windowHeight / 2 && y < scrollY + windowHeight + windowHeight / 2;

          return (
            <MotiView
              key={category.id}
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 100 }}
              style={[
                styles.nodeContainer,
                { position: 'absolute', top: y - 50, start: offset - 50 },
              ]}
            >
              <Pressable
                onPress={() => handleCategoryPress(category.id)}
                onLongPress={() => handleLongPress(imageSource)}
              >
                {isVisible ? (
                  <Image source={imageSource} style={styles.nodeImage} />
                ) : (
                  <View style={styles.nodeImage} />
                )}
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
                    {toFarsiNumber(progress.completed)} / {toFarsiNumber(progress.total)}
                  </Text>
                )}
              </View>
            </MotiView>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
    paddingTop: 5,
    paddingHorizontal: 40,
  },
  nodeContainer: {
    width: 100,
    alignItems: 'center',
  },
  nodeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#f0f0f0',
  },
  nodeText: {
    color: '#f0f0f0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  progressContainer: {
    width: 100,
    marginTop: 8,
    alignItems: 'center',
  },
  progressText: {
    color: '#f0f0f0',
    fontSize: 12,
    marginTop: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
});
