import CompletedPoemsScreen, { useCompletedPoems } from '@/features/completed-poems';

export default function CompletedPoemsBridge() {
  const props = useCompletedPoems();
  return <CompletedPoemsScreen {...props} />;
}
