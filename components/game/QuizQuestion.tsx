import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { QuizOption } from '@/types/shahname';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  onAnswer: (isCorrect: boolean) => void;
  colorScheme: 'light' | 'dark';
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, options, onAnswer, colorScheme }) => {
  const styles = createStyles(colorScheme);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (optionIndex: number, isCorrect: boolean) => {
    if (answered) return; // Prevent multiple selections
    
    setSelectedOptionIndex(optionIndex);
    setAnswered(true);
    setTimeout(() => onAnswer(isCorrect), 500)
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={10} style={styles.blurContainer} tint={colorScheme}>
        <View style={styles.questionContainer}>
          <ThemedText style={styles.question}>{question}</ThemedText>
        </View>
        {options.map((option, index) => {
          const key = Object.keys(option).find(k => k !== 'correct');
          if (!key) return null;

          const text = option[key] as string;
          const isCorrect = option.correct === true;
          const isSelected = selectedOptionIndex === index;
          const showFeedback = answered && isSelected;

          return (
            <Pressable 
              key={index} 
              onPress={() => handleAnswer(index, isCorrect)} 
              style={styles.optionButton}
              disabled={answered}
            >
              <View style={[
                styles.optionContainer,
                showFeedback && (isCorrect ? styles.correctOption : styles.incorrectOption)
              ]}>
                <ThemedText style={[
                  styles.optionText,
                  showFeedback && styles.feedbackText
                ]}>
                  {text}
                </ThemedText>
              </View>
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
};

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  blurContainer: {
    padding: 16,
    backgroundColor: colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
  },
  questionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black with alpha for better visibility
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  optionButton: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  optionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black with alpha for better visibility
    borderWidth: 1,
    borderColor: Colors[colorScheme].tint,
    padding: 16,
    borderRadius: 16,
  },
  correctOption: {
    backgroundColor: 'rgba(0, 128, 0, 0.3)', // Green with alpha for correct answer
    borderColor: '#00ff00',
  },
  incorrectOption: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)', // Red with alpha for incorrect answer
    borderColor: '#ff0000',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
  feedbackText: {
    fontWeight: 'bold',
  },
});

export default QuizQuestion;
