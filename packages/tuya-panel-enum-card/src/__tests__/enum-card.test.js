/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { ClassicEnumCard, NordicEnumCard, AcrylicEnumCard } from '../index';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { mount } from 'enzyme';

jest.mock('react-native-gesture-handler', () => {
  return {
    BaseButton: () => 'BaseButton',
  };
});
jest.mock('@react-navigation/stack', () => {
  return {
    TransitionSpecs: {},
    HeaderStyleInterpolators: {},
    createStackNavigator: () => 'createStackNavigator',
  };
});
jest.mock('Dimensions', () => {
  return {
    get: jest.fn().mockReturnValue({ width: 375, height: 667 }),
  };
});

const IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';
const list = [
  {
    label: '状态1',
    icon: TuyaRNSvgs.power,
    key: '0',
  },
  {
    label: '状态2状态2状态2',
    icon: TuyaRNSvgs.power,
    key: '1',
  },
  {
    label: '状态3',
    icon: TuyaRNSvgs.power,
    key: '2',
  },
  {
    label: '状态4',
    icon: TuyaRNSvgs.power,
    key: '3',
  },
  {
    label: '状态5',
    icon: TuyaRNSvgs.power,
    key: '4',
  },
  {
    label: '状态6',
    icon: TuyaRNSvgs.power,
    key: '5',
  },
];
const list1 = list.map(item => {
  return {
    ...item,
    isImage: true,
    icon: IMAGE,
  };
});

describe('EnumCard', () => {
  it('Classic', () => {
    const wrap = renderer.create(<ClassicEnumCard
      style={{ marginTop: 20 }}
      title="工作模式"
      list={list.slice(0, 4)}
      defaultActiveKey="1"
      activeIconColor="#ff6700"
      activeTextColor="#ff6700"
    />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
  it('Classic hand key change', () => {
    let activeKey = '0';
    const onActiveKeyChange = key => { activeKey = key };
    const wrap = mount(<ClassicEnumCard list={list} activeKey={activeKey} onActiveKeyChange={onActiveKeyChange} />);
    const touchInstance = wrap
      .find('TouchableOpacity')
      .at(1);
    touchInstance.props().onPress();
    expect(activeKey).toBe(list[1].key);
    expect(wrap).toMatchSnapshot();  
  });
  it('in android', () => {
    jest.mock('Platform', () => {
      const Platform = require.requireActual('Platform');
      Platform.OS = 'ios';
      return Platform;
    });
    const wrap = renderer.create(<ClassicEnumCard
      style={{ marginTop: 20 }}
      title="工作模式"
      list={list.slice(0, 4)}
      defaultActiveKey="1"
      activeIconColor="#ff6700"
      activeTextColor="#ff6700"
    />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
  it('NordicEnumCard', () => {
    const warp = renderer.create(<NordicEnumCard
      style={{ marginTop: 20 }}
      title="传入图片"
      showTitle={false}
      list={list1.slice(0, 4)}
      defaultActiveKey="1"
    />).toJSON();
    expect(warp).toMatchSnapshot();
  });
  it('AcrylicEnumCard', () => {
    const warp = renderer.create(<AcrylicEnumCard title="工作模式" list={list} activeKey="0" />).toJSON();
    expect(warp).toMatchSnapshot();
  });
});


