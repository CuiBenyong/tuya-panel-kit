import React from 'react';
import { View, Dimensions } from 'react-native';
import IconBackground from 'tuya-panel-icon-background';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';

const { height } = Dimensions.get('screen');

export default () => {
  // return <IconBackground icon={TuyaRNSvgs.power} />;
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8', flex: 1, height }}
      list={[
        {
          title: '图标背景都存在',
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <IconBackground icon={TuyaRNSvgs.power} style={{ marginRight: 20 }} />
              <IconBackground icon={TuyaRNSvgs.power} iconBgRadius={5} />
            </View>
          ),
        },
        {
          title: '只存在图标',
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
          title: '图标不存在，全都不存在',
          content: (
            <IconBackground
              icon={TuyaRNSvgs.power}
              iconColor="#57BCFB"
              iconBgRadius={5}
              showIcon={false}
            />
          ),
        },
      ]}
    />
  );
};
