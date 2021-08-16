import React from 'react';
import { Button, View } from 'react-native';
import { NordicListCard } from 'tuya-panel-style-list-card';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  const [value, setValue] = React.useState('world');
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8' }}
      list={[
        {
          title: Strings.getLang('scandinavian'),
          content: (
            <View>
              <NordicListCard
                icon={TuyaRNSvgs.power}
                value={value}
                onPress={value => console.log({ value })}
                dataSource={[
                  { icon: TuyaRNSvgs.power, text: 'Hello World', value: 'world' },
                  { icon: TuyaRNSvgs.power, text: 'Hello Tuya', value: 'tuya' },
                  { icon: TuyaRNSvgs.power, text: 'Hello China', value: 'china' },
                ]}
              />
              <Button title="hh" onPress={() => setValue('china')} />
            </View>
          ),
        },
      ]}
    />
  );
};
