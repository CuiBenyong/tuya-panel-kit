import React from 'react';
import { View } from 'react-native';
import {
  ClassicDepictCard,
  NordicDepictCard,
  AcrylicDepictCard,
  AcrylicDepictIconCard,
} from 'tuya-panel-style-depict-card';
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
          content: <ClassicDepictCard backgroundColor="#fff" />,
        },
        {
          title: Strings.getLang('scandinavian'),
          content: <NordicDepictCard backgroundColor="#fff" />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: (
            <View>
              <AcrylicDepictCard style={{ marginBottom: 10 }} />
              <AcrylicDepictIconCard icon={TuyaRNSvgs.power} />
            </View>
          ),
        },
      ]}
    />
  );
};
