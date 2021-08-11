import React from 'react';
import { View } from 'react-native';
import { DataItem, AcrylicEnumButtonGroup } from 'tuya-panel-style-enum-button-group';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';

const data: DataItem = {
  label: '开关1',
  icon: TuyaRNSvgs.power,
  activeIcon: TuyaRNSvgs.plus,
  key: '1',
};

const dataSource1 = new Array(15).fill(0).map((_, idx) => {
  return {
    ...data,
    label: `开关${idx + 1}`,
    key: String(idx + 1),
    disable: idx === 0,
  };
});

const dataSource2 = new Array(7).fill(0).map((_, idx) => {
  return {
    ...data,
    label: `开关${idx + 1}`,
    key: String(idx + 1),
    disable: idx === 0,
    iconIsImage: true,
    icon: 'https://img2.baidu.com/it/u=1443884048,218235837&fm=26&fmt=auto&gp=0.jpg',
    activeIcon: 'https://img0.baidu.com/it/u=3041595518,152570800&fm=26&fmt=auto&gp=0.jpg',
  };
});

export default () => {
  return (
    <ListView
      style={{ backgroundColor: '#f9f9f9', minHeight: 200 }}
      list={[
        {
          title: 'Acrylic',
          content: (
            <View>
              <AcrylicEnumButtonGroup
                width={320}
                type="multi"
                data={dataSource1}
                defaultActiveKeys={['13']}
              />
              <AcrylicEnumButtonGroup
                iconBgColor={{
                  deg: 139,
                  stops: {
                    '0%': '#d8d8d8',
                    '34%': '#666',
                    '100%': '#333',
                  },
                }}
                style={{ marginTop: 20 }}
                data={dataSource1.slice(0, 8)}
              />
              <AcrylicEnumButtonGroup
                style={{ marginTop: 20 }}
                data={dataSource2.slice(0, 8)}
                rowMaxCount={3}
                activeKeys={['4']}
                type="radio"
              />
            </View>
          ),
        },
      ]}
    />
  );
};
