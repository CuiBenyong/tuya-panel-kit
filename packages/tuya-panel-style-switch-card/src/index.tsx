import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText, SwitchButton, LinearGradient } from 'tuya-panel-kit';
import IconBackground from 'tuya-panel-icon-background';
import { Rect } from 'react-native-svg';
import { ISwitchCardProps, IDefaultProps } from './interface';
import { NordicDefaultProps, AcrylicDefaultProps, PaintDefaultProps } from './theme';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

export const StyleSwitchCard: React.FC<ISwitchCardProps> = ({
  style,
  backgroundColor,
  radius,
  width,
  padding,
  text,
  fontColor,
  fontSize,
  textStyle,
  subText,
  subFontColor,
  subFontSize,
  subTextStyle,
  switchSize,
  ...rest
}) => {
  const [linearHeight, setLinearHeight] = React.useState(0);
  return (
    <View>
      <LinearGradient
        gradientId="Gradient2"
        style={{
          width: width + cx(2),
          height: linearHeight + cx(2),
          borderRadius: radius,
          overflow: 'hidden',
        }}
        x1="100%"
        y1="0%"
        x2="0%"
        y2="100%"
        stops={{
          '0%': 'red',
          '30%': 'blue',
          '100%': 'yellow',
        }}
      >
        <Rect width={width + cx(2)} height={linearHeight + cx(2)} />
        <View
          onLayout={e => {
            const { height } = e.nativeEvent.layout;
            setLinearHeight(height);
          }}
          style={[
            {
              backgroundColor,
              borderRadius: radius,
              width,
            },
            styles.center,
            style,
            {
              padding: cx(20),
            },
          ]}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'space-around',
              ...parseToStyle(padding, 'padding'),
              flexDirection: 'row',
            }}
          >
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <IconBackground iconSize={cx(22)} showIconBg={false} iconColor="#D3D3D3" {...rest} />
              <View style={{ marginLeft: cx(12) }}>
                <TYText
                  text={text}
                  color={fontColor}
                  size={fontSize}
                  style={[{ lineHeight: cx(24) }, textStyle]}
                />
                {!!subText && (
                  <TYText
                    text={subText}
                    color={subFontColor}
                    size={subFontSize}
                    style={[{ lineHeight: cx(24) }, subTextStyle]}
                  />
                )}
              </View>
            </View>
            <SwitchButton onTintColor="#1082FE" {...rest} size={switchSize} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

StyleSwitchCard.defaultProps = IDefaultProps;

export const ClassicSwitchCard = props => <StyleSwitchCard {...props} />;
export const NordicSwitchCard = props => <StyleSwitchCard {...NordicDefaultProps} {...props} />;
export const AcrylicSwitchCard = props => <StyleSwitchCard {...AcrylicDefaultProps} {...props} />;
export const PaintSwitchCard = props => <StyleSwitchCard {...PaintDefaultProps} {...props} />;
