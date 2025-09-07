export const scenarioImages: { [key: string]: any } = {
  // QMars Stage images
  'qmars_1': require('@/assets/images/Scenarios/Qmars/id_1.png'),
  'qmars_2': require('@/assets/images/Scenarios/Qmars/id_2.png'),
  'qmars_3': require('@/assets/images/Scenarios/Qmars/id_3.png'),
  'qmars_4': require('@/assets/images/Scenarios/Qmars/id_4.png'),
  // QMars Quiz images should use the same as their corresponding stages
  'qmars_quiz_1': require('@/assets/images/Scenarios/Qmars/id_1.png'),
  'qmars_quiz_2': require('@/assets/images/Scenarios/Qmars/id_2.png'),
  'qmars_quiz_3': require('@/assets/images/Scenarios/Qmars/id_3.png'),
  
  // Hooshang Stage images
  'hushang_1': require('@/assets/images/Scenarios/Hooshang/id_1.png'),
  'hushang_2': require('@/assets/images/Scenarios/Hooshang/id_2.png'),
  'hushang_3': require('@/assets/images/Scenarios/Hooshang/id_3.png'),
  'hushang_4': require('@/assets/images/Scenarios/Hooshang/id_4.png'),
  'hushang_5': require('@/assets/images/Scenarios/Hooshang/id_5.png'),
  // Hooshang Quiz images should use the same as their corresponding stages
  'hushang_quiz_1': require('@/assets/images/Scenarios/Hooshang/id_1.png'),
  'hushang_quiz_2': require('@/assets/images/Scenarios/Hooshang/id_2.png'),
  'hushang_quiz_3': require('@/assets/images/Scenarios/Hooshang/id_3.png'),
  'hushang_quiz_4': require('@/assets/images/Scenarios/Hooshang/id_4.png'),
  
  // Tahmores Stage images
  'tahmoores_1': require('@/assets/images/Scenarios/Tahmores/id_1.png'),
  'tahmoores_2': require('@/assets/images/Scenarios/Tahmores/id_2.png'),
  'tahmoores_3': require('@/assets/images/Scenarios/Tahmores/id_3.png'),
  'tahmoores_4': require('@/assets/images/Scenarios/Tahmores/id_4.png'),
  'tahmoores_5': require('@/assets/images/Scenarios/Tahmores/id_5.png'),
  'tahmoores_6': require('@/assets/images/Scenarios/Tahmores/id_6.png'),
  // Tahmores Quiz images should use the same as their corresponding stages
  'tahmoores_quiz_1': require('@/assets/images/Scenarios/Tahmores/id_1.png'),
  'tahmoores_quiz_2': require('@/assets/images/Scenarios/Tahmores/id_2.png'),
  'tahmoores_quiz_3': require('@/assets/images/Scenarios/Tahmores/id_3.png'),
  'tahmoores_quiz_4': require('@/assets/images/Scenarios/Tahmores/id_4.png'),
  'tahmoores_quiz_5': require('@/assets/images/Scenarios/Tahmores/id_5.png'),
};

export const getScenarioImage = (scenarioType: string, stageId: number | string) => {
  const id = stageId.toString();
  const key = `${scenarioType}_${id}`;
  
  if (scenarioImages[key]) {
    return scenarioImages[key];
  }
  
  // Fallback to first image of the specified scenario
  const fallbackKey = `${scenarioType}_1`;
  if (scenarioImages[fallbackKey]) {
    return scenarioImages[fallbackKey];
  }
  
  // Ultimate fallback to first QMars image
  return scenarioImages['qmars_1'];
};