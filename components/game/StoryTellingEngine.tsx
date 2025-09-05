import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { Audio } from 'expo-av';
import { Stage } from '@/types/shahname';

interface StoryTellingEngineProps {
  stage: Stage;
  onTextAnimationComplete?: () => void;
}

const StoryTellingEngine: React.FC<StoryTellingEngineProps> = ({ stage, onTextAnimationComplete }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [sentences, setSentences] = useState<string[]>([]);
  const [animatedSentences, setAnimatedSentences] = useState<Animated.Value[]>([]);
  const [sounds, setSounds] = useState<Audio.Sound[]>([]);

  useEffect(() => {
    // Reset animations and sentences when stage changes
    fadeAnim.setValue(0);
    const textLines = stage.text.split('.').filter(line => line.trim() !== '');
    setSentences(textLines);
    setAnimatedSentences(textLines.map(() => new Animated.Value(0)));

    // Animate the image fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Create and play sounds
    const createAndPlaySounds = async () => {
      const loadedSounds: Audio.Sound[] = [];
      if (stage.sound) {
        for (let i = 0; i < textLines.length; i++) {
          const { sound } = await Audio.Sound.createAsync({ uri: stage.sound });
          loadedSounds.push(sound);
        }
        setSounds(loadedSounds);
      }
    };
    createAndPlaySounds();

    return () => {
      // Unload all sounds
      sounds.forEach(sound => sound.unloadAsync());
    };
  }, [stage]);

  useEffect(() => {
    if (animatedSentences.length > 0) {
      const animations = animatedSentences.map((anim, index) => {
        return Animated.timing(anim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          delay: index * 2000,
        });
      });

      Animated.sequence(animations).start(() => {
        onTextAnimationComplete?.();
      });

      // Play sounds in sequence
      sounds.forEach((sound, index) => {
        setTimeout(() => {
          sound.replayAsync();
        }, index * 2000);
      });
    }
  }, [animatedSentences, onTextAnimationComplete, sounds]);

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
