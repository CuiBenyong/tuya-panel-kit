import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText } from 'tuya-panel-kit';
import IconBackground from 'tuya-panel-icon-background';
import { IStudioIconCardProps, INordicDefaultProps } from './interface';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

const NordicIconBlock: React.FC<IStudioIconCardProps> = ({
  style,
  backgroundColor,
  radius,
  width,
  padding,
  text,
  fontColor,
  fontSize,
  textStyle,
  fontWeight,
  iconStyle,
  value,
  unit,
  valueWeight,
  valueColor,
  valueSize,
  valueStyle,
  unitWeight,
  unitColor,
  unitSize,
  unitStyle,
  ...rest
}) => {
  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: radius,
          width,
          ...parseToStyle(padding, 'padding'),
        },
        style,
      ]}
    >
      <IconBackground
        iconSize={cx(21)}
        iconBgSize={cx(48)}
        iconBgRadius={cx(12)}
        iconBgColor="#1082FE"
        {...rest}
        style={iconStyle}
      />
      <TYText
        text={text}
        weight={fontWeight}
        color={fontColor}
        size={fontSize}
        style={[{ lineHeight: cx(22), marginBottom: cx(4), marginTop: cx(29) }, textStyle]}
      />
      <View style={{ flexDirection: 'row' }}>
        <TYText
          text={value}
          weight={valueWeight}
          color={valueColor}
          size={valueSize}
          style={[{ lineHeight: cx(39) }, valueStyle]}
        />
        <TYText
          text={unit}
          weight={unitWeight}
          color={unitColor}
          size={unitSize}
          style={[{ lineHeight: cx(39) }, unitStyle]}
        />
      </View>
    </View>
  );
};

NordicIconBlock.defaultProps = INordicDefaultProps;

export default NordicIconBlock;
