import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';
import { Linking } from 'react-native';

export function useInfo() {
  const colorScheme = useColorScheme();
  const [showRules, setShowRules] = useState(false);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const styles = {
    pageContainer: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'dark'].background,
      writingDirection: 'ltr' as const,
    },
    container: {
      padding: 24,
    },
    title: {
      textAlign: 'center' as const,
      marginBottom: 24,
    },
    paragraph: {
      fontSize: 16,
      lineHeight: 28,
      textAlign: 'right' as const,
      marginBottom: 16,
    },
    section: {
      marginTop: 32,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: Colors[colorScheme ?? 'dark'].tabIconDefault,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold' as const,
      textAlign: 'right' as const,
      paddingTop: 16,
      marginBottom: 16,
    },
    collaborationButton: {
      flexDirection: 'row-reverse' as const,
      alignItems: 'center' as const,
      backgroundColor: Colors[colorScheme ?? 'dark'].persian.node,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignSelf: 'flex-start' as const,
      gap: 8,
    },
    collaborationButtonText: {
      color: Colors[colorScheme ?? 'dark'].tint,
      fontSize: 16,
      fontWeight: 'bold' as const,
    },
    linksContainer: {
      marginTop: 32,
      flexDirection: 'row-reverse' as const,
      justifyContent: 'center' as const,
      gap: 16,
    },
    linkButton: {
      flexDirection: 'row-reverse' as const,
      alignItems: 'center' as const,
      backgroundColor: '#3498db',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      gap: 8,
    },
    linkText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold' as const,
    },
  };

  return {
    showRules,
    setShowRules,
    handleLinkPress,
    styles,
  };
}
