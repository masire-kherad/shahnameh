import { useColorScheme } from '@/hooks/useColorScheme';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { ImageSourcePropType, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Svg, { ClipPath, Defs, Image, Path } from 'react-native-svg';

interface BendedRoadProps {
  imageSource: ImageSourcePropType;
  children: React.ReactNode;
}

const BendedRoad: React.FC<BendedRoadProps> = ({ imageSource, children }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const colorScheme = useColorScheme();

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };

  const getPath = () => {
    if (width === 0 || height === 0) {
      return '';
    }
    const topCurveStart = height * 0.2;
    const topCurveControl = height * 0.4;
    const bottomCurveStart = height * 0.8;
    const bottomCurveControl = height * 0.6;
    return `M 0 ${topCurveStart} Q ${width / 2} ${topCurveControl} ${width} ${topCurveStart} L ${width} ${bottomCurveStart} Q ${width / 2} ${bottomCurveControl} 0 ${bottomCurveStart} Z`;
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {width > 0 && height > 0 && (
        <>
          <Svg height={height} width={width} style={styles.backgroundSvg}>
            <Defs>
              <ClipPath id="clip">
                <Path d={getPath()} />
              </ClipPath>
            </Defs>
            <Image
              href={imageSource}
              width={width}
              height={height}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clip)"
              opacity="0.7" // Add opacity to the background image
            />
          </Svg>
          <BlurView 
            intensity={5} 
            style={styles.blurOverlay} 
            tint={colorScheme === 'dark' ? 'dark' : 'light'}
          />
        </>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundSvg: {
    ...StyleSheet.absoluteFillObject,
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
  },
});

export default BendedRoad;
