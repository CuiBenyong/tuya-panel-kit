import React from 'react';
import { View } from 'react-native';
import { ClassicDisplayCard, AcrylicDisplayCard } from 'tuya-panel-style-display-card';
import { ListView } from '#components';
import Strings from '#i18n';

export default () => {
  return (
    <ListView
      style={{ backgroundColor: '#f8f8f8' }}
      list={[
        {
          title: Strings.getLang('basic'),
          content: (
            <View>
              <ClassicDisplayCard isAlignCenter />
              <ClassicDisplayCard backgroundColor="#FFF" />
            </View>
          ),
        },
        {
          title: Strings.getLang('acrylic'),
          content: <AcrylicDisplayCard />,
        },
      ]}
    />
  );
};
