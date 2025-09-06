import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCurrency } from '@/hooks/useCurrency';
import { getCategories, getPoems, getUserInfo } from '@/services/dataService';
import { getCompletedPoems } from '@/services/progressService';
import { Category, Poem } from '@/types/shahname';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

const DAILY_REWARD_KEY = '@daily_reward_last_collection';

export default function ProfileScreen() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isRewardAvailable, setIsRewardAvailable] = useState(false);
  const { balance, increaseBalance } = useCurrency();

  const checkDailyReward = useCallback(async () => {
    const lastCollectionDate = await AsyncStorage.getItem(DAILY_REWARD_KEY);
    const today = new Date().toLocaleDateString();
    if (lastCollectionDate !== today) {
      setIsRewardAvailable(true);
    } else {
      setIsRewardAvailable(false);
    }
  }, []);

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
      checkDailyReward();
    };
    loadData();
  }, [checkDailyReward]);

  const getCategoryName = (catId: number) => {
    const category = categories.find(c => c.id === catId);
    return category ? category.text : '';
  };

  const handleClaimReward = useCallback(async () => {
    if (isRewardAvailable) {
      await increaseBalance(5);
      const today = new Date().toLocaleDateString();
      await AsyncStorage.setItem(DAILY_REWARD_KEY, today);
      setIsRewardAvailable(false);
      Alert.alert('پاداش روزانه', '۵ زر به شما اضافه شد!');
    }
  }, [isRewardAvailable, increaseBalance]);

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
          <ThemedText type="title" style={{ paddingTop: 10 }}>{userInfo?.name || 'پروفایل'}</ThemedText>
          <View style={styles.currencyContainer}>
            <ThemedText style={styles.currencyText}>{balance} زر</ThemedText>
          </View>
        </View>

        <Pressable
          style={[styles.dailyRewardButton, !isRewardAvailable && styles.disabledButton]}
          onPress={handleClaimReward}
          disabled={!isRewardAvailable}
        >
          <ThemedText style={styles.favoritesButtonText}>
            {isRewardAvailable ? 'دریافت پاداش روزانه' : 'پاداش امروز را دریافت کرده‌اید'}
          </ThemedText>
        </Pressable>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={{ paddingTop: 10 }}>اشعار تکمیل شده</ThemedText>
        </ThemedView>

        <View style={styles.navigationButtons}>
          <Pressable style={styles.navButton} onPress={() => router.push('/favorites')}>
            <ThemedText style={styles.favoritesButtonText}>علاقه‌مندی‌ها</ThemedText>
          </Pressable>
          <Pressable style={styles.navButton} onPress={() => router.push('/Info')}>
            <ThemedText style={styles.favoritesButtonText}>درباره‌ما</ThemedText>
          </Pressable>
        </View>

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
  currencyContainer: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderWidth: 1,
    borderColor: '#ffd700',
  },
  currencyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700',
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
  navigationButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 16,
  },
  navButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  favoritesButtonText: {
    color: '#f0f0f0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dailyRewardButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: '#7f8c8d',
  },
});
