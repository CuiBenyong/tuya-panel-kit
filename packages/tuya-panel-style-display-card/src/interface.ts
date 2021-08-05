import { StyleProp, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;

export const IDefaultProps = {
  backgroundColor: 'transparent',
  radius: 0,
  padding: [cx(26), cx(19), cx(26), cx(31)],
  width: cx(198),
  text: 'Current Temp',
  fontSize: cx(14),
  fontColor: 'rgba(0, 0, 0, 0.5)',
  fontWeight: 400,
  unit: '°C',
  unitSize: cx(20),
  unitColor: '#000',
  unitWeight: 500,
  value: '32',
  valueSize: cx(74),
  valueColor: '#000',
  valueWeight: 700,
  isUnitInTop: true,
  isAlignCenter: false,
};

export interface IDisplayCardProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  unitStyle?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  radius?: number;
  width?: number;
  padding?: number[];
  text?: string;
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  unit?: string;
  unitSize?: number;
  unitColor?: string;
  unitWeight?: number;
  value?: string;
  valueSize?: number;
  valueColor?: string;
  valueWeight?: number;
  isUnitInTop?: boolean;
  isAlignCenter?: boolean;
}
