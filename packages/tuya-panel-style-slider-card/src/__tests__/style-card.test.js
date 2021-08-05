/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Utils } from 'tuya-panel-utils';
import {
  ClassicSliderCard,
  ClassicLargeSliderCard,
  NordicLargeSliderCard,
  AcrylicSliderCard,
} from '../index';
import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
import { mount } from 'enzyme';

const { ThemeProvider } = Utils.ThemeUtils;

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

describe('SiderCard', () => {
  it('Classic', () => {
    const wrap = renderer
      .create(
        <ThemeProvider>
          <ClassicSliderCard title="title1" />
        </ThemeProvider>
      )
      .toJSON();
    expect(wrap).toMatchSnapshot();
  });
  it('ClassicLargeSlider', () => {
    const wrap = renderer
      .create(
        <ThemeProvider>
          <ClassicLargeSliderCard showTitle={false} />
        </ThemeProvider>
      )
      .toJSON();
    expect(wrap).toMatchSnapshot();
  });

  it('Nordic', () => {
    const wrap = renderer.create(
      <ThemeProvider>
        <NordicLargeSliderCard
          title="风速"
          icon={TuyaRNSvgs.power}
          unit="档"
          maximumValue={4}
          minimumValue={0}
          value={3}
        />
      </ThemeProvider>
    ).toJSON();
    expect(wrap).toMatchSnapshot();
  });

  it('Acrylic', () => {
    const wrap = renderer.create(
      <ThemeProvider>
        <AcrylicSliderCard
          style={{ marginTop: 20 }}
          iconSize={20}
          iconIsImage
          title="Function"
          icon={IMAGE}
          bothSideIcons={[TuyaRNSvgs.power, TuyaRNSvgs.power]}
          value={30}
          bottomPromptTexts={['最小', '最大']}
        />
      </ThemeProvider>
    ).toJSON();
    expect(wrap).toMatchSnapshot();
  });

  it('hand value change', () => {
    let value = 20;
    const setValue = val => value = val;
    const wrap = mount(
      <ThemeProvider>
        <AcrylicSliderCard
          style={{ marginTop: 20 }}
          iconSize={20}
          iconIsImage
          title="Function"
          icon={IMAGE}
          bothSideIcons={[TuyaRNSvgs.power, TuyaRNSvgs.power]}
          value={30}
          bottomPromptTexts={['最小', '最大']}
          handSlidingComplete={setValue}
        />
      </ThemeProvider>
    );
    const sliderInstance = wrap.find('Slider').at(0);
    sliderInstance.props().onSlidingComplete(30);
    expect(value).toBe(30);
  });
});
