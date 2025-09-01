import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Scenario, Stage, Choice } from '@/types/shahname';
import QuizQuestion from './QuizQuestion';
import { Colors } from '@/constants/Colors';

interface ScenarioEngineProps {
  scenario: Scenario;
  onGameEnd: (ending: any, earnings: number) => void;
  onStageChange: (stageId: number | string) => void;
  colorScheme: 'light' | 'dark';
}

const ScenarioEngine: React.FC<ScenarioEngineProps> = ({
  scenario,
  onGameEnd,
  onStageChange,
  colorScheme,
}) => {
  const styles = createStyles(colorScheme);
  const [currentStageId, setCurrentStageId] = useState<number | string>(1);
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const stage = scenario.stages.find((s) => s.id === currentStageId);
    if (stage) {
      setCurrentStage(stage);
      onStageChange(currentStageId);
    } else {
      const ending = scenario.endings[currentStageId];
      if (ending) {
        onGameEnd(ending, correctAnswers * 10);
      }
    }
  }, [currentStageId, scenario, onGameEnd, onStageChange, correctAnswers]);

  const handleChoice = (nextStageId: number | string) => {
    setCurrentStageId(nextStageId);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      if (currentStage?.on_correct) {
        setCurrentStageId(currentStage.on_correct);
      }
    } else {
      if (currentStage?.on_wrong) {
        setCurrentStageId(currentStage.on_wrong);
      }
    }
  };

  if (!currentStage) {
    return null;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ThemedText style={styles.title}>{currentStage.title}</ThemedText>
      <ThemedText style={styles.text}>{currentStage.text}</ThemedText>
      {currentStage.type === 'quiz' ? (
        <QuizQuestion
          question={currentStage.question!}
          options={currentStage.options!}
          onAnswer={handleAnswer}
          colorScheme={colorScheme}
        />
      ) : (
        currentStage.choices?.map((choice, index) => (
          <Pressable
            key={index}
            onPress={() => handleChoice(choice.next_stage)}
            style={styles.choiceButton}
          >
            <ThemedText style={styles.choiceText}>{choice.option}</ThemedText>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
};

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  choiceButton: {
    backgroundColor: Colors[colorScheme].background,
    borderWidth: 1,
    borderColor: Colors[colorScheme].tint,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  choiceText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ScenarioEngine;
