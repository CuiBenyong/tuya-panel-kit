import React from 'react';
import { ClassicBlockCard, NordicBlockCard, AcrylicBlockCard } from 'tuya-panel-style-block-card';
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
          content: <ClassicBlockCard icon={TuyaRNSvgs.power} />,
        },
        {
          title: Strings.getLang('scandinavian'),
          content: <NordicBlockCard />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: <AcrylicBlockCard icon={TuyaRNSvgs.power} />,
        },
      ]}
    />
  );
};
