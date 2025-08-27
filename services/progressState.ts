import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCompletedPoems as getCompletedFromStorage, getFavorites as getFavoritesFromStorage } from './progressService';

// == Keys for AsyncStorage ==
const COMPLETED_POEMS_KEY = 'completed_poems';
const FAVORITE_POEMS_KEY = 'favorite_poems';

// == Types ==
export type CompletedPoems = Record<number, boolean>;
export type FavoritePoems = Record<number, boolean>;
type Listener = () => void;

// == State ==
let completedPoems: CompletedPoems = {};
let favoritePoems: FavoritePoems = {};
let listeners: Listener[] = [];

// == Private Functions ==
const notify = () => {
  listeners.forEach(listener => listener());
};

const persistCompleted = async () => {
  try {
    await AsyncStorage.setItem(COMPLETED_POEMS_KEY, JSON.stringify(completedPoems));
  } catch (e) {
    console.error('Failed to persist completed poems.', e);
  }
};

const persistFavorites = async () => {
  try {
    await AsyncStorage.setItem(FAVORITE_POEMS_KEY, JSON.stringify(favoritePoems));
  } catch (e) {
    console.error('Failed to persist favorite poems.', e);
  }
};

// == Public API ==
export const progressState = {
  async init() {
    completedPoems = await getCompletedFromStorage();
    favoritePoems = await getFavoritesFromStorage();
    notify();
  },

  subscribe(listener: Listener) {
    listeners.push(listener);
    return () => {
      // Unsubscribe function
      listeners = listeners.filter(l => l !== listener);
    };
  },

  getSnapshot() {
    return { completedPoems, favoritePoems };
  },

  markPoemAsComplete(poemId: number) {
    if (!completedPoems[poemId]) {
      completedPoems[poemId] = true;
      persistCompleted();
      notify();
    }
  },

  unmarkPoemAsComplete(poemId: number) {
    if (completedPoems[poemId]) {
      delete completedPoems[poemId];
      persistCompleted();
      notify();
    }
  },

  addFavorite(poemId: number) {
    if (!favoritePoems[poemId]) {
      favoritePoems[poemId] = true;
      persistFavorites();
      notify();
    }
  },

  removeFavorite(poemId: number) {
    if (favoritePoems[poemId]) {
      delete favoritePoems[poemId];
      persistFavorites();
      notify();
    }
  },
};

// Initialize the state when the module is loaded
progressState.init();
