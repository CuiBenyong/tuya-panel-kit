import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { TYText } from 'tuya-panel-kit';
import { IDisplayCardProps, IDefaultProps } from './interface';

const { parseToStyle } = Utils.ThemeUtils;
const { convertX: cx } = Utils.RatioUtils;

export const StyleDisplayCard: React.FC<IDisplayCardProps> = ({
  style,
  textStyle,
  backgroundColor,
  radius,
  width,
  padding,
  text,
  fontSize,
  fontColor,
  fontWeight,
  unit,
  unitSize,
  unitColor,
  unitWeight,
  unitStyle,
  value,
  valueSize,
  valueColor,
  valueWeight,
  valueStyle,
  isUnitInTop,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: radius,
          width,
          alignItems: 'flex-start',
          justifyContent: 'center',
          ...parseToStyle(padding, 'padding'),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: isUnitInTop ? 'flex-start' : 'flex-end' }}>
        <TYText
          text={value}
          size={valueSize}
          color={valueColor}
          weight={valueWeight}
          style={[{ lineHeight: cx(90) }, valueStyle]}
        />
        <TYText
          text={unit}
          size={unitSize}
          color={unitColor}
          weight={unitWeight}
          style={[{ lineHeight: cx(24), marginLeft: cx(5), marginTop: cx(10) }, unitStyle]}
        />
      </View>
      <TYText
        text={text}
        size={fontSize}
        color={fontColor}
        weight={fontWeight}
        style={[{ lineHeight: cx(20), marginTop: cx(4) }, textStyle]}
      />
    </View>
  );
};

StyleDisplayCard.defaultProps = IDefaultProps;

export const ClassicDisplayCard = props => <StyleDisplayCard {...props} />;
export const AcrylicDisplayCard = props => (
  <StyleDisplayCard
    valueSize={cx(64)}
    valueWeight={600}
    valueStyle={{ lineHeight: cx(87.5) }}
    unitStyle={{ lineHeight: cx(25), paddingBottom: cx(14) }}
    unitColor="rgba(0, 0, 0, 0.5)"
    unitSize={cx(18)}
    unitWeight="normal"
    fontWeight={500}
    isUnitInTop={false}
    {...props}
  />
);
