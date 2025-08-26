import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getCategories, getPoemsByCategoryId, Poem } from '@/lib/db';
import { buildCategoryTree, CategoryNode } from '@/lib/utils';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function Roadmap() {
  const [tree, setTree] = useState<CategoryNode[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryNode | null>(null);
  const [poems, setPoems] = useState<Poem[]>([]);

  useEffect(() => {
    getCategories().then(categories => {
      setTree(buildCategoryTree(categories));
    });
  }, []);

  const handleCategoryPress = (category: CategoryNode) => {
    setSelectedCategory(category);
    getPoemsByCategoryId(category.id).then(setPoems);
  };

  const renderNode = (node: CategoryNode, index: number) => {
    const isEven = index % 2 === 0;
    const nodeContainerStyle = isEven ? styles.nodeContainerLeft : styles.nodeContainerRight;

    return (
      <View key={node.id} style={styles.level}>
        <Pressable onPress={() => handleCategoryPress(node)} style={nodeContainerStyle}>
          <ThemedView style={styles.node}>
            <ThemedText style={styles.nodeText}>{node.text}</ThemedText>
          </ThemedView>
        </Pressable>
        {selectedCategory?.id === node.id && (
          <View style={styles.poemList}>
            {poems.map(poem => (
              <Link key={poem.id} href={`/poem/${poem.id}`} asChild>
                <Pressable>
                  <ThemedView style={styles.poemItem}>
                    <ThemedText style={styles.poemText}>{poem.title}</ThemedText>
                  </ThemedView>
                </Pressable>
              </Link>
            ))}
          </View>
        )}
        {index < tree.length - 1 && <View style={styles.line} />}
        {node.children.map((child, childIndex) => renderNode(child, childIndex))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {tree.map(renderNode)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  level: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nodeContainerLeft: {
    alignSelf: 'flex-start',
  },
  nodeContainerRight: {
    alignSelf: 'flex-end',
  },
  node: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    padding: 8,
  },
  nodeText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Vazirmatn',
  },
  line: {
    width: 4,
    height: 50,
    backgroundColor: '#1E90FF',
  },
  poemList: {
    marginTop: 10,
    width: '100%',
  },
  poemItem: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  poemText: {
    fontFamily: 'Vazirmatn',
  },
});
