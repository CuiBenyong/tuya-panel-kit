import React from 'react';
import {
  ClassicIconBlockCard,
  NordicIconBlockCard,
  AcrylicIconBlockCard,
} from 'tuya-panel-style-icon-card';
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
          content: <ClassicIconBlockCard icon={TuyaRNSvgs.power} />,
        },
        {
          title: Strings.getLang('scandinavian'),
          content: <NordicIconBlockCard icon={TuyaRNSvgs.power} />,
        },
        {
          title: Strings.getLang('acrylic'),
          content: <AcrylicIconBlockCard icon={TuyaRNSvgs.power} />,
        },
      ]}
    />
  );
};
