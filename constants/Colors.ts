/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#efefef',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    persian: {
      node: '#303750',
      path: '#1adadf',
      completed: '#6EBF8B',
      highlight: '#eece91',
      background: '#b3c8d8',
      overlay: 'rgba(0, 0, 0, 0.5)',
    }
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    persian: {
      node: '#303750',
      path: '#1adadf',
      completed: '#6EBF8B',
      highlight: '#eece91',
      background: '#ae8865',
      overlay: 'rgba(0, 0, 0, 0.5)',
    }
  },
};
