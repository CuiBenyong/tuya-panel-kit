import React from 'react';
import { View, Dimensions } from 'react-native';
import {
  ClassicSwitchCard,
  NordicSwitchCard,
  AcrylicSwitchCard,
  PaintSwitchCard,
} from 'tuya-panel-style-switch-card';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

const { height } = Dimensions.get('screen');

export default () => {
  // return <IconBackground icon={TuyaRNSvgs.power} />;
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8', flex: 1, height }}
      list={[
        // {
        //   title: Strings.getLang('basic'),
        //   content: (
        //     <View>
        //       <ClassicSwitchCard icon={TuyaRNSvgs.power} />
        //       <ClassicSwitchCard
        //         icon={TuyaRNSvgs.power}
        //         subText="switch card"
        //         style={{ marginTop: 20 }}
        //       />
        //     </View>
        //   ),
        // },
        // {
        //   title: Strings.getLang('scandinavian'),
        //   content: (
        //     <View>
        //       <NordicSwitchCard />
        //     </View>
        //   ),
        // },
        {
          title: Strings.getLang('acrylic'),
          content: (
            <View>
              <AcrylicSwitchCard icon={TuyaRNSvgs.power} subText="switch card" />
            </View>
          ),
        },
        // {
        //   title: Strings.getLang('illustration'),
        //   content: (
        //     <View>
        //       <PaintSwitchCard icon={TuyaRNSvgs.power} />
        //     </View>
        //   ),
        // },
      ]}
    />
  );
};
