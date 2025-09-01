import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import ScenarioEngine from '@/components/game/ScenarioEngine';
import { getCharacterAnimation } from '@/services/personLoader';
import { useCurrency } from '@/hooks/useCurrency';
import { Scenario, Ending } from '@/types/shahname';
import { ThemedText } from '@/components/ThemedText';
import { getCategories } from '@/services/dataService';
import { getScenario } from '@/services/scenarioLoader';
import { Category } from '@/types/shahname';


const ScenarioScreen = () => {
  const { cat_id } = useLocalSearchParams();
  const { balance, increaseBalance, isLoading: isCurrencyLoading } = useCurrency();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [animation, setAnimation] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState<Category | null>(null);


  useEffect(() => {
    const categories = getCategories();
    const currentCategory = categories.find((c) => c.id === Number(cat_id));
    if (currentCategory) {
        setCategory(currentCategory)
        const scenarioData = getScenario(currentCategory.image);
        setScenario(scenarioData);
        const animationPath = getCharacterAnimation(currentCategory);
        setAnimation(animationPath);
    }
  }, [cat_id]);

  const handleGameEnd = async (gameEnding: Ending, earnings: number) => {
    await increaseBalance(earnings);
    router.back();
  };

  const handleStageChange = (stageId: number | string) => {
    const stageIndex = scenario?.stages.findIndex((s) => s.id === stageId) || 0;
    const progress = scenario ? (stageIndex + 1) / scenario.stages.length : 0;
    setProgress(progress);
  };

  if (!scenario || !animation || isCurrencyLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: category?.text || "Scenario" }} />
      <View style={styles.animationContainer}>
        <LottieView
          source={animation}
          progress={progress}
          style={styles.animation}
          loop={false}
        />
      </View>
      <View style={styles.gameContainer}>
        <View style={styles.currencyContainer}>
          <ThemedText style={styles.currencyText}>زر: {balance}</ThemedText>
        </View>
        <ScenarioEngine
          scenario={scenario}
          onGameEnd={handleGameEnd}
          onStageChange={handleStageChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  animationContainer: {
    flex: 1,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  gameContainer: {
    flex: 1,
    padding: 16,
  },
  currencyContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 8,
  },
  currencyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f0f0f0',
  },
  endingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  endingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#f0f0f0',
  },
  endingText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    color: '#f0f0f0',
  },
  restartButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  restartButtonText: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
});

export default ScenarioScreen;
