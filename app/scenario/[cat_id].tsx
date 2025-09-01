import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import LottieAnimation from '@/components/LottieAnimation';
import ScenarioEngine from '@/components/game/ScenarioEngine';
import { getCharacterAnimation } from '@/services/personLoader';
import { useCurrency } from '@/hooks/useCurrency';
import { Scenario, Ending } from '@/types/shahname';
import { ThemedText } from '@/components/ThemedText';
import { getCategories } from '@/services/dataService';
import { Category } from '@/types/shahname';


const ScenarioScreen = () => {
  const { cat_id } = useLocalSearchParams();
  const balance = useCurrency((state) => state.balance);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [animation, setAnimation] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [ending, setEnding] = useState<Ending | null>(null);
  const [category, setCategory] = useState<Category | null>(null);


  useEffect(() => {
    const categories = getCategories();
    const currentCategory = categories.find((c) => c.id === Number(cat_id));
    if (currentCategory) {
        setCategory(currentCategory)
        const scenarioData = require(`@/assets/db/Scenarios/${currentCategory.image}.json`);
        setScenario(scenarioData);
        const animationPath = getCharacterAnimation(currentCategory);
        setAnimation(animationPath);
    }
  }, [cat_id]);

  const handleGameEnd = (gameEnding: Ending) => {
    setEnding(gameEnding);
  };

  const handleRestart = () => {
    setEnding(null);
    setProgress(0);
  };

  const handleStageChange = (stageId: number | string) => {
    const stageIndex = scenario?.stages.findIndex((s) => s.id === stageId) || 0;
    const progress = scenario ? (stageIndex + 1) / scenario.stages.length : 0;
    setProgress(progress);
  };

  if (!scenario || !animation) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (ending) {
    return (
      <View style={styles.endingContainer}>
        <ThemedText style={styles.endingTitle}>{ending.title}</ThemedText>
        <ThemedText style={styles.endingText}>{ending.text}</ThemedText>
        <Pressable onPress={handleRestart} style={styles.restartButton}>
          <Text style={styles.restartButtonText}>Restart</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <LottieAnimation animationPath={animation} progress={progress}>
      <Stack.Screen options={{ title: category?.text || "Scenario" }} />
      <View style={styles.container}>
        <View style={styles.overlay} />
        <View style={styles.currencyContainer}>
          <ThemedText style={styles.currencyText}>زر: {balance}</ThemedText>
        </View>
        <ScenarioEngine
          scenario={scenario}
          onGameEnd={handleGameEnd}
          onStageChange={handleStageChange}
        />
      </View>
    </LottieAnimation>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
