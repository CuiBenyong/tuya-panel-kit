import React from 'react';
import { StyleProp, ViewStyle, ImageBackground, View } from 'react-native';
import { LinearGradient, RadialGradient } from 'tuya-panel-kit';
import { Rect } from 'react-native-svg';
import { getCoords, checkIsColor } from './utils';

type PureColor = string;
type LinearGradientBg = {
  deg: number;
  stops: Record<string, PureColor>;
};
type RadiaGradientBg = {
  cx: string;
  cy: string;
  fx: string;
  fy: string;
  rx: string;
  ry: string;
  stops: Array<{
    offset: string;
    stopColor: PureColor;
    stopOpacity: string;
  }>;
};
export type BackgroundType = PureColor | LinearGradientBg | RadiaGradientBg;
export interface IBackgroundProps {
  background: BackgroundType;
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>; // 当使用线性或者径向渐变时，里面的内容盒子
}

const Background: React.FC<IBackgroundProps> = ({
  background,
  width,
  height,
  style,
  children,
  contentStyle,
}) => {
  if (typeof background === 'string') {
    if (checkIsColor(background)) {
      return (
        <View style={[{ width, height, backgroundColor: background }, style]}>{children}</View>
      );
    }
    return (
      <ImageBackground style={[{ width, height }, style]} source={{ uri: background as string }}>
        {children}
      </ImageBackground>
    );
  }
  if ((background as LinearGradientBg).deg) {
    return (
      <View style={[{ width, height }, style]}>
        <LinearGradient
          style={{ width, height }}
          gradientId="base-background"
          {...getCoords((background as LinearGradientBg).deg)}
          stops={background.stops}
        >
          <Rect width={width} height={height} />
        </LinearGradient>
        <View style={[{ flex: 1, zIndex: 2 }, contentStyle]}>{children}</View>
      </View>
    );
  }
  if ((background as RadiaGradientBg).cx) {
    return (
      <View style={[{ width, height }, style]}>
        <RadialGradient
          style={{ width, height }}
          gradientId="base-background"
          {...getCoords((background as LinearGradientBg).deg)}
        />
        <View style={[{ flex: 1, zIndex: 2 }, contentStyle]}>{children}</View>
      </View>
    );
  }
  return null;
};

export default Background;
