import React from 'react';
import { View, Text } from 'react-native';
import IconBackground, { Background } from 'tuya-panel-icon-background';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

const IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

export default () => {
  // return <IconBackground icon={TuyaRNSvgs.power} />;
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8' }}
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
        {
          title: '渐变',
          content: (
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <IconBackground
                iconBgColor={{
                  deg: 90,
                  stops: {
                    '0%': 'red',
                    '100%': 'yellow',
                  },
                }}
                icon={TuyaRNSvgs.power}
                style={{ marginRight: 20 }}
              />
              <IconBackground
                iconBgColor={{
                  stops: [
                    {
                      offset: '0%',
                      stopColor: '#ff0',
                      stopOpacity: '1',
                    },
                    {
                      offset: '100%',
                      stopColor: '#00f',
                      stopOpacity: '1',
                    },
                  ],
                  rx: '50%',
                  ry: '50%',
                  fx: '50%',
                  fy: '50%',
                  cx: '50%',
                  cy: '50%',
                }}
                iconSize={40}
                iconBgSize={70}
                icon={TuyaRNSvgs.power}
                style={{ marginRight: 20 }}
              />
            </View>
          ),
        },
        {
          title: 'Background',
          content: (
            <View>
              <Background
                style={{ justifyContent: 'center', alignItems: 'center' }}
                width={100}
                height={100}
                background="#ff6700"
              >
                <Text>hello world</Text>
              </Background>
              <Background
                style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                width={100}
                height={100}
                background={IMAGE}
              >
                <Text style={{ color: '#fff' }}>hello world</Text>
              </Background>
              <Background
                style={{ paddingTop: 20, marginTop: 20 }}
                contentStyle={{ paddingLeft: 5 }}
                width={100}
                height={100}
                background={{
                  deg: 90,
                  stops: {
                    '0%': 'red',
                    '100%': 'yellow',
                  },
                }}
              >
                <Text style={{ color: '#fff' }}>hello world</Text>
              </Background>
              <Background
                style={{ paddingTop: 20, marginTop: 20, borderRadius: 20, overflow: 'hidden' }}
                contentStyle={{ paddingLeft: 5 }}
                width={100}
                height={100}
                background={{
                  stops: [
                    {
                      offset: '0%',
                      stopColor: '#ff0',
                      stopOpacity: '1',
                    },
                    {
                      offset: '100%',
                      stopColor: '#00f',
                      stopOpacity: '1',
                    },
                  ],
                  rx: '50%',
                  ry: '50%',
                  fx: '50%',
                  fy: '50%',
                  cx: '50%',
                  cy: '50%',
                }}
              >
                <Text style={{ color: '#fff' }}>hello world</Text>
              </Background>
            </View>
          ),
        },
      ]}
    />
  );
};
