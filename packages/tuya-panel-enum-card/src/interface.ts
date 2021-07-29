import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;
export const defaultProps = {
  style: {}, // content容器 样式  优先级最高
  textStyle: {}, // 枚举项里面小蚊子样式 优先级最高
  titleStyle: {}, // 标题的样式 优先级最高
  padding: [16, 20, 16, 20],
  // icon属性
  iconColor: '#158CFB',
  activeIconColor: '#fff',
  iconSize: cx(18),
  // icon bg属性
  iconBgColor: 'rgba(21, 140, 251, 0.1)',
  activeIconBgColor: '#158CFB',
  iconBgSize: cx(48),
  iconBgRadius: cx(48),
  showIconBg: true,
  // 每项文字属性
  showText: true,
  textColor: 'rgba(61, 61, 61, 0.3)',
  activeTextColor: '#009FFF',
  textFontSize: cx(12),
  // title属性
  title: '',
  showTitle: true,
  titleFontSize: cx(16),
  titleColor: '#000',
  // 背景属性
  backgroundColor: '#fff',
  radius: cx(12),
  // 轮播图原点颜色
  dotSize: cx(6),
  dotColor: 'rgba(0, 0, 0, 0.05)',
  activeDotColor: '#158CFB',
  contentStyle: {},
};

type EnumItem = {
  label?: string;
  icon: string;
  isImage?: boolean;
  key?: string;
};

export type IEnumCardProps = {
  list: Array<EnumItem>;
  width?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  contentStyle: StyleProp<ViewStyle>;
  activeKey?: string;
  defaultActiveKey?: string;
} & Partial<typeof defaultProps>;
