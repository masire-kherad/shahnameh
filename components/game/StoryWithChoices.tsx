import QuizQuestion from '@/components/game/QuizQuestion';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { getScenarioImage } from '@/services/scenarioImageLoader';
import { getScenarioSound } from '@/services/scenarioSoundLoader';
import { Stage } from '@/types/shahname';
import { useAudioPlayer } from 'expo-audio';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

interface StoryWithChoicesProps {
  stage: Stage;
  onStageChange: (stageId: number | string) => void;
  onGameEnd: (ending: any, earnings: number) => void;
  scenarioEndings: { [key: string]: any };
  colorScheme: 'light' | 'dark';
  isMuted: boolean;
  onToggleMute: () => void;
}

const StoryWithChoices: React.FC<StoryWithChoicesProps> = ({ 
  stage, 
  onStageChange, 
  onGameEnd, 
  scenarioEndings,
  colorScheme,
  isMuted,
  onToggleMute
}) => {
  const [sentences, setSentences] = useState<string[]>([]);
  const [sentenceAnimations, setSentenceAnimations] = useState<Animated.Value[]>([]);
  const [currentAnimatingIndex, setCurrentAnimatingIndex] = useState<number>(0);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [choicesFadeAnim] = useState(new Animated.Value(0));
  const [quizEarnings, setQuizEarnings] = useState(0);
  const [imageFadeAnim] = useState(new Animated.Value(1)); // Start fully visible
  const [showContent, setShowContent] = useState<boolean>(true);
  
  // Create audio player - use quizSound for quizzes, otherwise regular sound
  const audioFileName = stage.type === 'quiz' ? (stage.quizSound || stage.sound) : stage.sound;
  const audioSource = audioFileName ? getScenarioSound(audioFileName) : null;
  const player = useAudioPlayer(audioSource);
  
  // Store previous stage ID to detect changes
  const prevStageIdRef = useRef(stage.id);

  // Handle stage transitions
  useEffect(() => {
    const stageChanged = prevStageIdRef.current !== stage.id;
    
    if (stageChanged) {
      // Immediately hide content when stage changes
      setShowContent(false);
      imageFadeAnim.setValue(0);
      prevStageIdRef.current = stage.id;
      
      // Small delay to ensure content is hidden, then show new content
      setTimeout(() => {
        // Reset animations for new stage
        setCurrentAnimatingIndex(0);
        setShowChoices(false);
        choicesFadeAnim.setValue(0);
        
        // Set up sentences for new stage
        const textLines = stage.text
          .split(/[.!?]+/)
          .map(sentence => sentence.trim())
          .filter(sentence => sentence.length > 0);
        
        setSentences(textLines);
        const newAnimations = textLines.map(() => new Animated.Value(0));
        setSentenceAnimations(newAnimations);
        
        // Show new content with fade-in
        setShowContent(true);
        Animated.timing(imageFadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 50); // Small delay to ensure previous content is hidden
    } else {
      // Initial load or same stage
      const textLines = stage.text
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0);
      
      setSentences(textLines);
      const newAnimations = textLines.map(() => new Animated.Value(0));
      setSentenceAnimations(newAnimations);
    }
  }, [stage.id, imageFadeAnim, choicesFadeAnim]);

  // Update player mute state when isMuted prop changes
  useEffect(() => {
    player.muted = isMuted ?? false;
  }, [isMuted, player]);

  // Animate sentences one by one
  useEffect(() => {
    if (sentences.length > 0 && currentAnimatingIndex < sentences.length && sentenceAnimations[currentAnimatingIndex]) {
      // Play sound for each sentence (if available)
      if (audioSource && player && currentAnimatingIndex === 0) {
        player.seekTo(0);
        player.play();
        player.muted = isMuted ?? false;
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
  }, [currentAnimatingIndex, sentences, sentenceAnimations, player, audioSource, choicesFadeAnim, isMuted]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      // Award points for correct answer
      const points = 10; // 10 points for each correct answer
      setQuizEarnings(prev => prev + points);
      
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
    // Award points based on ending earnings or default values
    const endingEarnings = ending.earnings || 
      (stage.id === 'ending_good' ? 50 : 
       stage.id === 'ending_main' ? 30 : 
       stage.id === 'ending_bad' ? 10 : 0);
    // Total earnings = quiz earnings + ending earnings
    const totalEarnings = quizEarnings + endingEarnings;
    onGameEnd(ending, totalEarnings);
    return null;
  }

  // Get the correct image for this stage
  const imagePath = getScenarioImage(stage.id);

  const styles = createStyles(colorScheme);

  // Don't render anything if content should be hidden
  if (!showContent) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={imagePath}
        style={[styles.image, { opacity: imageFadeAnim }]}
        resizeMode="cover"
      />
      {/* Mute Button */}
      <Pressable 
        onPress={onToggleMute} 
        style={styles.muteButton}
      >
        <IconSymbol 
          name={isMuted ? "speaker.slash.fill" : "speaker.wave.2.fill"} 
          size={24} 
          color="#fff" 
        />
      </Pressable>
      <View style={styles.contentContainer}>
        <BlurView intensity={10} style={styles.textBlurContainer} tint={colorScheme === 'dark' ? 'dark' : 'light'}>
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
        </BlurView>
        
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
                        onPress={() => onStageChange(choice.next_stage)}
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
  muteButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textBlurContainer: {
    position: 'absolute',
    top: '15%',
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
  },
  textContainer: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Black with alpha for better visibility
    borderRadius: 10,
  },
  sentence: {
    fontSize: 22,
    color: '#ffffff', // White text for better contrast
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontWeight: '500',
  },
  choicesContainer: {
    backgroundColor: Colors[colorScheme].background + 'aa',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  choiceButton: {
    backgroundColor: Colors[colorScheme].background + 'aa',
    borderWidth: 1,
    borderColor: Colors[colorScheme].tint + 'aa',
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