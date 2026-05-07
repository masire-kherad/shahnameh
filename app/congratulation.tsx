import CongratulationScreen, { useCongratulation } from '@/features/congratulation';

export default function CongratulationBridge() {
  const props = useCongratulation();
  return <CongratulationScreen {...props} />;
}
