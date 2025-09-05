export const scenarioImages: { [key: string]: any } = {
  // Stage images
  '1': require('@/assets/images/Scenarios/Qmars/id_1.png'),
  '2': require('@/assets/images/Scenarios/Qmars/id_2.png'),
  '3': require('@/assets/images/Scenarios/Qmars/id_3.png'),
  '4': require('@/assets/images/Scenarios/Qmars/id_4.png'),
  // Quiz images should use the same as their corresponding stages
  'quiz_1': require('@/assets/images/Scenarios/Qmars/id_1.png'),
  'quiz_2': require('@/assets/images/Scenarios/Qmars/id_2.png'),
  'quiz_3': require('@/assets/images/Scenarios/Qmars/id_3.png'),
};

export const getScenarioImage = (stageId: number | string) => {
  const id = stageId.toString();
  if (scenarioImages[id]) {
    return scenarioImages[id];
  }
  // Fallback to first image
  return scenarioImages['1'];
};