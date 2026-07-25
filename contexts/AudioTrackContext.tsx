import React, { createContext, useCallback, useContext, useState } from "react";

export interface AudioTrack {
  uri: string;
  title?: string;
}

interface AudioTrackContextType {
  currentTrack: AudioTrack | null;
  isPlayerVisible: boolean;
  isPlaying: boolean;
  setTrack: (track: AudioTrack | null) => void;
  clearTrack: () => void;
  showPlayer: () => void;
  hidePlayer: () => void;
  setIsPlaying: (playing: boolean) => void;
}

const AudioTrackContext = createContext<AudioTrackContextType>({
  currentTrack: null,
  isPlayerVisible: false,
  isPlaying: false,
  setTrack: () => {},
  clearTrack: () => {},
  showPlayer: () => {},
  hidePlayer: () => {},
  setIsPlaying: () => {},
});

export const useAudioTrack = () => useContext(AudioTrackContext);

export const AudioTrackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const setTrack = useCallback((track: AudioTrack | null) => {
    setCurrentTrack(track);
    setIsPlayerVisible(true);
  }, []);

  const clearTrack = useCallback(() => {
    setCurrentTrack(null);
    setIsPlaying(false);
    setIsPlayerVisible(false);
  }, []);

  const showPlayer = useCallback(() => {
    setIsPlayerVisible(true);
  }, []);

  const hidePlayer = useCallback(() => {
    setIsPlayerVisible(false);
  }, []);

  return (
    <AudioTrackContext.Provider
      value={{
        currentTrack,
        isPlayerVisible,
        isPlaying,
        setTrack,
        clearTrack,
        showPlayer,
        hidePlayer,
        setIsPlaying,
      }}
    >
      {children}
    </AudioTrackContext.Provider>
  );
};
