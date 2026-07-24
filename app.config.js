// app.config.js
import "dotenv/config"; // Optional: if you plan to use environment variables

export default ({ config }) => ({
  ...config,
  name: "MasireKherad",
  slug: "shahname",
  version: "1.1.0",
  orientation: "portrait",
  icon: "./assets/images/Logo.webp",
  scheme: "shahnameh",
  userInterfaceStyle: "automatic",
  // Required by react-native-reanimated 4.x (build fails otherwise).
  // Old devices still supported via minSdkVersion 21 and edgeToEdgeEnabled: false.
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.webp",
      backgroundColor: "#f0bf7d",
    },
    // Disable edge-to-edge for old Android versions (requires newer APIs)
    edgeToEdgeEnabled: false,
    package: "com.aliaslani.mm.shahnameh",
    // Support very old devices (Android 5.0 Lollipop, API 21)
    minSdkVersion: 21,
    // 32-bit (armeabi-v7a) + 64-bit (arm64-v8a) for old and new phones
    abiFilters: ["armeabi-v7a", "arm64-v8a"],
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.webp",
    splash: {
      image: "./assets/images/splash-icon.webp",
      resizeMode: "contain",
      backgroundColor: "#f0bf7d",
    },
    pwa: {
      name: "MasireKherad",
      shortName: "MasireKherad",
      themeColor: "#f0bf7d",
      backgroundColor: "#f0bf7d",
      display: "standalone",
      scope: "/",
      startUrl: "/",
    },
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/Logo.webp",
        resizeMode: "contain",
        backgroundColor: "#f0bf7d",
      },
    ],
    "expo-audio",
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "ba4ef0ae-5469-4f9d-8cef-05dc943c9c56",
    },
  },
});
