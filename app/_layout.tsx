import AudioPlayer from "@/components/AudioPlayer";
import RulesAgreement from "@/components/RulesAgreement";
import StyledHeader from "@/components/StyledHeader";
import StyledHeaderAndroid from "@/components/StyledHeader.android";
import StyledHeaderIos from "@/components/StyledHeader.ios";
import UserInfoModal from "@/components/UserInfoModal";
import {
  AudioTrackProvider,
  useAudioTrack,
} from "@/contexts/AudioTrackContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  getRulesAgreed,
  getUserInfo,
  setRulesAgreed,
  setUserInfo,
} from "@/services/dataService";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

Sentry.init({
  dsn: "https://91f11c7ba06300219ec978417905af45@o4511557557288960.ingest.de.sentry.io/4511731385827408",
  debug: true,
});
setTimeout(() => {
  Sentry.captureMessage("App startup reached _layout");
}, 1000);

try {
  // I18nManager.allowRTL(true);
  // I18nManager.forceRTL(true);
} catch (e) {
  // Error handling for RTL configuration
}
function AudioMiniButton() {
  const { currentTrack, isPlayerVisible, showPlayer } = useAudioTrack();

  if (!currentTrack || isPlayerVisible) return null;

  return (
    <Pressable
      onPress={showPlayer}
      style={{
        position: "absolute",
        bottom: 30,
        right: 20,
        backgroundColor: "#222",
        padding: 12,
        borderRadius: 50,
        zIndex: 999,
        elevation: 999,
      }}
    >
      <Text style={{ color: "white", fontSize: 18 }}>▶</Text>
    </Pressable>
  );
}

function GlobalAudioPlayer() {
  const { currentTrack, isPlayerVisible, hidePlayer } = useAudioTrack();

  if (!currentTrack || !isPlayerVisible) return null;

  return (
    <View style={styles.globalPlayerContainer}>
      <AudioPlayer
        key={currentTrack.uri}
        uri={currentTrack.uri}
        title={currentTrack.title}
        onDismiss={hidePlayer}
      />
    </View>
  );
}

function AppContent() {
  const colorScheme = useColorScheme();
  const [userInfo, setUserInfoState] = useState<{
    name: string;
    gender: "male" | "female";
  } | null>(null);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [userInfoModalVisible, setUserInfoModalVisible] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const rulesAgreed = await getRulesAgreed();
        const info = await getUserInfo();

        if (!rulesAgreed) {
          setRulesModalVisible(true);
        } else if (!info) {
          setUserInfoModalVisible(true);
        } else {
          setUserInfoState(info);
        }
      } catch (error) {
        console.error("Startup error:", error);
        Sentry.captureException(error);
      }
    };

    checkUserStatus().catch((error) => {
      console.error("Unhandled startup error:", error);
      Sentry.captureException(error);
    });
  }, []);

  const handleRulesAgreed = async () => {
    await setRulesAgreed();
    setRulesModalVisible(false);
    const info = await getUserInfo();
    if (!info) {
      setUserInfoModalVisible(true);
    }
  };

  const handleUserInfoClose = async (
    name: string,
    gender: "male" | "female",
  ) => {
    await setUserInfo(name, gender);
    setUserInfoState({ name, gender });
    setUserInfoModalVisible(false);
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Stack
            screenOptions={{
              header: ({ options }) => {
                if (Platform.OS === "web") {
                  return <StyledHeader title={options.title || ""} />;
                }
                if (Platform.OS === "ios") {
                  return <StyledHeaderIos title={options.title || ""} />;
                }
                return <StyledHeaderAndroid title={options.title || ""} />;
              },
            }}
          >
            <Stack.Screen name="index" options={{ title: "شاهنامه" }} />
            <Stack.Screen name="profile" options={{ title: "پروفایل" }} />
            <Stack.Screen
              name="category/[cat_id]"
              options={{ title: "فهرست اشعار" }}
            />
            <Stack.Screen name="reading/[poem_id]" options={{ title: "" }} />
            <Stack.Screen name="Info" options={{ title: "درباره‌ما" }} />
            <Stack.Screen
              name="Collaborations"
              options={{ title: "همکاران" }}
            />
            <Stack.Screen
              name="favorites"
              options={{ title: "علاقه‌مندی‌ها" }}
            />
            <Stack.Screen
              name="completed-poems"
              options={{ title: "اشعار تکمیل شده" }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>

          {/* Global persistent audio player */}
          <GlobalAudioPlayer />
          <AudioMiniButton />
          <RulesAgreement
            visible={rulesModalVisible}
            onAgree={handleRulesAgreed}
          />
          <UserInfoModal
            visible={userInfoModalVisible}
            onClose={handleUserInfoClose}
          />
          <StatusBar style="light" backgroundColor="#000000" />
        </View>
      </View>
    </ThemeProvider>
  );
}

function RootLayout() {
  const [loaded] = useFonts({
    Vazirmatn: require("../assets/fonts/Vazirmatn-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AudioTrackProvider>
      <AppContent />
    </AudioTrackProvider>
  );
}
export default Sentry.wrap(RootLayout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      web: {
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      },
    }),
  },
  content: {
    flex: 1,
    ...Platform.select({
      web: {
        maxWidth: 420,
        width: "100%",
        backgroundColor: "white",
      },
    }),
  },
  globalPlayerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 100,
  },
});
