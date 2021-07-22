import { Utils } from 'tuya-panel-utils';

const { convertX: cx } = Utils.RatioUtils;

export const IDefaultProps = {
  disabled: false,
  width: cx(64),
  height: cx(64),
  borderRadius: cx(32),
  backgroundColor: '#f0f',
  isSupportAcrylic: false,
  blurAmount: 1,
  blurType: 'light' as
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
    | 'extraDark',
  milliseconds: 200,
};

export type IButtonProps = {
  d?: string;
  iconColor?: string;
  text?: string;
  theme?: any;
  onPress?: () => void;
  onLongPress?: () => void;
} & Partial<typeof IDefaultProps>;
