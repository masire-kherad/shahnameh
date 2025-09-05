import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { Stage } from '@/types/shahname';

interface AnimatedSentenceProps {
  sentence: string;
  soundUri?: string;
  onAnimationStart: () => void;
  onAnimationComplete: () => void;
}

const AnimatedSentence: React.FC<AnimatedSentenceProps> = ({ sentence, soundUri, onAnimationStart, onAnimationComplete }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const player = useAudioPlayer(soundUri);

  useEffect(() => {
    onAnimationStart();
    if (player) {
      player.play();
    }
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
        onAnimationComplete();
    });
  }, [fadeAnim, onAnimationComplete, onAnimationStart, player]);

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
  const [visibleSentences, setVisibleSentences] = useState<string[]>([]);

  useEffect(() => {
    // Reset animations and sentences when stage changes
    fadeAnim.setValue(0);
    const textLines = stage.text.split('.').filter(line => line.trim() !== '');
    setSentences(textLines);
    setVisibleSentences([]);

    // Animate the image fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
        if(textLines.length > 0) {
            setVisibleSentences([textLines[0]]);
        }
    });
  }, [stage]);

  const handleAnimationComplete = () => {
    if (visibleSentences.length < sentences.length) {
      setVisibleSentences([...visibleSentences, sentences[visibleSentences.length]]);
    } else {
      onTextAnimationComplete?.();
    }
  };

  const handleAnimationStart = () => {
    // This function is called when the animation for a sentence starts.
    // We can use this to play a sound or perform other actions.
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: stage.image }}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        {visibleSentences.map((sentence, index) => (
          <AnimatedSentence
            key={index}
            sentence={sentence}
            soundUri={stage.sound}
            onAnimationStart={handleAnimationStart}
            onAnimationComplete={handleAnimationComplete}
          />
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
