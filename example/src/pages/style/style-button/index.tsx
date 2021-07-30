import React from 'react';
import { View } from 'react-native';
import { TYSdk, Utils } from 'tuya-panel-kit';
import { ClassicButton, NordicButton, AcrylicButton, PaintButton } from 'tuya-panel-style-button';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

const { get, compareVersion } = Utils.CoreUtils;

const requireRnVersion = '5.31';

export default () => {
  const appRnVersion = get(TYSdk.mobile, 'mobileInfo.appRnVersion');
  const isGreater = appRnVersion && compareVersion(appRnVersion, requireRnVersion);
  const isShow = isGreater === 0 || isGreater === 1;
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8', flex: 1 }}
      list={[
        {
          title: Strings.getLang('basic'),
          content: (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <ClassicButton icon={TuyaRNSvgs.power} text="开关" iconColor="#158CFB" />
            </View>
          ),
        },
        {
          title: Strings.getLang('scandinavian'),
          content: (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <NordicButton icon={TuyaRNSvgs.power} text="开关" iconColor="#FFF" />
            </View>
          ),
        },
        {
          title: Strings.getLang('acrylic'),
          content: (
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
              <AcrylicButton
                icon={TuyaRNSvgs.power}
                text="开关"
                iconColor="#FFF"
                isSupportAcrylic={isShow}
              />
            </View>
          ),
        },
        {
          title: Strings.getLang('illustration'),
          content: (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <PaintButton icon={TuyaRNSvgs.power} text="开关" iconColor="#FFF" />
            </View>
          ),
        },
        {
          title: '没有图标、没有图标背景',
          content: (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <PaintButton
                width={90}
                showIcon={false}
                icon={TuyaRNSvgs.power}
                text="开关"
                iconColor="#FFF"
                padding={[5, 0, 0, 5]}
              />
              <PaintButton
                width={90}
                showIconBg={false}
                icon={TuyaRNSvgs.power}
                text="开关"
                iconColor="#158CFC"
                style={{ marginLeft: 10 }}
              />
            </View>
          ),
        },
        {
          title: '设置padding',
          content: (
            <PaintButton
              icon={TuyaRNSvgs.power}
              text="开关"
              iconColor="#FFF"
              style={{ marginLeft: 10 }}
              padding={[10, 40, 0, 0]}
            />
          ),
        },
      ]}
    />
  );
};
