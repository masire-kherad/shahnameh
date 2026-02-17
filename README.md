# MasireKherad (مسیر خرد) - Shahnameh Reading App

A gamified mobile and web application for reading and learning the epic Persian poem **Shahnameh** (شاهنامه) by Ferdowsi. This app makes reading Shahnameh an engaging and enjoyable experience through gamification, similar to language learning apps like Duolingo.

## About

This app is built with love for Shahnameh and Persian culture. Our goal is to transform reading Shahnameh from a heavy and difficult task into a delightful and entertaining experience. We've been inspired by language learning apps and have tried to make reading and learning Shahnameh stories engaging through gamification—where you progress through stories, earn points, unlock stages, and continue your journey.

## Features

- 📖 Read Shahnameh poems with an intuitive interface
- 🎮 Gamified reading experience with points and achievements
- 📱 Cross-platform: iOS, Android, and Web
- 🌙 Dark mode support
- ⭐ Favorites and completed poems tracking
- 🎯 Challenge mode (experimental, currently for Keyumars, Hooshang, and Tahmores sections)
- 🔊 Audio support for poems

## Tech Stack

- [Expo](https://expo.dev) - React Native framework
- [React Native](https://reactnative.dev) - Mobile app framework
- [Expo Router](https://docs.expo.dev/router/introduction) - File-based routing
- TypeScript - Type safety
- [EAS Build](https://docs.expo.dev/build/introduction/) - Build and deployment

## Getting Started

### Prerequisites

- Node.js (>= 16.17.4)
- npm or yarn
- Expo CLI (optional, can use npx)

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd shahname
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server

   ```bash
   npx expo start
   ```

4. Run on your preferred platform

   - **iOS**: Press `i` or scan QR code with Expo Go app
   - **Android**: Press `a` or scan QR code with Expo Go app
   - **Web**: Press `w` to open in browser

## Building for Production

### Android APK

Build a signed APK with EAS Build:

```bash
eas build --platform android --profile production
```

After the build finishes, download the APK from the [Expo dashboard](https://expo.dev/accounts/[your-account]/projects/shahname/builds) and install it.

### Common Installation Errors

| Error | Cause | Fix |
|-------|--------|-----|
| **INSTALL_PARSE_FAILED_NO_CERTIFICATES** | APK is not signed | Always use **EAS Build** to produce the APK. Run `eas credentials` and ensure Android keystore is set. |
| **INSTALL_FAILED_INVALID_APK** | Corrupt or wrong file | Re-download the APK from Expo. Rebuild with `eas build --platform android --profile production --clear-cache`. |
| **INSTALL_FAILED_INSUFFICIENT_STORAGE** | Not enough space | Free storage on the device. |
| **INSTALL_FAILED_INTERNAL_ERROR** | System/package manager issue | Restart the device, clear "Package installer" app data, or try another device. |

## Project Structure

```
shahname/
├── app/              # App screens (file-based routing)
├── components/       # Reusable React components
├── assets/          # Images, fonts, and data files
├── constants/       # App constants and themes
├── hooks/           # Custom React hooks
├── services/        # Business logic and data services
├── types/           # TypeScript type definitions
└── public/          # Web-specific assets
```

## Screenshots

<!-- Add screenshots of your app here -->
<!-- Example:
![Home Screen](screenshots/home.png)
![Reading Screen](screenshots/reading.png)
![Challenge Mode](screenshots/challenge.png)
-->

_Screenshots coming soon!_

## Contributing

We welcome contributions! Please read our [Contributing Guide](.github/CONTRIBUTING.md) to get started.

- 🐛 Found a bug? [Report it](https://github.com/YOUR_USERNAME/shahname/issues/new?template=bug_report.md)
- 💡 Have an idea? [Suggest a feature](https://github.com/YOUR_USERNAME/shahname/issues/new?template=feature_request.md)
- 📝 Want to contribute code? Check out our [Contributing Guide](.github/CONTRIBUTING.md)

You can also reach us via Instagram (mentioned in the app).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## License

See [LICENSE](LICENSE) file for details.
