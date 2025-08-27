export interface Poet {
  id: number;
  name: string;
  cat_id: number;
  description: string;
}

export interface Category {
  id: number;
  poet_id: number;
  text: string;
  parent_id: number;
  image: string;
}

export interface Poem {
  id: number;
  cat_id: number;
  title: string;
  url: string;
}

export interface Verse {
  poem_id: number;
  vorder: number;
  position: 0 | 1;
  text: string;
}
