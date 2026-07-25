import { useAudioTrack } from "@/contexts/AudioTrackContext";
import {
  useAudioPlayer as useExpoAudioPlayer,
  useAudioPlayerStatus as useExpoAudioStatus,
} from "expo-audio";
import { useEffect, useMemo, useRef, useState } from "react";

interface UseAudioPlayerProps {
  uri: string | null | undefined;
  title?: string;
  onDismiss?: () => void;
}

export function useAudioPlayer({ uri, title, onDismiss }: UseAudioPlayerProps) {
  const source = useMemo(() => (uri ? { uri } : null), [uri]);
  const player = useExpoAudioPlayer(source);
  const status = useExpoAudioStatus(player);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const { setIsPlaying } = useAudioTrack();

  const playerRef = useRef(player);
  const prevUriRef = useRef<string | null | undefined>(null);

  playerRef.current = player;

  // Stop old audio when URI changes
  useEffect(() => {
    if (prevUriRef.current && prevUriRef.current !== uri) {
      try {
        playerRef.current?.pause();
      } catch (error) {
        console.log("Audio URI cleanup ignored:", error);
      }
    }

    prevUriRef.current = uri;
  }, [uri]);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      playerRef.current = null as any;
    };
  }, []);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) seconds = 0;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePlayPause = () => {
    try {
      if (!uri) return;

      if (status.playing) {
        player.pause();
        setIsPlaying(false);
      } else {
        if (
          status.isLoaded &&
          status.duration &&
          status.currentTime === status.duration
        ) {
          player.seekTo(0);
        }
        player.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Audio play/pause ignored:", error);
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

  const handleDismiss = () => {
    setIsPlaying(false);
    onDismiss?.();
  };

  const disabled = !uri;
  const isLoading = !status.isLoaded;
  const isPlaying = status.playing;
  const duration = status.duration || 0;
  const position = status.currentTime || 0;

  return {
    disabled,
    isLoading,
    isPlaying,
    duration,
    position,
    isSeeking,
    seekPosition,
    playbackRate,
    title,
    formatTime,
    handlePlayPause,
    handleSlidingStart,
    handleValueChange,
    handleSlidingComplete,
    handleRateChange,
    handleDismiss,
  };
}
