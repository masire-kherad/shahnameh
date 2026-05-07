import { useCurrency } from '@/hooks/useCurrency';
import { getShowMeanings, getUserInfo, setShowMeanings, setUserInfo } from '@/services/dataService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const DAILY_REWARD_KEY = '@daily_reward_last_collection';
const DAILY_REWARD_AMOUNT = 5;

export function useProfile() {
  const [userInfo, setUserInfoState] = useState<any>(null);
  const [showMeanings, setShowMeaningsState] = useState(true);
  const [isRewardAvailable, setIsRewardAvailable] = useState(false);
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { balance, increaseBalance } = useCurrency();

  // ── Check daily reward ──────────────────────────────
  const checkDailyReward = useCallback(async () => {
    const lastCollectionDate = await AsyncStorage.getItem(DAILY_REWARD_KEY);
    const today = new Date().toLocaleDateString();
    setIsRewardAvailable(lastCollectionDate !== today);
  }, []);

  // ── Load all profile data ───────────────────────────
  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const [info, meaningsPref] = await Promise.all([
        getUserInfo(),
        getShowMeanings(),
      ]);
      setUserInfoState(info);
      setShowMeaningsState(meaningsPref);
      await checkDailyReward();
    } catch (error) {
      console.error('Failed to load profile data', error);
    } finally {
      setIsLoading(false);
    }
  }, [checkDailyReward]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // ── Claim reward ─────────────────────────────────────
  const claimReward = useCallback(async () => {
    if (!isRewardAvailable) return;
    await increaseBalance(DAILY_REWARD_AMOUNT);
    const today = new Date().toLocaleDateString();
    await AsyncStorage.setItem(DAILY_REWARD_KEY, today);
    setIsRewardAvailable(false);
    setIsRewardModalVisible(true);
  }, [isRewardAvailable, increaseBalance]);

  const dismissRewardModal = useCallback(() => {
    setIsRewardModalVisible(false);
  }, []);

  // ── Edit profile ─────────────────────────────────────
  const updateProfile = useCallback(async (name: string, gender: 'male' | 'female') => {
    await setUserInfo(name, gender);
    setUserInfoState({ name, gender });
  }, []);

  // ── Toggle meanings ──────────────────────────────────
  const toggleMeanings = useCallback(async () => {
    const newValue = !showMeanings;
    setShowMeaningsState(newValue);
    await setShowMeanings(newValue);
  }, [showMeanings]);

  return {
    userInfo,
    showMeanings,
    isRewardAvailable,
    isRewardModalVisible,
    isLoading,
    balance,
    loadProfile,
    claimReward,
    dismissRewardModal,
    updateProfile,
    toggleMeanings,
  };
}
