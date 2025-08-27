import { useState, useEffect } from 'react';
import { progressState, CompletedPoems, FavoritePoems } from '../services/progressState';

export const useProgress = () => {
  const [state, setState] = useState(progressState.getSnapshot());

  useEffect(() => {
    const unsubscribe = progressState.subscribe(() => {
      setState(progressState.getSnapshot());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    completedPoems: state.completedPoems,
    favoritePoems: state.favoritePoems,
    markPoemAsComplete: progressState.markPoemAsComplete,
    unmarkPoemAsComplete: progressState.unmarkPoemAsComplete,
    addFavorite: progressState.addFavorite,
    removeFavorite: progressState.removeFavorite,
  };
};
