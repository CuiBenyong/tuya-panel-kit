import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { SwitchButtonProps } from 'tuya-panel-kit';
import { IconBackgroundProps } from 'tuya-panel-icon-background';

const { convertX: cx } = Utils.RatioUtils;

export const IDefaultProps = {
  backgroundColor: '#FFF',
  padding: [0, 0, 0, 0],
  width: cx(320),
  radius: cx(14),
  text: 'Switch Card',
  fontColor: '#3D3D3D',
  fontSize: cx(15),
  subFontColor: 'rgba(61, 61, 61, 0.5)',
  subFontSize: cx(14),
  switchSize: { width: cx(40), height: cx(24), activeSize: cx(20), margin: cx(2) },
};

export interface ISwitchCardProps
  extends Omit<IconBackgroundProps, 'style'>,
    Omit<SwitchButtonProps, 'style' | 'iconSize' | 'iconColor' | 'size'> {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  padding?: number[];
  width?: number;
  radius?: number;
  text: string;
  fontColor?: string;
  fontSize?: number;
  textStyle?: StyleProp<ViewStyle>;
  subText?: string;
  subFontColor?: string;
  subFontSize?: number;
  subTextStyle?: StyleProp<ViewStyle>;
  switchSize?: { width?: number; height?: number; activeSize?: number; margin?: number };
}
