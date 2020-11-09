import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
import { NavigationContainer, useNavigation, useNavigationState } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { TYSdk } from '@tuya-rn/tuya-native-kit';

import MaskView from '../../modal/portalOut';
import FullView from '../full-view';
import Notification from '../../notification';
import TYNativeModules, { getRssi } from '../api';
import AnimatedModal from '../detect-net-modal';
import Strings from '../../i18n/strings';
import { CoreUtils, RatioUtils } from '../../../utils';

export const moreIcon =
  'M353.152 237.76a52.736 52.736 0 0 0 1.28 75.776l210.432 196.352-204.16 202.944a52.928 52.928 0 0 0-0.64 74.496 51.712 51.712 0 0 0 73.6 0.512l230.144-229.568a64 64 0 0 0-0.256-90.88l-232.96-229.888a54.912 54.912 0 0 0-77.44 0.256z';

const Res = require('../../res/wifi.png');

const { get } = CoreUtils;
const { isIos } = RatioUtils;

const TYEvent = TYSdk.event;
const TYMobile = TYSdk.mobile;

// 处理Text在某种机型某种字体下宽度被截断的问题,
if (Platform.OS !== 'web') {
  const originRender = Text.render || Text.prototype.render;
  const parent = Text.render ? Text : Text.prototype;
  parent.render = function (...args) {
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
      // console.warn('page.leave', navigationName);
    };
  }, [navigation]);

  return props.children();
}

const Stack = createStackNavigator();

export default function createNavigator({ router, screenOptions }) {
  const defaultScreenOptions = {
    header: () => null,
    ...TransitionPresets.SlideFromRightIOS,
  };

  return class Navigator extends PureComponent {
    static propTypes = {
      devInfo: PropTypes.object.isRequired,
    };

    // timer: NodeJS.Timeout;
    // navigationState: NavigationState;
    _navigation = {};
    _navigator = {};
    // fullViewRef: any;
    // opts: HookRouteOptions;
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
      TYSdk.applyNavigator(this._navigator);
      this.state = {
        modalVisible: false,
      };
    }

    componentDidMount() {
      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', this._onBack);
      }
      if (this.hideSignalPop) return;

      TYNativeModules.receiverMqttData(23);
      TYNativeModules.sendMqttData(22);
      TYSdk.DeviceEventEmitter.addListener('receiveMqttData', this._handleMqttSignal);
      AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', this._onBack);
      }
      if (this.hideSignalPop) return;

      Notification.hide();
      this.timer && clearTimeout(this.timer);
      TYSdk.DeviceEventEmitter.removeListener('receiveMqttData', this._handleMqttSignal);
      AppState.removeEventListener('change', this._handleAppStateChange);
    }

    get hideSignalPop() {
      const { hideSignalPop: hideSignalPopProps = false } = this.opts;
      const hideSignalPop = get(TYSdk, 'devInfo.panelConfig.fun.hideSignalPop', false);

      return hideSignalPop || hideSignalPopProps;
    }

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

    _handleMqttSignal = ({ data = {}, protocol } = {}) => {
      if (!data) return;
      if (protocol === 23) {
        const { data: result } = data;
        const { signal } = result;
        getRssi().then(res => {
          if (!res) {
            return;
          }
          const { value: rssi } = res;
          if (signal < rssi && AppState.currentState === 'active') {
            this.timer && clearTimeout(this.timer);
            Notification.show({
              message: Strings.getLang('location', undefined),
              backIcon: moreIcon,
              onClose: this._handleToDetail,
              onPress: this._handleToDetail,
              enableImage: true,
              backIconSize: 20,
              backIconCenter: true,
              imageSource: Res,
            });
            this.timer = setTimeout(() => {
              Notification.hide();
            }, 3000);
          }
        });
      }
    };

    /**
     * @desc
     *   hookRoute 可以做一些控制处理，
     *   return 是一个 Object, 返回出去的Object将会被 FullView 所应用，
     *   FullView 即一个视图包裹组件，内置了头部栏，背景，离线提示，模态窗等功能，
     *   因此你可以通过return的object来自定义这些内容;
     * @param {Object} route - 路径对象，里面会包括路径id等路径信息，也会包含navigator.push()所附带的值
     * @example
     * {
     *   background: backgroundImage | linearGradientBackground, // 背景（可支持图片或渐变）
     *   backgroundColor: '#FCFCFC', // 背景颜色值
     *   style: ViewPropTypes.style,
     *   topbarStyle: ViewPropTypes.style, // 控制头部栏的样式
     *   topbarTextStyle: Text.propTypes.style, // 控制头部栏的文字样式
     *   hideFullView: boolean, // 控制是否隐藏 FullView
     *   showOfflineView: boolean, // 是否渲染 OfflineView
     *   renderFullView: (props) => {
     *     return (<FullView />);
     *   },
     *   FullView: ReactComponent, // 自定义的 FullView 组件, 如果使用自定义 FullView 组件，TopBar、OfflineView 也需要在 FullView 里面调用
     *   hideTopbar: boolean, // 控制是否隐藏 TopBar
     *   OfflineView: ReactComponent, // 自定义的 OfflineView 组件
     * }
     */
    hookRoute(_route) {
      return {};
    }

    // 可重写此方法实现具体页面渲染
    // renderScene(route: { id: string }, Element: any, props: any) {
    //   const navigation = this.getNavigation();
    //   return (
    //     <Element
    //       navigator={TYNative.Navigator}
    //       navigation={navigation}
    //       {...props.route.params}
    //       {...props}
    //     />
    //   );
    // }

    setFullViewRef = ref => {
      if (ref) this.fullViewRef = ref;
    };

    getFullViewRef = () => this.fullViewRef;

    getRouteOptions = (localRoute, navRoute) => {
      const opts = Object.assign({}, localRoute, this.hookRoute(localRoute), navRoute.params);
      return opts;
    };

    dispatchRoute = route => {
      return (
        <Stack.Screen
          key={route.id}
          name={route.id}
          options={({ route: navRoute, navigation }) => {
            const opts = this.getRouteOptions(route, navRoute);
            const options = this.getScreenOptions(
              { route: navRoute, navigation },
              route.screenOptions
            );
            let gestureEnabled;
            const { enablePopGesture = true } = opts;
            if ((!!opts.gesture || opts.id === 'main') && enablePopGesture) {
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
            const Element = route.Scene;
            const opts = this.getRouteOptions(route, navRoute);
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
                    <Element
                      navigator={TYSdk.Navigator}
                      navigation={navigation}
                      {...navRoute.params}
                    />
                  );

                  if (opts.hideFullView) {
                    return contentLayout;
                  }

                  if (opts.FullView) {
                    const CustomFullView = opts.FullView;
                    return (
                      <CustomFullView
                        ref={ref => {
                          if (ref) this.fullViewRef = ref;
                        }}
                        title={title}
                        onBack={this._onBack}
                        appOnline={devInfo.appOnline}
                        deviceOnline={devInfo.deviceOnline}
                        renderStatusBar={opts.renderStatusBar}
                        renderTopBar={opts.renderTopBar}
                        hideTopbar={!!opts.hideTopbar}
                        showOfflineView={showOfflineView}
                      >
                        {contentLayout}
                      </CustomFullView>
                    );
                  }

                  return (
                    <FullView
                      ref={this.setFullViewRef}
                      title={title}
                      style={[styles.container, opts.style]}
                      background={opts.background}
                      topbarStyle={[styles.topbarStyle, opts.topbarStyle]}
                      topbarTextStyle={opts.topbarTextStyle}
                      appOnline={devInfo.appOnline}
                      deviceOnline={devInfo.deviceOnline}
                      capability={devInfo.capability}
                      onBack={this._onBack}
                      showMenu={route.id === 'main'}
                      isBleOfflineOverlay={opts.isBleOfflineOverlay}
                      renderStatusBar={opts.renderStatusBar}
                      renderTopBar={opts.renderTopBar}
                      hideTopbar={!!opts.hideTopbar}
                      showOfflineView={showOfflineView}
                      backgroundStyle={opts.backgroundStyle}
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

    setTYNativeNavigator(navigation) {
      const navigator = Object.assign(this._navigator, {
        ...navigation,
        push({ id, ...params }) {
          return navigation.navigate(id, params);
        },
        pop() {
          navigation.pop();
        },
        getCurrentRoutes: () => {
          const routes = this.navigationState && this.navigationState.routes;
          return routes;
        },
      });
      TYSdk.applyNavigator(navigator);
    }

    setNavigation = navigation => {
      this._navigation = Object.assign(this._navigation, navigation);
      this.setTYNativeNavigator(navigation);
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
        };
      } else {
        options = {
          ...defaultOptions,
          ..._screenOptions,
        };
      }
      return options;
    };

    render() {
      const { modalVisible } = this.state;

      return (
        <View style={{ flex: 1 }}>
          <NavigationContainer onStateChange={this.handleNavigationStateChange}>
            <Stack.Navigator
              initialRouteName="main"
              screenOptions={({ route, navigation }) => {
                this.setNavigation(navigation);
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
  topbarStyle: {},
});
