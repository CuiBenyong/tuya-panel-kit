import React from 'react';
import { View } from 'react-native';
import { ClassicArrowCard, NordicArrowCard, AcrylicArrowCard } from 'tuya-panel-style-switch-card';
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
              <ClassicArrowCard icon={TuyaRNSvgs.power} onPress={() => console.log('hhhhhh')} />
              <ClassicArrowCard
                icon={TuyaRNSvgs.power}
                subText="switch card"
                style={{ marginTop: 20 }}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('scandinavian'),
          content: <NordicArrowCard icon={TuyaRNSvgs.power} />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: <AcrylicArrowCard icon={TuyaRNSvgs.power} />,
        },
      ]}
    />
  );
};
