import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;
type BlurViewProps =
  | 'xlight'
  | 'light'
  | 'dark'
  // iOS 13+ only
  | 'chromeMaterial'
  | 'material'
  | 'thickMaterial'
  | 'thinMaterial'
  | 'ultraThinMaterial'
  | 'chromeMaterialDark'
  | 'materialDark'
  | 'thickMaterialDark'
  | 'thinMaterialDark'
  | 'ultraThinMaterialDark'
  | 'chromeMaterialLight'
  | 'materialLight'
  | 'thickMaterialLight'
  | 'thinMaterialLight'
  | 'ultraThinMaterialLight'
  // tvOS and iOS 10+ only
  | 'regular'
  | 'prominent'
  // tvOS only
  | 'extraDark';

export const IDefaultProps = {
  disabled: false,
  width: cx(120),
  height: cx(92),
  radius: cx(14),
  backgroundColor: '#FFF',
  iconBgColor: 'transparent',
  iconBgSize: cx(48),
  iconBgRadius: cx(24),
  fontColor: 'rgba(61, 61, 61, 0.5)',
  fontSize: cx(10),
  iconSize: cx(48),
  fontWeight: '400',
  isSupportAcrylic: false,
  blurAmount: 1,
  overlayColor: 'transparent',
  milliseconds: 200,
};

export type IButtonProps = {
  style?: StyleProp<ViewStyle>;
  iconBgStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: string;
  activeOpacity?: number;
  iconColor?: string;
  text?: string;
  theme?: any;
  blurType?: BlurViewProps;
  onPress?: () => void;
  onLongPress?: () => void;
} & Partial<typeof IDefaultProps>;
