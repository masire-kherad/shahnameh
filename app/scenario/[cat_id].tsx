import BendedRoad from '@/components/BendedRoad';
import StoryWithChoices from '@/components/game/StoryWithChoices';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCurrency } from '@/hooks/useCurrency';
import { getCategories } from '@/services/dataService';
import { categoryImages, defaultImage, getCategoryImage } from '@/services/personLoader';
import { getScenario } from '@/services/scenarioLoader';
import { Category, Ending, Scenario, Stage } from '@/types/shahname';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


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
  const [scenarioSummary, setScenarioSummary] = useState<string>('');

  useEffect(() => {
    const categories = getCategories();
    const currentCategory = categories.find((c) => c.id === Number(cat_id));
    if (currentCategory) {
      setCategory(currentCategory);
      const scenarioData = getScenario(currentCategory.image);
      if (scenarioData) {
        // Set the scenario summary
        if (scenarioData.summary) {
          setScenarioSummary(scenarioData.summary);
        }
        
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
    // Get the category image for the ending screen
    const categoryImage = category ? getCategoryImage(category) : defaultImage;
    
    return (
      <BendedRoad imageSource={categoryImage}>
        <View style={styles.endingContainer}>
          <ThemedText style={styles.endingTitle}>{ending.title}</ThemedText>
          <ThemedText style={styles.endingText}>{ending.text}</ThemedText>
          {scenarioSummary ? (
            <ThemedText style={styles.summaryText}>
              {scenarioSummary}
            </ThemedText>
          ) : (
            <ThemedText style={styles.summaryText}>
              {scenario.summarythe }
            </ThemedText>
          )}
          <ThemedText style={styles.earningsText}>شما {sessionEarnings} زر به دست آوردید</ThemedText>
          <Pressable onPress={() => router.back()} style={styles.returnButton}>
            <Text style={styles.returnButtonText}>بازگشت</Text>
          </Pressable>
        </View>
      </BendedRoad>
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
    backgroundColor: 'transparent',
  },
  endingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  endingText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  summaryText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  earningsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700', // Gold color for earnings
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
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