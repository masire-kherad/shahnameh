import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import StoryWithChoices from '@/components/game/StoryWithChoices';
import { useCurrency } from '@/hooks/useCurrency';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Scenario, Ending, Stage } from '@/types/shahname';
import { ThemedText } from '@/components/ThemedText';
import { getCategories } from '@/services/dataService';
import { getScenario } from '@/services/scenarioLoader';
import { categoryImages } from '@/services/personLoader';
import { Category } from '@/types/shahname';


const ScenarioScreen = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = createStyles(colorScheme);
  const { cat_id } = useLocalSearchParams();
  const { balance, increaseBalance, isLoading: isCurrencyLoading } = useCurrency();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [ending, setEnding] = useState<Ending | null>(null);
  const [sessionEarnings, setSessionEarnings] = useState(0);

  useEffect(() => {
    const categories = getCategories();
    const currentCategory = categories.find((c) => c.id === Number(cat_id));
    if (currentCategory) {
      setCategory(currentCategory);
      const scenarioData = getScenario(currentCategory.image);
      if (scenarioData) {
        const images = Object.values(categoryImages);
        const updatedStages = scenarioData.stages.map(stage => {
          if (!stage.image) {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            return { ...stage, image: randomImage };
          }
          return stage;
        });
        setScenario({ ...scenarioData, stages: updatedStages });
        setCurrentStage(updatedStages[0]);
      }
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
    const stage = scenario?.stages.find((s) => s.id === stageId);
    if (stage) {
      setCurrentStage(stage);
    } else if (scenario && typeof stageId === 'string' && scenario.endings[stageId]) {
      // This is an ending
      setEnding(scenario.endings[stageId]);
    }
  }, [scenario]);

  if (!scenario || !currentStage || isCurrencyLoading) {
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
        <ThemedText style={styles.earningsText}>شما {sessionEarnings} زر به دست آوردید</ThemedText>
        <Pressable onPress={() => router.back()} style={styles.returnButton}>
          <Text style={styles.returnButtonText}>بازگشت</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: category?.text || "Scenario" }} />
      <StoryWithChoices
        stage={currentStage}
        onStageChange={handleStageChange}
        onGameEnd={handleGameEnd}
        scenarioEndings={scenario.endings}
        colorScheme={colorScheme}
      />
    </View>
  );
};

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors[colorScheme].background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors[colorScheme].background,
  },
  endingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors[colorScheme].background,
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
    backgroundColor: Colors[colorScheme].tint,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  returnButtonText: {
    fontSize: 16,
    color: Colors[colorScheme].background,
    fontWeight: 'bold',
  },
});

export default ScenarioScreen;