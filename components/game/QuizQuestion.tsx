import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { QuizOption } from '@/types/shahname';

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, options, onAnswer }) => {
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
            <Text style={styles.optionText}>{text}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#f0f0f0',
  },
  optionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
  },
});

export default QuizQuestion;
