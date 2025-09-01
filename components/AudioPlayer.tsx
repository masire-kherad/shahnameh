import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';
import { IconSymbol } from './ui/IconSymbol';

interface AudioPlayerProps {
  uri: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ uri }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${(Number(seconds) < 10 ? '0' : '')}${seconds}`;
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
    }
  };

  async function loadSound() {
    setIsLoading(true);
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
    setIsLoading(false);
  }

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [uri]);

  const handlePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const handleSlidingComplete = async (value: number) => {
    if (!sound) return;
    await sound.setPositionAsync(value);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePlayPause} disabled={isLoading}>
        <IconSymbol
          name={isPlaying ? 'pause.circle.fill' : 'play.circle.fill'}
          size={40}
          color={isLoading ? '#ccc' : '#fff'}
        />
      </Pressable>
      <View style={styles.sliderContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#AAAAAA"
          thumbTintColor="#FFFFFF"
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  slider: {
    flex: 1,
    marginHorizontal: 8,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default AudioPlayer;
