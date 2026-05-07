import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Poem } from '@/types/shahname';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export interface CompletedPoemsScreenProps {
  poems: Poem[];
  getCategoryName: (catId: number) => string;
}

export default function CompletedPoemsScreen({ poems, getCategoryName }: CompletedPoemsScreenProps) {
  return (
    <ImageBackground
      source={require('@/assets/images/Person/Ferdousi.png')}
      style={[styles.container, Platform.OS === 'web' ? { width: '100%', height: '100%' } : {}]}
    >
      <View style={styles.overlay} />
      <ScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={{ padding: 15 }}>شعرهای تمام شده</ThemedText>
        </ThemedView>
        {poems.map((poem) => (
          <Pressable key={poem.id} onPress={() => router.push(`/reading/${poem.id}`)}>
            <ThemedView style={styles.poemItem}>
              <ThemedText style={styles.poemText}>{poem.title}</ThemedText>
              <ThemedText style={styles.categoryText}>{getCategoryName(poem.cat_id)}</ThemedText>
            </ThemedView>
          </Pressable>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  overlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  titleContainer: { 
    alignItems: 'center', 
    marginBottom: 24, 
    borderRadius: 15, 
    backgroundColor: 'rgba(255, 255, 255, 0.1)' 
  },
  poemItem: { 
    padding: 16, 
    marginBottom: 12, 
    borderRadius: 8, 
    backgroundColor: '#27ae60' 
  },
  poemText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  categoryText: { 
    fontSize: 14, 
    textAlign: 'center', 
    marginTop: 4 
  },
});
