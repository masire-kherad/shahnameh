import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoems, getCategories, getUserInfo } from '@/services/dataService';
import { getCompletedPoems } from '@/services/progressService';
import { Poem, Category } from '@/types/shahname';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const poemsData = getPoems();
      const categoriesData = getCategories();
      const completedData = await getCompletedPoems();
      const completedPoemsList = poemsData.filter(poem => completedData[poem.id]);
      const info = await getUserInfo();
      setUserInfo(info);
      setPoems(completedPoemsList);
      setCategories(categoriesData);
    };
    loadData();
  }, []);

  const getCategoryName = (catId: number) => {
    const category = categories.find(c => c.id === catId);
    return category ? category.text : '';
  };

  const getGenderImage = () => {
    if (userInfo?.gender === 'male') {
      return require('@/assets/images/MaleUser.png');
    }
    if (userInfo?.gender === 'female') {
      return require('@/assets/images/FemaleUser.png');
    }
    return require('@/assets/images/Person/Ferdousi.png');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <Image source={getGenderImage()} style={styles.profileImage} />
          <ThemedText type="title">{userInfo?.name || 'پروفایل'}</ThemedText>
        </View>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">اشعار تکمیل شده</ThemedText>
        </ThemedView>

        <Pressable style={styles.favoritesButton} onPress={() => router.push('/favorites')}>
          <ThemedText style={styles.favoritesButtonText}>علاقه‌مندی‌ها</ThemedText>
        </Pressable>

        {poems.map((poem) => (
          <Pressable key={poem.id} onPress={() => router.push(`/reading/${poem.id}`)}>
            <ThemedView style={styles.poemItem}>
              <ThemedText style={styles.poemText}>{poem.title}</ThemedText>
              <ThemedText style={styles.categoryText}>{getCategoryName(poem.cat_id)}</ThemedText>
            </ThemedView>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  poemItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#6EBF8B',
  },
  poemText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  favoritesButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  favoritesButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
