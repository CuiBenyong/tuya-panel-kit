import React from 'react';
import { ViewStyle, Image } from 'react-native';
import { IconFont } from 'tuya-panel-kit';
import Background, { IBackgroundProps, BackgroundType } from './Background';

export { default as Background } from './Background';
export * from './Background';

export interface IconBackgroundProps {
  icon?: string;
  image?: string; // 图标可以是图片，icon 优先级更高
  size?: number;
  iconSize?: number;
  iconBgSize?: number;
  showIcon?: boolean;
  showIconBg?: boolean;
  iconColor?: string;
  iconBgColor?: BackgroundType;
  iconBgRadius?: number;
  style?: ViewStyle;
  imageRadius?: number;
}

const defaultProps = {
  icon: '',
  iconBgSize: 50,
  iconBgRadius: 50,
  iconSize: 24,
  iconColor: '#fff',
  iconBgColor: '#158CFB',
  showIcon: true,
  showIconBg: true,
  style: {},
  imageRadius: 0,
};

const IconBackground: React.FC<IconBackgroundProps> = props => {
  const renderIcon = () => {
    if (props.icon) {
      return <IconFont d={props.icon} color={props.iconColor} size={props.iconSize} />;
    }
    if (props.image) {
      return (
        <Image
          source={{ uri: props.image }}
          style={{ width: props.iconSize, height: props.iconSize, borderRadius: props.imageRadius }}
        />
      );
    }
    return null;
  };

  if (!props.showIcon) {
    return null;
  }
  if (!props.showIconBg) {
    return renderIcon();
  }
  return (
    <Background
      width={props.iconBgSize}
      height={props.iconBgSize}
      background={props.iconBgColor}
      style={[
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: props.iconBgColor || '#fff',
          width: props.iconBgSize,
          height: props.iconBgSize,
          overflow: 'hidden',
          borderRadius: props.iconBgRadius,
        },
        props.style,
      ]}
      contentStyle={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      {renderIcon()}
    </Background>
  );
};

IconBackground.defaultProps = defaultProps;

export default IconBackground;
