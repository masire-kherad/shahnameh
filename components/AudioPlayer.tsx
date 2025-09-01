import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import Slider from '@react-native-community/slider';
import { IconSymbol } from './ui/IconSymbol';

interface AudioPlayerProps {
  uri: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ uri }) => {
  const player = useAudioPlayer({ uri });
  const status = useAudioPlayerStatus(player);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayPause = () => {
    if (status.playing) {
      player.pause();
    } else {
      // If the track is at the end, seek to the beginning before playing
      if (status.currentTime === status.duration) {
        player.seekTo(0);
      }
      player.play();
    }
  };

  const handleSlidingComplete = (value: number) => {
    player.seekTo(value);
  };

  const isLoading = !status.isLoaded;
  const isPlaying = status.playing;
  const duration = status.duration || 0;
  const position = status.currentTime || 0;

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
