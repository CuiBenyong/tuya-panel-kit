import React from 'react';
import styled from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';
import { TouchableOpacity, View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { IconFont, TYText } from 'tuya-panel-kit';
// import IconFont from 'tuya-panel-kit/lib/components/iconfont/svg';
// import TYText from 'tuya-panel-kit/lib/components/TYText';
import { getDefaultTheme } from 'tuya-panel-theme';

const { convertX: cx } = Utils.RatioUtils;
const {
  width,
  height,
  borderRadius,
  backgroundColor,
  textColor,
  iconSize,
  textSize,
  iconBackgroundWidth,
  iconBackgroundHeight,
  iconBackgroundRadius,
  iconBackgroundColor,
} = getDefaultTheme.styleButton;

export const StyledTouchableOpacity = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: ${width};
  height: ${height};
  border-radius: ${borderRadius};
  background-color: ${backgroundColor};
`;

export const StyleBlurView = styled(BlurView)`
  width: ${iconBackgroundWidth};
  height: ${iconBackgroundHeight};
  border-radius: ${iconBackgroundRadius};
  position: absolute;
`;

export const StyledContentView = styled(View)`
  align-items: center;
  justify-content: center;
  width: ${iconBackgroundWidth};
  height: ${iconBackgroundHeight};
  border-radius: ${iconBackgroundRadius};
  background-color: ${iconBackgroundColor};
  overflow: hidden;
`;

export const StyledView = styled(View)`
  align-items: center;
  justify-content: center;
  width: ${iconBackgroundWidth};
  height: ${iconBackgroundHeight};
  border-radius: ${iconBackgroundRadius};
  background-color: ${iconBackgroundColor};
`;

export const StyledText = styled(TYText).attrs({
  color: textColor,
  size: textSize,
})`
  margin-top: ${cx(8)};
`;

export const StyledIconFont = styled(IconFont).attrs({
  size: iconSize,
})``;
