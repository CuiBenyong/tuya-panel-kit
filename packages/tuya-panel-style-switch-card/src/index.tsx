import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText, SwitchButton } from 'tuya-panel-kit';
import IconBackground from 'tuya-panel-icon-background';
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
  switchIconSize,
  switchIconColor,
  switchStyle,
  showIcon,
  iconStyle,
  ...rest
}) => {
  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: radius,
          width,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
          ...parseToStyle(padding, 'padding'),
        },
        styles.center,
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <IconBackground
          iconSize={cx(22)}
          showIcon={showIcon}
          showIconBg={false}
          iconColor="#D3D3D3"
          {...rest}
          style={iconStyle}
        />
        <View style={{ marginLeft: showIcon ? cx(12) : 0, flex: 1, marginRight: cx(12) }}>
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
      <SwitchButton
        onTintColor="#1082FE"
        {...rest}
        style={switchStyle}
        size={switchSize}
        // @ts-ignore
        iconSize={switchIconSize}
        iconColor={switchIconColor}
      />
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
