import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import type { Collaborator } from '../hooks/useCollaborations';

interface CollaborationsScreenProps {
  collaborators: Collaborator[];
  handleLinkPress: (url: string) => void;
  styles: Record<string, any>;     // you can type it more strictly if desired
  tintColor: string;
}

export default function CollaborationsScreen({
  collaborators,
  handleLinkPress,
  styles,
  tintColor,
}: CollaborationsScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>
          همکاران
        </ThemedText>

        <ThemedText style={styles.paragraph}>
          این پروژه با کمک و حمایت بسیاری از افراد و نهادها ممکن شده است:
        </ThemedText>

        <View style={styles.collaboratorsList}>
          {collaborators.map(collaborator => (
            <Pressable
              key={collaborator.id}
              style={styles.collaboratorItem}
              onPress={() => handleLinkPress(collaborator.url)}
            >
              <View style={styles.collaboratorInfo}>
                <ThemedText style={styles.collaboratorName}>
                  {collaborator.name}
                </ThemedText>
                <ThemedText style={styles.collaboratorRole}>
                  {collaborator.role}
                </ThemedText>
              </View>
              <IconSymbol name="link" size={16} color={tintColor} />
            </Pressable>
          ))}
        </View>

        <ThemedText style={styles.thanksText}>
          برای همکاری از طریق اینستاگرام aslani.ts با ما در ارتباط باشید.
        </ThemedText>
      </ScrollView>
    </View>
  );
}
