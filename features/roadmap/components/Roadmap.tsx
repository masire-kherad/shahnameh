import HorizontalProgressBar from "@/components/HorizontalProgressBar";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { toFarsiNumber } from "@/services/localization";
import { getCategoryImage } from "@/services/personLoader";
import { CompletedPoems } from "@/services/progressService";
import type { Category, Poem } from "@/types/shahname";
import React from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useRoadmap } from "../hooks/useRoadmap";

interface RoadmapProps {
  categories: Category[];
  poems: Poem[];
  completedPoems: CompletedPoems;
  width: number;
}

export default function Roadmap({
  categories,
  poems,
  completedPoems,
  width: containerWidth,
}: RoadmapProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"].persian;

  const { height: windowHeight } = useWindowDimensions();
  const ROADMAP_SECTION_HEIGHT = 800;
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
  } = useRoadmap({
    categories,
    poems,
    completedPoems,
    containerWidth,
  });

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setModalVisible(false)}
        >
          {selectedImage && (
            <Image source={selectedImage} style={styles.modalImage} />
          )}
        </Pressable>
      </Modal>

      <ScrollView
        contentContainerStyle={{
          height: contentHeight,
        }}
        onScroll={(e) => {
          setScrollY(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}
      >
        {/* SVG PATH */}
        {Array.from({
          length: Math.ceil(contentHeight / ROADMAP_SECTION_HEIGHT),
        }).map((_, index) => (
          <Svg
            key={index}
            width={containerWidth}
            height={ROADMAP_SECTION_HEIGHT}
            style={{
              position: "absolute",
              top: index * ROADMAP_SECTION_HEIGHT,
              left: 0,
            }}
          >
            <Path d={pathD} stroke={colors.path} strokeWidth={8} fill="none" />
          </Svg>
        ))}

        <ThemedText
          type="title"
          style={[
            styles.title,
            {
              color: Colors.dark.text,
            },
          ]}
        >
          مسیر خرد
        </ThemedText>

        {categories.map((category, index) => {
          const { offset, y } = nodePositions[index];

          const progress = getCategoryProgress(category.id);

          const progressValue =
            progress.total > 0 ? progress.completed / progress.total : 0;

          const imageSource = getCategoryImage(category);

          const isVisible =
            y > scrollY - windowHeight / 2 && y < scrollY + windowHeight * 1.5;

          return (
            <View
              key={category.id}
              style={[
                styles.nodeContainer,
                {
                  position: "absolute",
                  top: y - 50,
                  left: offset - 50,
                },
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
                    {toFarsiNumber(progress.completed)}
                    {" / "}
                    {toFarsiNumber(progress.total)}
                  </Text>
                )}
              </View>
            </View>
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
    textAlign: "center",
    marginBottom: 40,
    paddingTop: 5,
  },

  nodeContainer: {
    width: 100,
    alignItems: "center",
  },

  nodeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#f0f0f0",
  },

  nodeText: {
    color: "#f0f0f0",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 4,
    backgroundColor: "rgba(0,0,0,0.8)",
  },

  progressContainer: {
    width: 100,
    marginTop: 8,
    alignItems: "center",
  },

  progressText: {
    color: "#f0f0f0",
    fontSize: 12,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
});
