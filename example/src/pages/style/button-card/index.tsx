import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ClassicButtonCard, NordicButtonCard } from 'tuya-panel-style-button-card';
import Iconbackground from 'tuya-panel-icon-background';
import { ListView } from '#components';

const list = [
  {
    label: '按钮1',
    key: '0',
    disabled: true,
  },
  {
    label: '按钮2',
    key: '1',
  },
  {
    label: '按钮3',
    key: '2',
  },
  {
    label: '按钮4',
    key: '3',
  },
];

const list1 = list.map(item => ({
  ...item,
  icon: TuyaRNSvgs.power,
}));

export default () => {
  const [activeKeys, setActiveKeys] = useState(['0', '1']);
  const handActiveKeyChange = (key, nextKeys, data) => {
    setActiveKeys(nextKeys);
  };

  const renderButtonItem = data => {
    // console.log(data);
    return (
      <View style={styles.buttonStyle}>
        <Iconbackground showIconBg={false} icon={data.icon} />
        <Text style={{ marginTop: 15 }}>{data.label}</Text>
      </View>
    );
  };

  return (
    <ListView
      style={{ backgroundColor: '#f9f9f9', minHeight: 200 }}
      list={[
        {
          title: 'Classic',
          content: (
            <View>
              <ClassicButtonCard
                title="工作模式"
                showIconBg={false}
                icon={TuyaRNSvgs.power}
                list={list}
              />
              <Text style={{ marginTop: 20 }}>受控制的：</Text>
              <ClassicButtonCard
                style={{ marginTop: 20 }}
                title="工作模式"
                icon={TuyaRNSvgs.power}
                iconSize={14}
                showIconBg
                iconBgColor={{
                  deg: 90,
                  stops: {
                    '0%': 'red',
                    '100%': 'yellow',
                  },
                }}
                list={list}
                rowCount={4}
                activeKeys={activeKeys}
                activeKeyChange={handActiveKeyChange}
              />
            </View>
          ),
        },
        {
          title: 'Nordic',
          content: (
            <NordicButtonCard
              title="工作模式"
              showIconBg={false}
              icon={TuyaRNSvgs.power}
              list={list}
            />
          ),
        },
        {
          title: 'Custom button rendering methods',
          content: (
            <NordicButtonCard
              title="工作模式"
              showIconBg={false}
              icon={TuyaRNSvgs.power}
              list={list1}
              renderButtonItem={renderButtonItem}
              rowCount={4}
              showTitle={false}
              backgroundColor="rgba(255, 255, 255, 0)"
            />
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 120, 98, 0.3)',
    height: 98,
    borderRadius: 98,
  },
});
