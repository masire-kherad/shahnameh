import { ReadingScreen } from '@/features/reading/components/ReadingScreen';
import { useReading } from '@/features/reading/hooks/useReading';
import React from 'react';

export default function PoemPage() {
  const screenData = useReading();
  return <ReadingScreen {...screenData} />;
}
