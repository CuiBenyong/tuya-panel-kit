/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Iconbackground from '../index';

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

const icon =
  'M512 0C794.760533 0 1024 229.239467 1024 512S794.760533 1024 512 1024 0 794.760533 0 512 229.239467 0 512 0z m185.048178 327.0656a26.988089 26.988089 0 0 0-38.183822 38.183822 207.712711 207.712711 0 1 1-293.728712 0 26.988089 26.988089 0 1 0-38.183822-38.183822c-102.172444 102.1952-102.172444 267.901156 0 370.096356 102.1952 102.172444 267.901156 102.172444 370.096356 0 102.172444-102.1952 102.172444-267.901156 0-370.096356zM511.886222 227.555556a27.079111 27.079111 0 0 0-26.919822 24.302933l-0.136533 2.776178v196.152889a27.079111 27.079111 0 0 0 53.998933 2.776177l0.136533-2.776177v-196.152889a27.079111 27.079111 0 0 0-27.079111-27.079111z';

describe('IconBackground', () => {
  it('icon and background', () => {
    const wrapper = renderer.create(<Iconbackground icon={icon} iconBgRadius={5} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('only icon', () => {
    const wrapper = renderer.create(<Iconbackground icon={icon} showIconBg={false} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('no icon', () => {
    const wrapper = renderer.create(<Iconbackground showIcon={false} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
