import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Image, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useAudioPlayer } from 'expo-audio';
import { Stage } from '@/types/shahname';
import QuizQuestion from '@/components/game/QuizQuestion';
import { Colors } from '@/constants/Colors';
import { getScenarioImage } from '@/services/scenarioImageLoader';
import { getScenarioSound } from '@/services/scenarioSoundLoader';

interface StoryWithChoicesProps {
  stage: Stage;
  onStageChange: (stageId: number | string) => void;
  onGameEnd: (ending: any, earnings: number) => void;
  scenarioEndings: { [key: string]: any };
  colorScheme: 'light' | 'dark';
}

const StoryWithChoices: React.FC<StoryWithChoicesProps> = ({ 
  stage, 
  onStageChange, 
  onGameEnd, 
  scenarioEndings,
  colorScheme 
}) => {
  const [imageFadeAnim] = useState(new Animated.Value(0));
  const [sentences, setSentences] = useState<string[]>([]);
  const [sentenceAnimations, setSentenceAnimations] = useState<Animated.Value[]>([]);
  const [currentAnimatingIndex, setCurrentAnimatingIndex] = useState<number>(0);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [choicesFadeAnim] = useState(new Animated.Value(0));
  
  // Create audio player - use quizSound for quizzes, otherwise regular sound
  const audioFileName = stage.type === 'quiz' ? (stage.quizSound || stage.sound) : stage.sound;
  const audioSource = audioFileName ? getScenarioSound(audioFileName) : null;
  const player = useAudioPlayer(audioSource);

  // Split sentences and initialize animations when stage changes
  useEffect(() => {
    // Reset animations when stage changes
    imageFadeAnim.setValue(0);
    setCurrentAnimatingIndex(0);
    setShowChoices(false);
    choicesFadeAnim.setValue(0);
    
    // Get the correct image for this stage
    const imagePath = getScenarioImage(stage.id);
    
    // Better sentence splitting - handle multiple sentence endings
    const textLines = stage.text
      .split(/[.!?]+/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0);
    
    setSentences(textLines);
    
    // Create animation values for each sentence
    const newAnimations = textLines.map(() => new Animated.Value(0));
    setSentenceAnimations(newAnimations);

    // Animate the image fade-in
    Animated.timing(imageFadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [stage.id, imageFadeAnim, choicesFadeAnim]); // Only re-run when stage.id changes

  // Animate sentences one by one
  useEffect(() => {
    if (sentences.length > 0 && currentAnimatingIndex < sentences.length && sentenceAnimations[currentAnimatingIndex]) {
      // Play sound for each sentence (if available)
      if (audioSource && player && currentAnimatingIndex === 0) {
        try {
          player.seekTo(0);
          player.play();
        } catch (error) {
          console.log('Audio playback error:', error);
        }
      }
      
      // Fade in current sentence
      Animated.timing(sentenceAnimations[currentAnimatingIndex], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        // Move to next sentence after it's fully visible
        setTimeout(() => {
          if (currentAnimatingIndex < sentences.length - 1) {
            setCurrentAnimatingIndex(prev => prev + 1);
          } else {
            // Show choices after all sentences are displayed
            setTimeout(() => {
              setShowChoices(true);
              Animated.timing(choicesFadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }).start();
            }, 500);
          }
        }, 500);
      });
    }
  }, [currentAnimatingIndex, sentences, sentenceAnimations, player, audioSource, choicesFadeAnim]);

  const handleChoice = (nextStageId: number | string) => {
    onStageChange(nextStageId);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      if (stage?.on_correct) {
        onStageChange(stage.on_correct);
      }
    } else {
      if (stage?.on_wrong) {
        onStageChange(stage.on_wrong);
      }
    }
  };

  // Check if this stage is an ending
  if (typeof stage.id === 'string' && scenarioEndings[stage.id]) {
    const ending = scenarioEndings[stage.id];
    onGameEnd(ending, 0); // TODO: Add scoring if needed
    return null;
  }

  // Get the correct image for this stage
  const imagePath = getScenarioImage(stage.id);

  const styles = createStyles(colorScheme);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={imagePath}
        style={[styles.image, { opacity: imageFadeAnim }]}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          {sentences.map((sentence, index) => (
            <Animated.Text 
              key={index}
              style={[styles.sentence, { opacity: sentenceAnimations[index] || 0 }]}
            >
              {sentence}.
            </Animated.Text>
          ))}
        </View>
        
        <Animated.View style={[styles.choicesContainer, { opacity: choicesFadeAnim }]}>
          {showChoices && (
            <>
              <ThemedText style={styles.title}>{stage.title}</ThemedText>
              
              {stage.type === 'quiz' ? (
                <View>
                  {stage.question && (
                    <QuizQuestion
                      question={stage.question}
                      options={stage.options || []}
                      onAnswer={handleAnswer}
                      colorScheme={colorScheme}
                    />
                  )}
                </View>
              ) : (
                <View>
                  {stage.choices && stage.choices.length > 0 ? (
                    stage.choices.map((choice, index) => (
                      <Pressable
                        key={index}
                        onPress={() => handleChoice(choice.next_stage)}
                        style={styles.choiceButton}
                      >
                        <ThemedText style={styles.choiceText}>{choice.option}</ThemedText>
                      </Pressable>
                    ))
                  ) : null}
                </View>
              )}
            </>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const createStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    position: 'absolute',
    top: '15%',
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'center',
  },
  sentence: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  choicesContainer: {
    backgroundColor: Colors[colorScheme].background,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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

export default StoryWithChoices;