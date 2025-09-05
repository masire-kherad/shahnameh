import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { useAudioPlayer, AudioPlayer } from 'expo-audio';
import { Stage } from '@/types/shahname';

interface AnimatedSentenceProps {
  sentence: string;
  soundUri?: string;
  onAnimationComplete: () => void;
}

const AnimatedSentence: React.FC<AnimatedSentenceProps> = ({ sentence, soundUri, onAnimationComplete }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const player = useAudioPlayer(soundUri);

  useEffect(() => {
    if (player) {
      player.play();
    }
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          onAnimationComplete();
        });
      }, 2000); // Wait for 2 seconds before fading out
    });
  }, [fadeAnim, onAnimationComplete, player]);

  return (
    <Animated.Text style={[styles.sentence, { opacity: fadeAnim }]}>
      {sentence}.
    </Animated.Text>
  );
};


interface StoryTellingEngineProps {
  stage: Stage;
  onTextAnimationComplete?: () => void;
}

const StoryTellingEngine: React.FC<StoryTellingEngineProps> = ({ stage, onTextAnimationComplete }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(() => {
    // Reset animations and sentences when stage changes
    fadeAnim.setValue(0);
    const textLines = stage.text.split('.').filter(line => line.trim() !== '');
    setSentences(textLines);
    setCurrentSentenceIndex(0);

    // Animate the image fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [stage]);

  const handleAnimationComplete = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    } else {
      onTextAnimationComplete?.();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: stage.image }}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        {sentences.length > 0 && currentSentenceIndex < sentences.length && (
          <AnimatedSentence
            sentence={sentences[currentSentenceIndex]}
            soundUri={stage.sound}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    top: '20%',
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
});

export default StoryTellingEngine;
