import Loading from '@/components/Loading';
import { ThemedText } from '@/components/ThemedText';
import UserInfoModal from '@/components/UserInfoModal';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCurrency } from '@/hooks/useCurrency';
import { getShowMeanings, getUserInfo, setShowMeanings, setUserInfo } from '@/services/dataService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

const DAILY_REWARD_KEY = '@daily_reward_last_collection';

export default function ProfileScreen() {
  const [userInfo, setUserInfoState] = useState<any>(null);
  const [isRewardAvailable, setIsRewardAvailable] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const [showMeanings, setShowMeaningsState] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { balance, increaseBalance } = useCurrency();
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme!);

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
      setIsLoading(true);
      try {
        const info = await getUserInfo();
        const showMeaningsPref = await getShowMeanings();
        setUserInfoState(info);
        setShowMeaningsState(showMeaningsPref);
        checkDailyReward();
      } catch (error) {
        console.error('Failed to load profile data', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [checkDailyReward]);

  const handleClaimReward = useCallback(async () => {
    if (isRewardAvailable) {
      await increaseBalance(5);
      const today = new Date().toLocaleDateString();
      await AsyncStorage.setItem(DAILY_REWARD_KEY, today);
      setIsRewardAvailable(false);
      setIsRewardModalVisible(true);
    }
  }, [isRewardAvailable, increaseBalance]);

  const handleCloseRewardModal = () => {
    setIsRewardModalVisible(false);
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

  const handleEditProfile = () => {
    setIsEditModalVisible(true);
  };

  const handleModalClose = async (name: string, gender: 'male' | 'female') => {
    await setUserInfo(name, gender);
    setUserInfoState({ name, gender });
    setIsEditModalVisible(false);
  };

  const toggleShowMeanings = async () => {
    const newValue = !showMeanings;
    setShowMeaningsState(newValue);
    await setShowMeanings(newValue);
  };

  // Show loading screen while data is being fetched
  if (isLoading) {
    return <Loading message="در حال بارگذاری پروفایل..." />;
  }

  return (
    <ImageBackground 
      source={require('@/assets/images/bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      {/* Background Overlay */}
      <View style={styles.backgroundOverlay} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={getGenderImage()} style={styles.profileImage} />
            <Pressable onPress={handleEditProfile} style={styles.editIconContainer}>
              <IconSymbol name="pencil" size={20} color="#fff" />
            </Pressable>
          </View>
          <ThemedText type="title" style={styles.profileName}>
            {userInfo?.name || 'پروفایل'}
          </ThemedText>
        {/* todo: no currency for now */}
          {/* <View style={styles.currencyContainer}>
            <ThemedText style={styles.currencyText}>{balance} زر</ThemedText>
          </View> */}
        </View>

        {/* <Pressable
          style={[styles.dailyRewardButton, !isRewardAvailable && styles.disabledButton]}
          onPress={handleClaimReward}
          disabled={!isRewardAvailable}
        >
          <ThemedText style={styles.buttonText}>
            {isRewardAvailable ? 'دریافت پاداش روزانه' : 'پاداش امروز را دریافت کرده‌اید'}
          </ThemedText>
        </Pressable> */}

        {/* Show Meanings Checkbox */}
        <Pressable 
          style={styles.settingItem} 
          onPress={toggleShowMeanings}
        >
          <View style={styles.checkboxContainer}>
            <View style={[styles.checkbox, showMeanings && styles.checkboxChecked]}>
              {showMeanings && <IconSymbol name="checkmark" size={16} color="#fff" />}
            </View>
            <ThemedText style={styles.settingText}>نمایش معانی اشعار</ThemedText>
          </View>
        </Pressable>

        <View style={styles.navigationSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>دسترسی سریع</ThemedText>
          <View style={styles.navigationButtons}>
            <Pressable style={styles.navButton} onPress={() => router.push('/completed-poems')}>
              <IconSymbol name="checkmark.circle.fill" size={24} color="#fff" style={styles.navIcon} />
              <ThemedText style={styles.navButtonText}>اشعار تکمیل شده</ThemedText>
            </Pressable>
            <Pressable style={styles.navButton} onPress={() => router.push('/favorites')}>
              <IconSymbol name="heart.fill" size={24} color="#fff" style={styles.navIcon} />
              <ThemedText style={styles.navButtonText}>علاقه‌مندی‌ها</ThemedText>
            </Pressable>
          </View>

          <View style={styles.navigationButtons}>
            <Pressable style={styles.navButton} onPress={() => router.push('/Info')}>
              <IconSymbol name="info.circle.fill" size={24} color="#fff" style={styles.navIcon} />
              <ThemedText style={styles.navButtonText}>درباره‌ما</ThemedText>
            </Pressable>
            <Pressable style={styles.navButton} onPress={() => router.push('/Collaborations')}>
              <IconSymbol name="handshake" size={24} color="#fff" style={styles.navIcon} />
              <ThemedText style={styles.navButtonText}>همکاران</ThemedText>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <UserInfoModal 
        visible={isEditModalVisible} 
        onClose={handleModalClose} 
        initialName={userInfo?.name || ''} 
        initialGender={userInfo?.gender || 'male'} 
      />
      
      {/* Custom Daily Reward Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isRewardModalVisible}
        onRequestClose={handleCloseRewardModal}
      >
        <View style={styles.rewardModalOverlay}>
          <View style={styles.rewardModalContent}>
            <IconSymbol name="checkmark.circle.fill" size={60} color="#27ae60" style={styles.rewardIcon} />
            <ThemedText type="title" style={styles.rewardTitle}>پاداش روزانه</ThemedText>
            <ThemedText style={styles.rewardMessage}>۵ زر به شما اضافه شد!</ThemedText>
            <Pressable style={styles.rewardButton} onPress={handleCloseRewardModal}>
              <ThemedText style={styles.rewardButtonText}>تایید</ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[colorScheme].background,
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark semi-transparent overlay with 60% opacity
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#ffd700',
    marginBottom: 16,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 10,
  },
  currencyContainer: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  currencyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  dailyRewardButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#7f8c8d',
  },
  buttonText: {
    color: '#f0f0f0',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  settingItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 12,
  },
  checkboxChecked: {
    backgroundColor: '#3498db',
  },
  settingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navigationSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    backdropFilter: 'blur(10px)',
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  navigationButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
  },
  navButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.8)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  navIcon: {
    marginBottom: 8,
  },
  navButtonText: {
    color: '#f0f0f0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  // Custom Reward Modal Styles
  rewardModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardModalContent: {
    backgroundColor: Colors[colorScheme].background,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  rewardIcon: {
    marginBottom: 20,
  },
  rewardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors[colorScheme].text,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  rewardMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors[colorScheme].text,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  rewardButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  rewardButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

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
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
  },
  editButtonText: {
    color: '#f0f0f0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  currencyContainer: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  currencyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 16,
  },
  navButton: {
    backgroundColor: '#6EBF8B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  favoritesButtonText: {
    color: '#f0f0f0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dailyRewardButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#7f8c8d',
  },
});
