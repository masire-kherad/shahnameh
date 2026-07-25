import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'اشعار تکمیل شده', icon: 'checkmark.circle.fill', route: '/completed-poems' },
  { label: 'علاقه‌مندی‌ها', icon: 'heart.fill', route: '/favorites' },
  { label: 'درباره‌ما', icon: 'info.circle.fill', route: '/Info' },
  { label: 'همکاران', icon: 'handshake', route: '/Collaborations' },
];

export function QuickNavigation() {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>دسترسی سریع</ThemedText>
      {chunkArray(NAV_ITEMS, 2).map((row, i) => (
        <View style={styles.row} key={i}>
          {row.map((item) => (
            <Pressable
              key={item.route}
              style={styles.button}
              onPress={() => router.push(item.route as any)}
            >
              <IconSymbol name={item.icon} size={24} color="#fff" style={styles.icon} />
              <ThemedText style={styles.label}>{item.label}</ThemedText>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

/** Split array into chunks of `size` */
function chunkArray<T>(arr: T[], size: number): T[][] {
  return arr.reduce<T[][]>((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    backdropFilter: 'blur(10px)',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
  },
  button: {
    backgroundColor: 'rgba(52, 152, 219, 0.8)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: { marginBottom: 8 },
  label: {
    color: '#f0f0f0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
