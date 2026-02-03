# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Android APK build & install

Build a signed APK with EAS (required for install; unsigned APKs cause `INSTALL_PARSE_FAILED_NO_CERTIFICATES`):

```bash
eas build --platform android --profile production
```

After the build finishes, download the APK from the Expo dashboard and install it. If you see install errors:

| Error | Cause | Fix |
|-------|--------|-----|
| **INSTALL_PARSE_FAILED_NO_CERTIFICATES** | APK is not signed | Always use **EAS Build** to produce the APK. Run `eas credentials` and ensure Android keystore is set. Do not install debug/unsigned builds from `expo run:android` as a release APK. |
| **INSTALL_FAILED_INVALID_APK** | Corrupt or wrong file | Re-download the APK from Expo. Rebuild with `eas build --platform android --profile production --clear-cache`. |
| **INSTALL_FAILED_INSUFFICIENT_STORAGE** | Not enough space on device | Free storage on the device. The app uses `abiFilters` for a smaller APK; if needed, uninstall other apps or clear cache. |
| **INSTALL_FAILED_INTERNAL_ERROR** | System/package manager issue | Restart the device, clear "Package installer" app data (Settings → Apps), or try another device. |

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
