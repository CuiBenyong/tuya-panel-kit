import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;

export const NordicDefaultProps = {
  showIcon: false,
  width: cx(278),
  radius: cx(16),
  fontColor: '#000',
  switchSize: {
    activeSize: cx(18),
    margin: cx(4),
    width: cx(46),
    height: cx(25),
  },
};

export const AcrylicDefaultProps = {
  iconSize: cx(40),
  onTintColor: '#FE7862',
  switchType: 'thumbMore',
  width: cx(278),
  radius: cx(16),
  thumbStyle: { width: cx(24), height: cx(24), borderRadius: cx(8.8) },
  smallThumbStyle: {
    width: cx(1),
    height: cx(6),
    borderRadius: cx(0.5),
  },
  switchSize: {
    activeSize: cx(24),
    margin: cx(1.5),
    width: cx(52),
    height: cx(27),
    borderRadius: cx(10),
  },
};

export const PaintDefaultProps = {
  iconSize: cx(22),
  width: cx(294),
  fontColor: '#000',
  onTintColor: '#76A6E4',
  thumbStyle: { width: cx(4), height: cx(12), borderRadius: cx(2) },
  switchSize: { activeSize: 4, margin: 6 },
};
