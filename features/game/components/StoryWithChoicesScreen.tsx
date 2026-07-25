import { QuizQuestion } from '@/components/game/QuizQuestion';
import { ScenarioEnding, ScenarioStage, ScenarioType } from '@/types/shahname';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Animated,
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useStoryWithChoices } from './useStoryWithChoices';

interface StoryWithChoicesScreenProps {
  stage: ScenarioStage;
  onStageChange: (nextStageId: string) => void;
  onGameEnd: (ending: ScenarioEnding) => void;
  scenarioEndings: ScenarioEnding[];
  colorScheme: 'light' | 'dark';
  isMuted: boolean;
  onToggleMute: () => void;
  scenarioType: ScenarioType;
}

const { width, height } = Dimensions.get('window');

export const StoryWithChoicesScreen: React.FC<StoryWithChoicesScreenProps> = ({
  stage,
  onStageChange,
  onGameEnd,
  scenarioEndings,
  colorScheme,
  isMuted,
  onToggleMute,
  scenarioType,
}) => {
  const {
    displayedText,
    isAnimating,
    showChoices,
    fadeOut,
    fadeIn,
    quizEarnings,
    isPlaying,
    currentImageIndex,
    handleChoiceSelect,
    handleQuizComplete,
    handleToggleMute,
    setCurrentImageIndex,
  } = useStoryWithChoices({
    stage,
    onStageChange,
    onGameEnd,
    scenarioEndings,
    colorScheme,
    isMuted,
    onToggleMute,
    scenarioType,
  });

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const textOpacity = React.useRef(new Animated.Value(0)).current;

  // Background images logic
  const backgroundImages = stage.images || [];
  const currentBackground = backgroundImages[currentImageIndex] || { uri: '' };

  // Render choices
  const renderChoices = () => {
    if (!stage.choices || stage.choices.length === 0) return null;

    return (
      <Animated.View
        style={[
          styles.choicesContainer,
          {
            opacity: showChoices ? fadeAnim : 0,
            transform: [
              {
                translateY: showChoices
                  ? fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    })
                  : 50,
              },
            ],
          },
        ]}
      >
        {stage.choices.map((choice, index) => (
          <TouchableOpacity
            key={choice.id}
            style={[
              styles.choiceButton,
              colorScheme === 'dark' ? styles.choiceButtonDark : styles.choiceButtonLight,
            ]}
            onPress={() => handleChoiceSelect(choice.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.choiceText,
                colorScheme === 'dark' ? styles.choiceTextDark : styles.choiceTextLight,
              ]}
            >
              {choice.text}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    );
  };

  // Render quiz
  const renderQuiz = () => {
    if (stage.type !== 'quiz' || !stage.quiz) return null;

    return (
      <View style={styles.quizContainer}>
        <QuizQuestion
          question={stage.quiz.question}
          options={stage.quiz.options}
          correctAnswer={stage.quiz.correctAnswer}
          onComplete={handleQuizComplete}
          colorScheme={colorScheme}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={currentBackground}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={
            colorScheme === 'dark'
              ? ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']
              : ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.7)']
          }
          style={styles.gradientOverlay}
        />

        {/* Mute Button */}
        <TouchableOpacity
          style={styles.muteButton}
          onPress={handleToggleMute}
        >
          <Ionicons
            name={isMuted ? 'volume-mute' : 'volume-high'}
            size={24}
            color={colorScheme === 'dark' ? '#fff' : '#000'}
          />
        </TouchableOpacity>

        {/* Story Text Container */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeOut ? 0 : fadeIn ? fadeAnim : 1,
              transform: [
                {
                  translateY: fadeOut
                    ? fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-50, 0],
                      })
                    : fadeIn
                    ? fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      })
                    : 0,
                },
              ],
            },
          ]}
        >
          <ScrollView
            style={styles.textScrollView}
            contentContainerStyle={styles.textContentContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={[
                styles.storyText,
                colorScheme === 'dark' ? styles.storyTextDark : styles.storyTextLight,
              ]}
            >
              {displayedText}
              {isAnimating && (
                <Text style={styles.cursor}>|</Text>
              )}
            </Text>
          </ScrollView>
        </Animated.View>

        {/* Choices or Quiz */}
        <View style={styles.interactionContainer}>
          {stage.type === 'quiz' ? renderQuiz() : renderChoices()}
        </View>

        {/* Image Gallery Indicator */}
        {backgroundImages.length > 1 && (
          <View style={styles.imageIndicatorContainer}>
            {backgroundImages.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.imageIndicator,
                  index === currentImageIndex
                    ? styles.imageIndicatorActive
                    : styles.imageIndicatorInactive,
                ]}
                onPress={() => setCurrentImageIndex(index)}
              />
            ))}
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  muteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 10,
  },
  textContainer: {
    position: 'absolute',
    bottom: 200,
    left: 20,
    right: 20,
    maxHeight: height * 0.4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 15,
  },
  textScrollView: {
    flex: 1,
  },
  textContentContainer: {
    flexGrow: 1,
  },
  storyText: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'Vazirmatn-Regular',
  },
  storyTextLight: {
    color: '#333',
  },
  storyTextDark: {
    color: '#fff',
  },
  cursor: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  choicesContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  choiceButton: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
  },
  choiceButtonLight: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: '#ddd',
  },
  choiceButtonDark: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderColor: '#444',
  },
  choiceText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Vazirmatn-Regular',
  },
  choiceTextLight: {
    color: '#333',
  },
  choiceTextDark: {
    color: '#fff',
  },
  interactionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  quizContainer: {
    padding: 20,
  },
  imageIndicatorContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  imageIndicatorActive: {
    backgroundColor: '#FFD700',
  },
  imageIndicatorInactive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
