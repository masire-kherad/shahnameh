// This is a mocked version of the database module to test if the C++ crash
// is related to expo-sqlite.

export interface Category {
  id: number;
  poet_id: number;
  text: string;
  parent_id: number;
  url: string;
}

export async function getCategories(): Promise<Category[]> {
  console.log('--- MOCK DB: getCategories() called ---');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, poet_id: 1, text: 'Mock Category 1', parent_id: 0, url: 'mock-cat-1' },
        { id: 2, poet_id: 1, text: 'Mock Category 2', parent_id: 0, url: 'mock-cat-2' },
        { id: 3, poet_id: 1, text: 'Mock Category 3', parent_id: 1, url: 'mock-cat-3' },
      ]);
    }, 100);
  });
}


export interface Poem {
  id: number;
  cat_id: number;
  title: string;
  url: string;
}

export async function getPoemsByCategoryId(catId: number): Promise<Poem[]> {
  console.log(`--- MOCK DB: getPoemsByCategoryId(${catId}) called ---`);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 101, cat_id: catId, title: 'Mock Poem A', url: 'mock-poem-a' },
        { id: 102, cat_id: catId, title: 'Mock Poem B', url: 'mock-poem-b' },
      ]);
    }, 100);
  });
}


export interface Verse {
  poem_id: number;
  vorder: number;
  position: number;
  text: string;
}

export async function getVersesByPoemId(poemId: number): Promise<Verse[]> {
  console.log(`--- MOCK DB: getVersesByPoemId(${poemId}) called ---`);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { poem_id: poemId, vorder: 1, position: 1, text: 'This is the first mock verse.' },
        { poem_id: poemId, vorder: 2, position: 2, text: 'This is the second mock verse.' },
        { poem_id: poemId, vorder: 3, position: 1, text: 'This is the third mock verse.' },
        { poem_id: poemId, vorder: 4, position: 2, text: 'This is the fourth mock verse.' },
      ]);
    }, 100);
  });
}
