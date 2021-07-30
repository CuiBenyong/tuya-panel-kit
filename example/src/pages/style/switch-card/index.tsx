import React from 'react';
import { View } from 'react-native';
import {
  ClassicSwitchCard,
  NordicSwitchCard,
  AcrylicSwitchCard,
  PaintSwitchCard,
} from 'tuya-panel-style-switch-card';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8' }}
      list={[
        {
          title: Strings.getLang('basic'),
          content: (
            <View>
              <ClassicSwitchCard icon={TuyaRNSvgs.power} />
              <ClassicSwitchCard
                icon={TuyaRNSvgs.power}
                subText="switch card"
                style={{ marginTop: 20 }}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('scandinavian'),
          content: <NordicSwitchCard />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: <AcrylicSwitchCard icon={TuyaRNSvgs.power} subText="switch card" />,
        },
        {
          title: Strings.getLang('illustration'),
          content: <PaintSwitchCard icon={TuyaRNSvgs.power} />,
        },
      ]}
    />
  );
};
