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
