import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useCallback, useMemo } from "react";
import { Linking, StyleSheet } from "react-native";

export interface Collaborator {
  id: number;
  name: string;
  role: string;
  url: string;
}

const createStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].background,
      writingDirection: "ltr",
    },
    contentContainer: {
      padding: 24,
    },
    title: {
      textAlign: "center",
      marginBottom: 24,
    },
    paragraph: {
      fontSize: 16,
      lineHeight: 28,
      textAlign: "right",
      marginBottom: 24,
    },
    collaboratorsList: {
      marginBottom: 24,
    },
    collaboratorItem: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: Colors[colorScheme].tint + "20",
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
    },
    collaboratorInfo: {
      flex: 1,
      marginRight: 12,
    },
    collaboratorName: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "right",
    },
    collaboratorRole: {
      fontSize: 14,
      color: Colors[colorScheme].text,
      textAlign: "right",
      marginTop: 4,
    },
    thanksText: {
      fontSize: 16,
      lineHeight: 28,
      textAlign: "center",
      marginTop: 24,
    },
  });

export function useCollaborations() {
  const colorScheme = useColorScheme()!; // guaranteed by the app’s providers

  const collaborators: Collaborator[] = useMemo(
    () => [
      {
        id: 0,
        name: "سایت گنجور",
        role: "تأمین‌کننده پایگاه داده اشعار فارسی و API",
        url: "https://ganjoor.net",
      },
      {
        id: 1,
        name: "علی اصلانی",
        role: "توسعه‌دهنده و ایده‌پرداز برنامه",
        url: "https://www.linkedin.com/in/ialiaslani/",
      },
      {
        id: 2,
        name: "کاوه کاظمی",
        role: "توسعه‌دهنده فنی و پیاده‌سازی برنامه",
        url: "https://www.linkedin.com/in/kaveh-kazemi-644902422/",
      },
      {
        id: 3,
        name: "مهدی احتشام",
        role: "حامی توسعه و سرمایه‌گذار پروژه",
        url: "https://www.linkedin.com/in/medy-ehtesham/",
      },
    ],
    [],
  );

  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  const tintColor = useMemo(() => Colors[colorScheme].tint, [colorScheme]);

  const handleLinkPress = useCallback((url: string) => {
    Linking.openURL(url);
  }, []);

  return { collaborators, handleLinkPress, styles, tintColor };
}
