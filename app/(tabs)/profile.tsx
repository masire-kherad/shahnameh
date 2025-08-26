import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getTotalPoints } from '@/lib/userDb';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useCallback, useState } from 'react';
import { Button, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const [points, setPoints] = useState(0);

  const fetchPoints = useCallback(() => {
    getTotalPoints().then(setPoints);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPoints();
    }, [fetchPoints])
  );

  return (
    <ThemedView style={styles.container}>
      <LottieView
        source={require('@/assets/animations/studying.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <ThemedText type="title">Profile</ThemedText>
      <ThemedView style={styles.pointsContainer}>
        <ThemedText style={styles.pointsText}>Total Points: {points}</ThemedText>
      </ThemedView>
      <Button title="Refresh Points" onPress={fetchPoints} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  pointsContainer: {
    marginVertical: 20,
  },
  pointsText: {
    fontSize: 24,
    fontFamily: 'Vazirmatn',
  },
});
