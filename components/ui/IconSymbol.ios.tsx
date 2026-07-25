import { SymbolView, SymbolViewProps, SymbolWeight } from "expo-symbols";
import { StyleProp, ViewStyle } from "react-native";

// Comprehensive mapping for SF Symbols with fallbacks
const SF_SYMBOL_MAPPING: Record<string, string[]> = {
  handshake: [
    "person.2",
    "person.2.fill",
    "group",
    "group.fill",
    "hand.raised",
    "hand.raised.fill",
  ],
  pencil: ["pencil", "pencil.circle", "pencil.circle.fill"],
  "info.circle.fill": ["info.circle.fill", "info.circle", "info"],
  "checkmark.circle.fill": ["checkmark.circle.fill", "checkmark.circle"],
  "heart.fill": ["heart.fill", "heart"],
  "person.fill": ["person.fill", "person"],
  "chevron.left": ["chevron.left"],
  "chevron.right": ["chevron.right"],
  "paperplane.fill": ["paperplane.fill"],
  "play.circle.fill": ["play.circle.fill", "play.circle"],
  "pause.circle.fill": ["pause.circle.fill", "pause.circle"],
  camera: ["camera", "camera.fill"],
  paperplane: ["paperplane"],
  link: ["link"],
  "house.fill": ["house.fill"],
  "speaker.wave.2.fill": [
    "speaker.wave.2.fill",
    "speaker.3.fill",
    "speaker.fill",
  ],
  "speaker.slash.fill": ["speaker.slash.fill", "speaker.slash"],
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
}: {
  name: SymbolViewProps["name"];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  // Add some debugging to help identify issues
  if (!name) {
    // No name provided for icon
    return null;
  }

  // Get the list of possible symbol names, with the original as fallback
  const symbolNames = (SF_SYMBOL_MAPPING[name] || [
    name,
  ]) as SymbolViewProps["name"][];
  // Add debugging for symbol names
  // Debug log for SF Symbol options

  // Try each symbol name until one works
  for (const symbolName of symbolNames) {
    try {
      // Trying SF Symbol
      return (
        <SymbolView
          weight={weight}
          tintColor={color}
          resizeMode="scaleAspectFit"
          name={symbolName}
          style={[
            {
              width: size,
              height: size,
            },
            style,
          ]}
        />
      );
    } catch (error) {
      // SF Symbol failed, trying next...
      continue; // Try the next symbol name
    }
  }

  // If all symbols fail, try a fallback icon
  try {
    // All symbol options failed, trying fallback icon
    return (
      <SymbolView
        weight={weight}
        tintColor={color}
        resizeMode="scaleAspectFit"
        name="questionmark"
        style={[
          {
            width: size,
            height: size,
          },
          style,
        ]}
      />
    );
  } catch (fallbackError) {
    // Even fallback icon failed
    return null;
  }
}
