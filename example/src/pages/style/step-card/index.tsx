import React from 'react';
import { ClassicStepCard, NordicStepCard } from 'tuya-panel-style-step-card';
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
          content: <ClassicStepCard onValueChange={value => console.log({ value })} />,
        },
        {
          title: Strings.getLang('scandinavian'),
          content: <NordicStepCard icon={TuyaRNSvgs.power} />,
        },
      ]}
    />
  );
};
