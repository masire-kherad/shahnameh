import { Scenario } from '@/types/shahname';

const scenarios: { [key: string]: Scenario } = {
  qmars: require('@/assets/db/Scenarios/Qmars.json'),
  hushang: require('@/assets/db/Scenarios/Hooshang.json'),
  tahmoores: require('@/assets/db/Scenarios/Tahmores.json'),
};

export const getScenario = (characterName: string): Scenario | null => {
  if (characterName && scenarios[characterName]) {
    return scenarios[characterName];
  }
  return null;
};
