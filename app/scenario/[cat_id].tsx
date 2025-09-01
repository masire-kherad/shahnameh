import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import ScenarioEngine from '@/components/game/ScenarioEngine';
import { getCharacterAnimation } from '@/services/personLoader';
import { useCurrency } from '@/hooks/useCurrency';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Scenario, Ending } from '@/types/shahname';
import { ThemedText } from '@/components/ThemedText';
import { getCategories } from '@/services/dataService';
import { getScenario } from '@/services/scenarioLoader';
import { Category } from '@/types/shahname';


const ScenarioScreen = () => {
  const colorScheme = useColorScheme();
  const { cat_id } = useLocalSearchParams();
  const { balance, increaseBalance, isLoading: isCurrencyLoading } = useCurrency();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [animation, setAnimation] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState<Category | null>(null);
  const [ending, setEnding] = useState<Ending | null>(null);
  const [sessionEarnings, setSessionEarnings] = useState(0);


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

  const handleGameEnd = useCallback(async (gameEnding: Ending, earnings: number) => {
    if (earnings > 0) {
      await increaseBalance(earnings);
    }
    setEnding(gameEnding);
    setSessionEarnings(earnings);
  }, [increaseBalance]);

  const handleStageChange = useCallback((stageId: number | string) => {
    const stageIndex = scenario?.stages.findIndex((s) => s.id === stageId) || 0;
    const progress = scenario ? (stageIndex + 1) / scenario.stages.length : 0;
    setProgress(progress);
  }, [scenario]);

  if (!scenario || !animation || isCurrencyLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (ending) {
    return (
      <View style={[styles.endingContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <ThemedText style={styles.endingTitle}>{ending.title}</ThemedText>
        <ThemedText style={styles.endingText}>{ending.text}</ThemedText>
        <ThemedText style={styles.earningsText}>شما {sessionEarnings} زر به دست آوردید</ThemedText>
        <Pressable onPress={() => router.back()} style={styles.returnButton}>
          <Text style={styles.returnButtonText}>بازگشت</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
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
        <ScenarioEngine
          scenario={scenario}
          onGameEnd={handleGameEnd}
          onStageChange={handleStageChange}
          colorScheme={colorScheme ?? 'light'}
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
  endingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  endingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  endingText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  earningsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700', // Gold color for earnings
    marginBottom: 32,
  },
  returnButton: {
    backgroundColor: Colors[colorScheme ?? 'light'].tint,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  returnButtonText: {
    fontSize: 16,
    color: Colors[colorScheme ?? 'light'].background,
    fontWeight: 'bold',
  },
});

export default ScenarioScreen;
