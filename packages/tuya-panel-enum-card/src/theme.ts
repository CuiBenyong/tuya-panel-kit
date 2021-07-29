import { Utils } from 'tuya-panel-utils';
import { IEnumCardProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;

export const NordicDefaultProps: Partial<IEnumCardProps> = {
  padding: [24, 20, 24, 20],
  iconBgSize: cx(52),
  iconBgRadius: cx(12),
  iconBgColor: 'rgba(16, 130, 254, 0.1)',
  activeIconBgColor: '#1082FE',
  iconSize: cx(24),
  iconColor: '#fff',
  activeIconColor: '#fff',
  textColor: 'rgba(0, 0, 0, 0.3)',
  activeTextColor: '#1082FE',
  textFontSize: cx(14),
  textStyle: {
    marginTop: 11,
  },
};

export const AcrylicDefaultProps: Partial<IEnumCardProps> = {
  padding: [20, 20, 20, 20],
  iconBgSize: cx(60),
  iconBgRadius: cx(60),
  iconBgColor: '#FF8976',
};
