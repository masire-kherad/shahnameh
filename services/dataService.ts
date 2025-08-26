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

export const getRoadmap = () => {
  const shahnamehCategory = categories.find(c => c.text === 'شاهنامه');
  if (!shahnamehCategory) {
    return [];
  }

  const mainSections = categories.filter(c => c.parent_id === shahnamehCategory.id);

  const roadmap = mainSections.map(section => {
    const sectionPoems = poems.filter(p => p.cat_id === section.id);
    return {
      ...section,
      poems: sectionPoems,
    };
  });

  return roadmap;
};
