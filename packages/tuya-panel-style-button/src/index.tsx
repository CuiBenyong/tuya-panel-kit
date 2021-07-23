import React from 'react';
import { Utils } from 'tuya-panel-utils';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { IconFont, TYText } from 'tuya-panel-kit';
import { BlurView } from '@react-native-community/blur';
import { IButtonProps, IDefaultProps } from './interface';
import { NordicDefaultProps, AcrylicDefaultProps, PaintDefaultProps } from './theme';

const { convertX: cx } = Utils.RatioUtils;

const { isIos } = Utils.RatioUtils;

const StyleButton: React.FC<IButtonProps> = ({
  disabled,
  icon,
  iconColor,
  iconSize,
  text,
  onPress,
  onLongPress,
  children,
  isSupportAcrylic,
  blurAmount,
  blurType,
  milliseconds,
  style,
  width,
  height,
  radius,
  backgroundColor,
  iconBgColor,
  iconBgSize,
  iconBgRadius,
  fontColor,
  fontWeight,
  fontSize,
  iconBgStyle,
  textStyle,
}) => {
  let timer;

  const _handlePressIn = () => {
    if (typeof onLongPress === 'function') {
      onLongPress && onLongPress();
      timer && clearInterval(timer);
      timer = setInterval(() => {
        onLongPress && onLongPress();
      }, milliseconds);
    }
  };

  const _handlePressOut = () => {
    timer && clearInterval(timer);
  };

  const iconBgDefault = {
    width: iconBgSize,
    height: iconBgSize,
    borderRadius: iconBgRadius,
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.center, { width, height, borderRadius: radius, backgroundColor }, style]}
      onPress={onPress}
      onPressIn={_handlePressIn}
      onPressOut={_handlePressOut}
      activeOpacity={isSupportAcrylic && !isIos ? 1 : 0.8}
    >
      {React.isValidElement(children) && children}
      {!React.isValidElement(children) && icon && (
        <View
          style={[
            styles.center,
            iconBgDefault,
            {
              overflow: 'hidden',
              backgroundColor: iconBgColor,
            },
            iconBgStyle,
          ]}
        >
          <View
            style={[
              styles.center,
              iconBgDefault,
              {
                backgroundColor: iconBgColor,
              },
              iconBgStyle,
            ]}
          >
            <IconFont d={icon} color={iconColor} size={iconSize} />
          </View>
          {isSupportAcrylic && (
            <BlurView
              style={[
                iconBgDefault,
                {
                  position: 'absolute',
                },
                iconBgStyle,
              ]}
              blurType={blurType}
              blurAmount={blurAmount}
              overlayColor="transparent"
            />
          )}
        </View>
      )}
      {!React.isValidElement(children) && text && (
        <TYText
          style={[{ marginTop: cx(8) }, textStyle]}
          weight={fontWeight}
          color={fontColor}
          size={fontSize}
        >
          {text}
        </TYText>
      )}
    </TouchableOpacity>
  );
};

StyleButton.defaultProps = IDefaultProps;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ClassicButton = props => <StyleButton {...props} />;
export const NordicButton = props => <StyleButton {...NordicDefaultProps} {...props} />;
export const AcrylicButton = props => <StyleButton {...AcrylicDefaultProps} {...props} />;
export const PaintButton = props => <StyleButton {...PaintDefaultProps} {...props} />;
