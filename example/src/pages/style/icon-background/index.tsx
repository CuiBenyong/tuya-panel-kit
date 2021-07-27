import React from 'react';
import { View, Dimensions } from 'react-native';
import IconBackground from 'tuya-panel-icon-background';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

const { height } = Dimensions.get('screen');

const IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

export default () => {
  // return <IconBackground icon={TuyaRNSvgs.power} />;
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8', flex: 1, height }}
      list={[
        {
          title: Strings.getLang('icon_and_background'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <IconBackground icon={TuyaRNSvgs.power} style={{ marginRight: 20 }} />
              <IconBackground icon={TuyaRNSvgs.power} iconBgRadius={5} />
            </View>
          ),
        },
        {
          title: Strings.getLang('only_icon'),
          content: (
            <IconBackground
              icon={TuyaRNSvgs.power}
              iconColor="#57BCFB"
              iconBgRadius={5}
              showIconBg={false}
            />
          ),
        },
        {
          title: Strings.getLang('no_icon'),
          content: (
            <IconBackground
              icon={TuyaRNSvgs.power}
              iconColor="#57BCFB"
              iconBgRadius={5}
              showIcon={false}
            />
          ),
        },
        {
          title: Strings.getLang('iconbg_image'),
          content: (
            <IconBackground
              image={IMAGE}
              iconBgColor="#fff"
              iconColor="#57BCFB"
              iconBgRadius={5}
              imageRadius={10}
            />
          ),
        },
      ]}
    />
  );
};
