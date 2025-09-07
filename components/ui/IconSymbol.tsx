// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = string; // Allow any string for more flexibility

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 * 
 * Common SF Symbols to Material Icons mappings:
 * - SF Symbols use a naming convention like "square.and.arrow.up"
 * - Material Icons use a naming convention like "square-and-arrow-up"
 */
const MAPPING: IconMapping = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'person.fill': 'person',
  'checkmark': 'check',
  'checkmark.circle.fill': 'check-circle',
  'heart.fill': 'favorite',
  'play.circle.fill': 'play-circle',
  'pause.circle.fill': 'pause-circle',
  'handshake': 'handshake',
  'handshake.circle': 'handshake',
  'camera': 'camera',
  'paperplane': 'send',
  'link': 'link',
  'pencil': 'edit',
  'pencil.circle.fill': 'edit',
  'info.circle.fill': 'info',
  'info': 'info',
  'info.circle': 'info',
  'edit': 'edit',
  'speaker.wave.2.fill': 'volume-up',
  'speaker.slash.fill': 'volume-off',
} as const;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  // Fallback to a default icon if the mapping doesn't exist
  const iconName = MAPPING[name] || 'help'; // 'help' as fallback icon
  
  // Add some debugging to help identify issues
  if (!MAPPING[name]) {
    // No mapping found for SF Symbol, using fallback icon "help"
  }
  
  // Debug log for rendering Material Icon
  
  // Check if the icon exists by trying to render it
  try {
    return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
  } catch (error) {
    // Failed to render Material Icon, trying fallback icon
    // Try fallback icons
    try {
      return <MaterialIcons color={color} size={size} name="help" style={style} />;
    } catch (fallbackError) {
      // Even fallback icon failed
      // If all else fails, render nothing
      return null;
    }
  }
}
