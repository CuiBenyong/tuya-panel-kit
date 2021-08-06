/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import renderer from 'react-test-renderer';
 import TuyaRNSvgs from 'tuya-panel-kit/lib/components/iconfont/svg/defaultSvg';
 import { ClassicDepictCard, NordicDepictCard, AcrylicDepictCard, AcrylicDepictIconCard } from '../index';
 
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
 
 describe('DepictCard', () => {
   it('ClassicDepictCard', () => {
     const wrapper = renderer
       .create(<ClassicDepictCard backgroundColor="#fff" />)
       .toJSON();
     expect(wrapper).toMatchSnapshot();
   });
   it('NordicDepictCard', () => {
    const wrapper = renderer
    .create(<NordicDepictCard backgroundColor="#fff" />)
    .toJSON();
  expect(wrapper).toMatchSnapshot();
   })
   it('AcrylicDepictCard', () => {
     const wrapper = renderer.create(<AcrylicDepictCard />).toJSON();
     expect(wrapper).toMatchSnapshot();
   });
   it('AcrylicDepictIconCard', () => {
    const wrapper = renderer.create(<AcrylicDepictIconCard icon={TuyaRNSvgs.power} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
 });
 