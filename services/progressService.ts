import AsyncStorage from '@react-native-async-storage/async-storage';

const COMPLETED_POEMS_KEY = 'completed_poems';

// == Types ==
export type CompletedPoems = Record<number, boolean>;

// == Functions ==

/**
 * Retrieves the set of completed poem IDs from AsyncStorage.
 * @returns {Promise<CompletedPoems>} An object where keys are completed poem IDs.
 */
export const getCompletedPoems = async (): Promise<CompletedPoems> => {
  try {
    const completed = await AsyncStorage.getItem(COMPLETED_POEMS_KEY);
    return completed ? JSON.parse(completed) : {};
  } catch (e) {
    console.error('Failed to get completed poems.', e);
    return {};
  }
};

/**
 * Marks a poem as complete and saves it to AsyncStorage.
 * @param {number} poemId - The ID of the poem to mark as complete.
 */
export const markPoemAsComplete = async (poemId: number) => {
  try {
    const completedPoems = await getCompletedPoems();
    completedPoems[poemId] = true;
    await AsyncStorage.setItem(COMPLETED_POEMS_KEY, JSON.stringify(completedPoems));
  } catch (e) {
    console.error('Failed to mark poem as complete.', e);
  }
};

/**
 * Marks a poem as not complete and saves it to AsyncStorage.
 * @param {number} poemId - The ID of the poem to mark as not complete.
 */
export const unmarkPoemAsComplete = async (poemId: number) => {
  try {
    const completedPoems = await getCompletedPoems();
    delete completedPoems[poemId];
    await AsyncStorage.setItem(COMPLETED_POEMS_KEY, JSON.stringify(completedPoems));
  } catch (e) {
    console.error('Failed to unmark poem as complete.', e);
  }
};

const FAVORITE_POEMS_KEY = 'favorite_poems';

export type FavoritePoems = Record<number, boolean>;

export const getFavorites = async (): Promise<FavoritePoems> => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITE_POEMS_KEY);
    return favorites ? JSON.parse(favorites) : {};
  } catch (e) {
    console.error('Failed to get favorites.', e);
    return {};
  }
};

export const isFavorite = async (poemId: number): Promise<boolean> => {
  const favorites = await getFavorites();
  return !!favorites[poemId];
};

export const addFavorite = async (poemId: number) => {
  try {
    const favorites = await getFavorites();
    favorites[poemId] = true;
    await AsyncStorage.setItem(FAVORITE_POEMS_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to add favorite.', e);
  }
};

export const removeFavorite = async (poemId: number) => {
  try {
    const favorites = await getFavorites();
    delete favorites[poemId];
    await AsyncStorage.setItem(FAVORITE_POEMS_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to remove favorite.', e);
  }
};
