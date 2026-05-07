import { useCurrency } from '@/hooks/useCurrency';
import { getCategories } from '@/services/dataService';
import { categoryImages } from '@/services/personLoader';
import { getScenario } from '@/services/scenarioLoader';
import { Category, Ending, Scenario, Stage } from '@/types/shahname';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import ScenarioScreen from './ScenarioScreen';

const ScenarioContainer = () => {
  const { cat_id } = useLocalSearchParams();
  const { increaseBalance, isLoading: isCurrencyLoading } = useCurrency();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [currentStage, setCurrentStage] = useState<Stage | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [ending, setEnding] = useState<Ending | null>(null);
  const [sessionEarnings, setSessionEarnings] = useState(0);
  const [scenarioSummary, setScenarioSummary] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const categories = getCategories();
    const currentCategory = categories.find((c) => c.id === Number(cat_id));
    if (currentCategory) {
      setCategory(currentCategory);
      const scenarioData = getScenario(currentCategory.image);
      if (scenarioData) {
        if (scenarioData.summary) {
          setScenarioSummary(scenarioData.summary);
        }

        const images = Object.values(categoryImages);
        const updatedStages = scenarioData.stages.map((stage) => {
          if (!stage.image) {
            const randomImage =
              images[Math.floor(Math.random() * images.length)];
            return { ...stage, image: randomImage };
          }
          return stage;
        });
        setScenario({ ...scenarioData, stages: updatedStages });
        setCurrentStage(updatedStages[0]);
      }
    }
  }, [cat_id]);

  const handleGameEnd = useCallback(
    async (gameEnding: Ending, endingEarnings: number) => {
      const totalEarnings = sessionEarnings + endingEarnings;
      if (totalEarnings > 0) {
        await increaseBalance(totalEarnings);
      }
      setEnding(gameEnding);
      setSessionEarnings(totalEarnings);
    },
    [increaseBalance, sessionEarnings]
  );

  const handleStageChange = useCallback(
    (stageId: number | string) => {
      const stage = scenario?.stages.find((s) => s.id === stageId);
      if (stage) {
        setCurrentStage(stage);
      } else if (
        scenario &&
        typeof stageId === 'string' &&
        scenario.endings[stageId]
      ) {
        setEnding(scenario.endings[stageId]);
      }
    },
    [scenario]
  );

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <ScenarioScreen
      isLoading={!scenario || !currentStage || isCurrencyLoading}
      category={category}
      scenario={scenario}
      currentStage={currentStage}
      ending={ending}
      scenarioSummary={scenarioSummary}
      sessionEarnings={sessionEarnings}
      isMuted={isMuted}
      onToggleMute={toggleMute}
      onStageChange={handleStageChange}
      onGameEnd={handleGameEnd}
    />
  );
};

export default ScenarioContainer;
