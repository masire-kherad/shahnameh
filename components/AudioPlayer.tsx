import React, { useState, useMemo } from 'react';
import { View, Pressable, StyleSheet, Text, Platform } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import Slider from '@react-native-community/slider';
import { IconSymbol } from './ui/IconSymbol';

interface AudioPlayerProps {
  uri: string | null | undefined;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ uri }) => {
  const source = useMemo(() => (uri ? { uri } : null), [uri]);
  const player = useAudioPlayer(source, 100);
  const status = useAudioPlayerStatus(player);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) seconds = 0;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayPause = () => {
    if (!uri) return;
    if (status.playing) {
      player.pause();
    } else {
      if (status.isLoaded && status.duration && status.currentTime === status.duration) {
        player.seekTo(0);
      }
      player.play();
    }
  };

  const handleSlidingStart = (value: number) => {
    if (!uri) return;
    setIsSeeking(true);
    setSeekPosition(value);
  };

  const handleValueChange = (value: number) => {
    if (!uri) return;
    setSeekPosition(value);
  };

  const handleSlidingComplete = (value: number) => {
    if (!uri) return;
    setIsSeeking(false);
    player.seekTo(value);
  };

  const handleRateChange = () => {
    const rates = [1, 1.5, 2, 4];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    setPlaybackRate(newRate);
    player.setPlaybackRate(newRate);
  };

  const disabled = !uri;
  const isLoading = status.isLoading;
  const isPlaying = status.playing;
  const duration = status.duration || 0;
  const position = status.currentTime || 0;

  if (disabled) {
    return (
      <View style={[styles.container, styles.disabledContainer]}>
        <Text style={styles.disabledText}>صوت این بخش هنوز آماده نشده است</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePlayPause} disabled={isLoading || disabled}>
        {Platform.OS === 'web' ? (
          <Text style={styles.webButton}>{isPlaying ? 'Pause' : 'Play'}</Text>
        ) : (
          <IconSymbol
            name={isPlaying ? 'pause.circle.fill' : 'play.circle.fill'}
            size={40}
            color={isLoading || disabled ? '#ccc' : '#fff'}
          />
        )}
      </Pressable>
      <View style={styles.sliderContainer}>
        <Text style={styles.timeText}>{formatTime(isSeeking ? seekPosition : position)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={isSeeking ? seekPosition : position}
          onSlidingStart={handleSlidingStart}
          onValueChange={handleValueChange}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#AAAAAA"
          thumbTintColor="#FFFFFF"
          disabled={disabled || Platform.OS === 'web'}
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
      <Pressable onPress={handleRateChange} style={styles.speedButton}>
        <Text style={styles.speedButtonText}>{playbackRate}x</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  speedButton: {
    padding: 8,
    marginLeft: 16,
    backgroundColor: '#555',
    borderRadius: 5,
  },
  speedButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  webButton: {
    color: '#fff',
    fontSize: 18,
    padding: 10,
  },
  disabledContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  disabledText: {
    color: '#ccc',
    fontSize: 16,
  },
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
    width: 40, // Fixed width to prevent layout shifts
    textAlign: 'center',
  },
});

export default AudioPlayer;
