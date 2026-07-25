import BendedRoad from "@/components/BendedRoad";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Category, Poem } from "@/types/shahname";
import { Stack } from "expo-router";
import React from "react";
import {
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

interface CategoryScreenProps {
  poems: Poem[];
  category: Category | null;
  categoryImage: ImageSourcePropType;
  completedPoems: Record<number, boolean>;
  handlePoemPress: (poemId: number) => void;
}

export function CategoryScreen({
  poems,
  category,
  categoryImage,
  completedPoems,
  handlePoemPress,
}: CategoryScreenProps) {
  return (
    <BendedRoad imageSource={categoryImage}>
      <View style={styles.container}>
        <View style={styles.overlay} />

        <Stack.Screen options={{ title: category?.text ?? "فهرست اشعار" }} />

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {poems.map((poem) => {
            const isCompleted = completedPoems[poem.id];

            return (
              <Pressable key={poem.id} onPress={() => handlePoemPress(poem.id)}>
                <ThemedView
                  style={[
                    styles.poemItem,
                    isCompleted ? styles.completedPoemItem : {},
                  ]}
                >
                  <ThemedText style={styles.poemText}>{poem.title}</ThemedText>
                </ThemedView>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </BendedRoad>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  scrollViewContent: {
    padding: 16,
  },

  poemItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  completedPoemItem: {
    backgroundColor: "rgba(110, 191, 139, 0.7)",
  },

  poemText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#f0f0f0",
  },
});
