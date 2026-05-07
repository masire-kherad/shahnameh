import { IconSymbol } from '@/components/ui/IconSymbol';
import Slider from '@react-native-community/slider';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface AudioPlayerProps {
  uri: string | null | undefined;
  title?: string;
  onDismiss?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ uri, title, onDismiss }) => {
  const {
    disabled,
    isLoading,
    isPlaying,
    duration,
    position,
    isSeeking,
    seekPosition,
    playbackRate,
    title: hookTitle,
    formatTime,
    handlePlayPause,
    handleSlidingStart,
    handleValueChange,
    handleSlidingComplete,
    handleRateChange,
    handleDismiss,
  } = useAudioPlayer({ uri, title, onDismiss });

  if (disabled) {
    return (
      <View style={stylesDisabled.container}>
        {title != null && (
          <View style={stylesDisabled.titleRow}>
            <Text style={stylesDisabled.titleText} numberOfLines={1}>
              {title}
            </Text>
          </View>
        )}
        <Text style={stylesDisabled.text}>صوت این بخش هنوز آماده نشده است</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {hookTitle != null && (
        <View style={styles.titleRow}>
          <Text style={styles.titleText} numberOfLines={1}>
            {hookTitle}
          </Text>
        </View>
      )}

      <View style={styles.controlsRow}>
        <Pressable onPress={handlePlayPause} disabled={isLoading}>
          <IconSymbol
            name={isPlaying ? 'pause.circle.fill' : 'play.circle.fill'}
            size={40}
            color={isLoading ? '#ccc' : '#fff'}
          />
        </Pressable>

        <View style={styles.sliderContainer}>
          <Text style={styles.timeText}>
            {formatTime(isSeeking ? seekPosition : position)}
          </Text>
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
            disabled={Platform.OS === 'web'}
          />
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>

        <Pressable onPress={handleRateChange} style={styles.speedButton}>
          <Text style={styles.speedButtonText}>{playbackRate}x</Text>
        </Pressable>

        {onDismiss != null && (
          <Pressable onPress={handleDismiss} style={styles.dismissButton}>
            <Text style={styles.dismissButtonText}>✕</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 5,
    shadowColor: '#000',
  },
  titleRow: { marginBottom: -3, alignItems: 'center' },
  titleText: { color: '#fff', fontSize: 14, opacity: 0.7 },
  controlsRow: { flexDirection: 'row', alignItems: 'center' },
  sliderContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 16 },
  slider: { flex: 1, marginHorizontal: 8 },
  timeText: { color: '#fff', fontSize: 14, width: 40, textAlign: 'center' },
  speedButton: { padding: 8, marginLeft: 16, backgroundColor: '#555', borderRadius: 10 },
  speedButtonText: { color: '#fff', fontSize: 14 },
  dismissButton: { marginLeft: 8, padding: 4 },
  dismissButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

const stylesDisabled = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRow: { marginBottom: 8, alignItems: 'center' },
  titleText: { color: '#ccc', fontSize: 14 },
  text: { color: '#ccc', fontSize: 16 },
});

export default AudioPlayer;
