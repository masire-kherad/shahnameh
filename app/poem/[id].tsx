import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getVersesByPoemId, Verse } from '@/lib/db';
import { markPoemAsRead } from '@/lib/userDb';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';

export default function PoemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isRead, setIsRead] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getVersesByPoemId(parseInt(id, 10)).then(setVerses);
    }
  }, [id]);

  const handleMarkAsRead = async () => {
    if (id) {
      await markPoemAsRead(parseInt(id, 10), 10);
      setIsRead(true);
      router.back();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={verses}
        keyExtractor={item => item.vorder.toString()}
        renderItem={({ item }) => (
          <ThemedText style={styles.verseText}>{item.text}</ThemedText>
        )}
        ListFooterComponent={
          <Button
            title="Mark as Read"
            onPress={handleMarkAsRead}
            disabled={isRead}
          />
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  verseText: {
    fontSize: 18,
    fontFamily: 'Vazirmatn',
    textAlign: 'center',
    marginBottom: 12,
  },
});
