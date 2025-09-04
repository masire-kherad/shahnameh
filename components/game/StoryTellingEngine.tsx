import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { Audio } from 'expo-av';
import { Stage } from '@/types/shahname';

interface StoryTellingEngineProps {
  stage: Stage;
  onTextAnimationComplete?: () => void;
}

const StoryTellingEngine: React.FC<StoryTellingEngineProps> = ({ stage, onTextAnimationComplete }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [sound, setSound] = useState<Audio.Sound>();
  const [sentences, setSentences] = useState<string[]>([]);
  const [animatedSentences, setAnimatedSentences] = useState<Animated.Value[]>([]);

  useEffect(() => {
    // Reset animations and sentences when stage changes
    fadeAnim.setValue(0);
    setSentences([]);
    setAnimatedSentences([]);

    // Animate the image fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Play sound effect
    const playSound = async () => {
      if (stage.sound) {
        const { sound } = await Audio.Sound.createAsync({ uri: stage.sound });
        setSound(sound);
        await sound.playAsync();
      }
      if (stage.type === 'quiz' && stage.quizSound) {
        const { sound: quizSound } = await Audio.Sound.createAsync({ uri: stage.quizSound });
        await quizSound.playAsync();
      }
    };

    playSound();

    const textLines = stage.text.split('.').filter(line => line.trim() !== '');
    setSentences(textLines);
    const sentenceAnimations = textLines.map(() => new Animated.Value(0));
    setAnimatedSentences(sentenceAnimations);

    const animations = sentenceAnimations.map(anim => Animated.timing(anim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }));

    Animated.sequence(animations).start(() => {
      onTextAnimationComplete?.();
    });

    return () => {
      sound?.unloadAsync();
    };
  }, [stage, onTextAnimationComplete]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: stage.image }}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        {sentences.map((sentence, index) => (
          <Animated.Text key={index} style={[styles.sentence, { opacity: animatedSentences[index] }]}>
            {sentence}.
          </Animated.Text>
        ))}
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
