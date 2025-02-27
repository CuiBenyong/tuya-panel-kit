import React, { PureComponent } from 'react';
import {
  View,
  Platform,
  AppState,
  BackHandler,
  StyleSheet,
  UIManager,
  Text,
  NativeModules,
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useNavigationState,
  DefaultTheme,
  NavigationState,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { TYSdk } from 'tuya-panel-core';
import MaskView from 'tuya-panel-kit/lib/components/modal/portalOut';
import { Notification } from 'tuya-panel-kit';
import { Strings } from 'tuya-panel-i18n';
import { Utils } from 'tuya-panel-utils';
import FullView from '../full-view';
import { IFullViewProps } from '../full-view/interface';
import TYNativeModules, { getRssi } from '../api';
import AnimatedModal from '../detect-net-modal';
import { SlideFromRightIOS } from './TransitionPresets';
import { INavigatorState, INavigatorProps } from './interface';

/* eslint-disable max-len */

export const moreIcon =
  'M353.152 237.76a52.736 52.736 0 0 0 1.28 75.776l210.432 196.352-204.16 202.944a52.928 52.928 0 0 0-0.64 74.496 51.712 51.712 0 0 0 73.6 0.512l230.144-229.568a64 64 0 0 0-0.256-90.88l-232.96-229.888a54.912 54.912 0 0 0-77.44 0.256z';

const Res = require('../res/wifi.png');

const { get } = Utils.CoreUtils;
const { isIos } = Utils.RatioUtils;

const TYEvent = TYSdk.event;
const TYMobile = TYSdk.mobile;

// 处理Text在某种机型某种字体下宽度被截断的问题
if (Platform.OS !== 'web') {
  // @ts-ignore
  const originRender = Text.render || Text.prototype.render;
  // @ts-ignore
  const parent = Text.render ? Text : Text.prototype;
  // @ts-ignore
  parent.render = function(...args) {
    const origin = originRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [!isIos && { fontFamily: '' }, origin.props.style],
    });
  };
}

function RouteIntercept(props) {
  const navigation = useNavigation();
  const navigationState = useNavigationState(state => state);
  const { routes, index } = navigationState;
  const { name, params } = routes[index];
  const currentRoute = { id: name, ...params };
  React.useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      // 兼容定时里面监听的事件
      TYEvent.emit('NAVIGATOR_ON_DID_FOCUS', currentRoute);
      // TYEvent.emit('NAVIGATOR_ON_WILL_FOCUS', currentRoute);
      props.onFocus && props.onFocus(navigationState);
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      props.onBlur && props.onBlur(navigationState);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  return props.children();
}

const Stack = createStackNavigator();

interface INavigationContainerProps {
  onStateChange?: (state: NavigationState) => void;
}

export default function createNavigator(
  { router, screenOptions },
  navigationContainerProps: INavigationContainerProps = {}
) {
  const defaultScreenOptions = {
    cardOverlayEnabled: true,
    ...SlideFromRightIOS,
  };

  return class Navigator extends PureComponent<INavigatorProps, INavigatorState> {
    /**
     * 推送到云端的事件名
     */
    trackName = 'AutoTrack';
    /**
     * Native trackManager
     */
    trackManager = NativeModules.TYRCTAPMTrackManager;

    /**
     * Native eventManager
     */
    eventManager = NativeModules.TYRCTAPMEventManager;

    constructor(props) {
      super(props);
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      this.state = {
        modalVisible: false,
        isMqttNoticeActive: false,
      };
      this.navigationRef = null;
    }

    componentDidMount() {
      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', this._onBack);
      }
      if (this.hideSignalPop) return;

      TYNativeModules.receiverMqttData(23);
      TYNativeModules.sendMqttData(22);
      TYSdk.DeviceEventEmitter.addListener('receiveMqttData', this._handleMqttSignal);
      this.state.isMqttNoticeActive &&
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', this._onBack);
      }
      if (this.hideSignalPop) return;
      this.timer && clearTimeout(this.timer);
      TYSdk.DeviceEventEmitter.removeListener('receiveMqttData', this._handleMqttSignal);
      AppState.removeEventListener('change', this._handleAppStateChange);
    }

    get hideSignalPop() {
      const { hideSignalPop: hideSignalPopProps = false } = this.opts;
      const hideSignalPop = get(TYSdk, 'devInfo.panelConfig.fun.hideSignalPop', false);

      return hideSignalPop || hideSignalPopProps;
    }

    navigationRef: any;
    timer: number;
    navigationState: NavigationState;
    opts: any;
    fullViewRef: React.RefObject<IFullViewProps>;

    sendEventInfo(eventType, state) {
      const enablePageTrack = get(TYSdk, 'devInfo.panelConfig.fun.enablePageTrack', false);

      if (!enablePageTrack) {
        return;
      }

      const { routeNames, index } = state;
      const currentPage = routeNames[index];
      const referrerPage = index > 0 ? routeNames[index - 1] : '';
      const eventTime = new Date().getTime();
      const attributes = {
        eventType,
        eventTime,
        currentPage,
        referrerPage,
      };
      if (__DEV__) {
        console.log('====RN Tracker info====', attributes);
      } else {
        this.eventManager.event(this.trackName, attributes);
      }
    }

    _onFocus = state => {
      this.sendEventInfo('page.enter', state);
    };

    _onBlur = state => {
      this.sendEventInfo('page.leave', state);
    };

    _onBack = () => {
      const routes = this.navigationState && this.navigationState.routes;
      if (routes && routes.length > 1) {
        this._navigation.pop();
        return true;
      }
      return false;
    };

    _handleAppStateChange = nextAppState => {
      if (nextAppState === 'background') {
        Notification.hide();
      }
    };

    _handleToDetail = () => {
      this.setState({
        modalVisible: true,
      });
    };

    _handleMqttSignal = ({
      data = {},
      protocol,
    }: {
      data?: { data?: { signal: number } };
      protocol?: number;
    } = {}) => {
      if (!data) return;
      if (protocol === 23) {
        const { data: result } = data;
        const { signal } = result;
        getRssi().then((res: { value: number }) => {
          if (!res) {
            return;
          }
          const { value: rssi } = res;
          if (signal < rssi && AppState.currentState === 'active') {
            this.timer && clearTimeout(this.timer);
            this.setState({
              isMqttNoticeActive: true,
            });
            Notification.show({
              message: Strings.getLang('location', undefined),
              backIcon: moreIcon,
              onClose: this._handleToDetail,
              onPress: this._handleToDetail,
              backIconSize: 20,
              backIconCenter: true,
              imageSource: Res,
            });
            this.timer = setTimeout(() => {
              Notification.hide();
              this.setState({
                isMqttNoticeActive: false,
              });
            }, 3000);
          }
        });
      }
    };

    setFullViewRef = ref => {
      if (ref) this.fullViewRef = ref;
    };

    getFullViewRef = () => this.fullViewRef;

    getRouteOptions = (localRoute, navRoute) => {
      return {
        ...localRoute,
        ...navRoute.params,
      };
    };

    dispatchRoute = route => {
      return (
        <Stack.Screen
          key={route.name}
          name={route.name}
          options={({ route: navRoute }) => {
            const opts = this.getRouteOptions(route, navRoute);
            const options = opts.options || {};
            let gestureEnabled;
            const { enablePopGesture = true } = opts;
            if ((options.gesture || opts.name === 'main') && enablePopGesture) {
              gestureEnabled = true;
              TYMobile.enablePopGesture();
            } else {
              gestureEnabled = false;
              TYMobile.disablePopGesture();
            }
            return {
              gestureEnabled,
              swipeEnabled: gestureEnabled,
              ...options,
            };
          }}
        >
          {({ route: navRoute, navigation }) => {
            const Element = route.component;
            const routeOptions = this.getRouteOptions(route, navRoute);
            const options = routeOptions.options || {};
            const opts = { ...options, ...routeOptions };
            this.opts = opts;
            const { devInfo } = this.props;
            const title = opts.title ? opts.title : devInfo.name;
            let showOfflineView =
              opts.showOfflineView !== undefined
                ? opts.showOfflineView
                : !devInfo.appOnline || !devInfo.deviceOnline;
            if (Object.keys(devInfo).length <= 1) {
              showOfflineView = false;
            }

            return (
              <RouteIntercept onBlur={this._onBlur} onFocus={this._onFocus}>
                {() => {
                  const contentLayout = (
                    <Element navigation={navigation} route={{ ...navRoute, ...route }} />
                  );

                  return (
                    <FullView
                      ref={this.setFullViewRef}
                      title={title}
                      style={[styles.container, opts.style]}
                      background={opts.background}
                      topbarStyle={[opts.topbarStyle]}
                      topbarTextStyle={opts.topbarTextStyle}
                      appOnline={devInfo.appOnline}
                      deviceOnline={devInfo.deviceOnline}
                      capability={devInfo.capability}
                      onBack={this._onBack}
                      showMenu={route.name === 'main'}
                      isBleOfflineOverlay={opts.isBleOfflineOverlay}
                      renderStatusBar={opts.renderStatusBar}
                      renderTopBar={opts.renderTopBar}
                      hideTopbar={!!opts.hideTopbar}
                      showOfflineView={showOfflineView}
                      backgroundStyle={opts.backgroundStyle}
                      renderWifiOfflineView={opts.renderWifiOfflineView}
                      renderBleOfflineView={opts.renderBleOfflineView}
                      reconnectTextStyle={opts.reconnectTextStyle}
                    >
                      {contentLayout}
                    </FullView>
                  );
                }}
              </RouteIntercept>
            );
          }}
        </Stack.Screen>
      );
    };

    getNavigation = () => {
      return this._navigation;
    };

    handleNavigationStateChange = state => {
      this.navigationState = state;
    };

    getScreenOptions = ({ route, navigation }, _screenOptions, defaultOptions) => {
      let options;
      if (typeof _screenOptions === 'function') {
        options = {
          ...defaultOptions,
          ..._screenOptions({ route, navigation }),
          header: () => null,
        };
      } else {
        options = {
          ...defaultOptions,
          ..._screenOptions,
          header: () => null,
        };
      }
      return options;
    };

    _navigation: {
      pop?: () => void;
    } = {};

    render() {
      const { modalVisible } = this.state;
      return (
        <View style={{ flex: 1 }}>
          <NavigationContainer
            {...navigationContainerProps}
            theme={{
              ...DefaultTheme,
              colors: { ...DefaultTheme.colors, background: 'transparent' },
            }}
            onStateChange={state => {
              this.handleNavigationStateChange(state);
              navigationContainerProps.onStateChange &&
                navigationContainerProps.onStateChange(state);
            }}
            ref={value => {
              this.navigationRef = value;
            }}
          >
            <Stack.Navigator
              initialRouteName="main"
              screenOptions={({ route, navigation }) => {
                this._navigation = navigation;
                TYSdk.applyNavigator({ ...navigation, ...this.navigationRef });
                const options = this.getScreenOptions(
                  { route, navigation },
                  screenOptions,
                  defaultScreenOptions
                );
                return options;
              }}
            >
              {router.map(this.dispatchRoute)}
            </Stack.Navigator>
          </NavigationContainer>

          {modalVisible && <AnimatedModal onClose={() => this.setState({ modalVisible: false })} />}
          <MaskView />
        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
