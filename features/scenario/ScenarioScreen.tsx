import BendedRoad from '@/components/BendedRoad';
import StoryWithChoices from '@/components/game/StoryWithChoices';
import Loading from '@/components/Loading';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { defaultImage, getCategoryImage } from '@/services/personLoader';
import { Category, Ending, Scenario, Stage } from '@/types/shahname';
import { router, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface ScenarioScreenProps {
  isLoading: boolean;
  category: Category | null;
  scenario: Scenario | null;
  currentStage: Stage | null;
  ending: Ending | null;
  scenarioSummary: string;
  sessionEarnings: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onStageChange: (stageId: number | string) => void;
  onGameEnd: (gameEnding: Ending, endingEarnings: number) => void;
}

const ScenarioScreen = ({
  isLoading,
  category,
  scenario,
  currentStage,
  ending,
  scenarioSummary,
  sessionEarnings: _sessionEarnings,
  isMuted,
  onToggleMute,
  onStageChange,
  onGameEnd,
}: ScenarioScreenProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = createStyles(colorScheme);

  if (isLoading) {
    return <Loading message="در حال بارگذاری سناریو..." />;
  }

  if (ending) {
    const categoryImage = category
      ? getCategoryImage(category)
      : defaultImage;

    return (
      <BendedRoad imageSource={categoryImage}>
        <View style={styles.endingContainer}>
          <View style={styles.endingTextBackground}>
            <ThemedText style={styles.endingTitle}>{ending.title}</ThemedText>
            <ThemedText style={styles.endingText}>{ending.text}</ThemedText>
            {scenarioSummary ? (
              <ThemedText style={styles.summaryText}>
                {scenarioSummary}
              </ThemedText>
            ) : (
              <ThemedText style={styles.summaryText}>
                {scenario?.summary}
              </ThemedText>
            )}
          </View>
          <Pressable
            onPress={() => router.back()}
            style={styles.returnButton}
          >
            <Text style={styles.returnButtonText}>بازگشت</Text>
          </Pressable>
        </View>
      </BendedRoad>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: category?.text || 'Scenario' }}
      />
      <StoryWithChoices
        stage={currentStage!}
        onStageChange={onStageChange}
        onGameEnd={onGameEnd}
        scenarioEndings={scenario!.endings}
        colorScheme={colorScheme}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        scenarioType={category?.image || 'qmars'}
      />
    </View>
  );
};

const createStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
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
    endingTextBackground: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      width: '90%',
      maxWidth: 500,
    },
    endingTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      paddingTop: 16,
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
      lineHeight: 28,
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
      lineHeight: 24,
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
