import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { QuizOption } from '@/types/shahname';
import { Colors } from '@/constants/Colors';

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  onAnswer: (isCorrect: boolean) => void;
  colorScheme: 'light' | 'dark';
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, options, onAnswer, colorScheme }) => {
  const styles = createStyles(colorScheme);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.question}>{question}</ThemedText>
      {options.map((option, index) => {
        const key = Object.keys(option).find(k => k !== 'correct');
        if (!key) return null;

        const text = option[key] as string;
        const isCorrect = option.correct === true;

        return (
          <Pressable key={index} onPress={() => onAnswer(isCorrect)} style={styles.optionButton}>
            <ThemedText style={styles.optionText}>{text}</ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
};

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors[colorScheme].persian.overlay,
    borderRadius: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: Colors[colorScheme].background + 'aa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QuizQuestion;
