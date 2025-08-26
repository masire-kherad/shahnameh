import React, { useState } from 'react';
import { View, StyleSheet, ImageSourcePropType, LayoutChangeEvent } from 'react-native';
import Svg, { Path, Defs, ClipPath, Image } from 'react-native-svg';

interface BendedRoadProps {
  imageSource: ImageSourcePropType;
  children: React.ReactNode;
}

const BendedRoad: React.FC<BendedRoadProps> = ({ imageSource, children }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
        <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
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
          />
        </Svg>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BendedRoad;
