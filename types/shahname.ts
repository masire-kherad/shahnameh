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
export interface Scenario {
  game_title: string;
  description: string;
  stages: Stage[];
  endings: { [key: string]: Ending };
  summary?: string;
}

export interface Stage {
  id: number | string;
  type?: 'quiz';
  title: string;
  text: string;
  image?: string;
  sound?: string;
  quizSound?: string;
  choices?: Choice[];
  question?: string;
  options?: QuizOption[];
  on_correct?: number | string;
  on_wrong?: number | string;
}

export interface Choice {
  option: string;
  next_stage: number | string;
}

export interface QuizOption {
  [key: string]: string | boolean;
}

export interface Ending {
  title: string;
  text: string;
  earnings?: number;
}
