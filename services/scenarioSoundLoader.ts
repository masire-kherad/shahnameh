export const scenarioSounds: { [key: string]: any } = {
  'bad_news.wav': require('@/assets/sounds/bad_news.wav'),
  'sword.wav': require('@/assets/sounds/sword.wav'),
  'ver_bad_news.wav': require('@/assets/sounds/ver_bad_news.wav'),
  'agressive.wav': require('@/assets/sounds/agressive.wav'),
  'royal_intro.wav': require('@/assets/sounds/royal_intro.wav'),
  'happy.wav': require('@/assets/sounds/happy.wav'),
};

export const getScenarioSound = (soundFileName: string) => {
  if (scenarioSounds[soundFileName]) {
    return scenarioSounds[soundFileName];
  }
  return null;
};