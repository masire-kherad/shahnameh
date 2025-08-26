import { Category, Poem, Poet, Verse } from '@/types/shahname';

const poets: Poet[] = require('../assets/db/poet.json');
const categories: Category[] = require('../assets/db/cat.json');
const poems: Poem[] = require('../assets/db/poem.json');
export const getShahnamehData = () => {
  return {
    poets,
    categories,
    poems,
  };
};

import { loadPoemVerses } from './poemLoader';

export const getPoem = (poemId: number) => {
  const poem = poems.find(p => p.id === poemId);
  if (!poem) {
    return null;
  }

  const verses = loadPoemVerses(poemId);

  return { ...poem, verses };
};

export const getPoems = () => {
  return poems;
};
