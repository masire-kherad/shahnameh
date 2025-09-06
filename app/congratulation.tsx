import BendedRoad from '@/components/BendedRoad';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';

export default function CongratulationScreen() {
  const router = useRouter();
  const { poemTitle, categoryImage } = useLocalSearchParams();
  const [backgroundImage, setBackgroundImage] = useState<ImageSourcePropType>({ uri: '' });

  useEffect(() => {
    // Parse the category image if it was passed
    if (typeof categoryImage === 'string') {
      try {
        const parsedImage = JSON.parse(categoryImage);
        setBackgroundImage(parsedImage);
      } catch (e) {
        // If parsing fails, use a default
        setBackgroundImage({ uri: '' });
      }
    }
  }, [categoryImage]);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <BendedRoad imageSource={backgroundImage}>
      <View style={styles.container}>
        <View style={styles.overlay} />
        <Stack.Screen options={{ title: 'تبریک!' }} />
        <View style={styles.centeredView}>
          <ThemedView style={styles.modalView}>
            <ThemedText style={styles.title}>تبریک!</ThemedText>
            <ThemedText style={styles.message}>
              شعر "{typeof poemTitle === 'string' ? poemTitle : ''}" رو به پایان رسوندی.
            </ThemedText>
            <ThemedText style={styles.subMessage}>
               ادامه بده =)
            </ThemedText>
            
            <View style={styles.buttonContainer}>
              <Pressable 
                style={[styles.button, styles.buttonSecondary]}
                onPress={handleGoBack}
              >
                <ThemedText style={styles.textStyle}>بازگشت به شعر</ThemedText>
              </Pressable>
              <Pressable 
                style={[styles.button, styles.buttonPrimary]}
                onPress={handleGoHome}
              >
                <ThemedText style={styles.textStyle}>برو به خانه</ThemedText>
              </Pressable>
            </View>
          </ThemedView>
        </View>
      </View>
    </BendedRoad>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2c3e50',
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#34495e',
  },
  subMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#7f8c8d',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    flex: 1,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#6EBF8B',
  },
  buttonSecondary: {
    backgroundColor: '#A1CEDC',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});