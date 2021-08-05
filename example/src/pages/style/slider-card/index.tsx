import React, { useState } from 'react';
import {
  ClassicSliderCard,
  ClassicLargeSliderCard,
  NordicLargeSliderCard,
  AcrylicSliderCard,
} from 'tuya-panel-style-slider-card';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { Text, View } from 'react-native';
import { ListView } from '#components';

const IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

export default () => {
  const [value, setValue] = useState(20);
  const [value1, setValue1] = useState(10);
  return (
    <ListView
      style={{ backgroundColor: '#f9f9f9', minHeight: 200 }}
      list={[
        {
          title: 'Classic',
          content: (
            <View>
              <Text>ClassicSidlerCard：</Text>
              <ClassicSliderCard
                style={{ marginTop: 20 }}
                title="滑动card"
                icon={TuyaRNSvgs.power}
                value={value}
                unit="%"
                handValueChange={setValue}
              />
              <Text style={{ marginTop: 20 }}>ClassicLargeSidlerCard：</Text>
              <ClassicLargeSliderCard
                icon={TuyaRNSvgs.power}
                showIconBg
                iconBgColor={{
                  deg: 90,
                  stops: {
                    '0%': 'red',
                    '100%': 'yellow',
                  },
                }}
                style={{ marginTop: 20 }}
                title="粗的滑动条"
                unit="条"
                value={value}
                handSlidingComplete={setValue}
              />
            </View>
          ),
        },
        {
          title: 'Nordic',
          content: (
            <View>
              <NordicLargeSliderCard
                title="风速"
                icon={TuyaRNSvgs.power}
                unit="档"
                maximumValue={4}
                minimumValue={0}
                value={3}
              />
            </View>
          ),
        },
        {
          title: 'Acrylic',
          content: (
            <View>
              <AcrylicSliderCard
                iconSize={20}
                title="Function"
                icon={IMAGE}
                bothSideIcons={[IMAGE, IMAGE]}
                bothSideIconIsImage
                iconIsImage
                value={value1}
                bottomPromptTexts={['Low', 'Max']}
                handValueChange={setValue1}
              />
              <AcrylicSliderCard
                style={{ marginTop: 20 }}
                iconSize={20}
                iconIsImage
                title="Function"
                icon={IMAGE}
                bothSideIcons={[TuyaRNSvgs.power, TuyaRNSvgs.power]}
                value={value1}
                bottomPromptTexts={['最小', '最大']}
                handSlidingComplete={setValue1}
              />
              <AcrylicSliderCard
                style={{ marginTop: 20 }}
                iconSize={20}
                title="Function"
                icon={TuyaRNSvgs.power}
                // bothSideIcons={[TuyaRNSvgs.power, TuyaRNSvgs.power]}
                value={value1}
                bottomPromptTexts={['最小', '最大']}
                unit="%"
              />
            </View>
          ),
        },
      ]}
    />
  );
};
