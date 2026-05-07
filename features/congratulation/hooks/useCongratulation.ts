import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';

export function useCongratulation() {
  const router = useRouter();
  const { poemTitle, categoryImage } = useLocalSearchParams();
  const [backgroundImage, setBackgroundImage] = useState<ImageSourcePropType>({ uri: '' });

  useEffect(() => {
    if (typeof categoryImage === 'string') {
      try {
        setBackgroundImage(JSON.parse(categoryImage));
      } catch {
        setBackgroundImage({ uri: '' });
      }
    }
  }, [categoryImage]);

  return {
    backgroundImage,
    poemTitle: typeof poemTitle === 'string' ? poemTitle : '',
    onGoBack: () => router.back(),
    onGoHome: () => router.push('/'),
  };
}
