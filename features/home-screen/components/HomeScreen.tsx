import Roadmap from "@/components/Roadmap";
import { Category, Poem } from "@/types/shahname";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export interface HomeScreenProps {
  categories: Category[];
  poems: Poem[];
  completedPoems: Record<number, boolean>;
  containerWidth: number;
}

export default function HomeScreen({
  categories,
  poems,
  completedPoems,
  containerWidth,
}: HomeScreenProps) {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.webp")}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <Roadmap
        categories={categories}
        poems={poems}
        completedPoems={completedPoems}
        width={containerWidth}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
