import Strings from '#i18n';

// basic
import Battery from './pages/basic/battery';
import BrickButton from './pages/basic/brick-button';
import Button from './pages/basic/button';
import StyleButton from './pages/style/style-button';
import Iconfont from './pages/basic/icon-font';
import Motion from './pages/basic/motion';
import SliderProgress from './pages/basic/slider-progress';
import TYText from './pages/basic/tytext';
import UnitText from './pages/basic/unit-text';
// data-entry
import Checkbox from './pages/data-entry/checkbox';
import DatePicker from './pages/data-entry/date-picker';
import PickerView from './pages/data-entry/picker-view';
import Slider from './pages/data-entry/slider';
import SliderWithLine from './pages/data-entry/slider-with-line';
import Stepper from './pages/data-entry/stepper';
import SwitchButton from './pages/data-entry/switch-button';
import TimerPicker from './pages/data-entry/timer-picker';
// feedback
import Dialog from './pages/feedback/dialog';
import GlobalToast from './pages/feedback/global-toast';
import Modal from './pages/feedback/modal';
import Notification from './pages/feedback/notification';
import NotificationLegacy from './pages/feedback/notification-legacy';
import Popup from './pages/feedback/popup';
import Swipeout from './pages/feedback/swipeout';
import Tips from './pages/feedback/tips';
import ToastView from './pages/feedback/toast-view';
// navigation
import ControllerBar from './pages/navigation/controller-bar';
import Tab from './pages/navigation/tab';
import TabBar from './pages/navigation/tab-bar';
import Tabs from './pages/navigation/tabs';
import TopBar from './pages/navigation/top-bar';
// presentation
import Carousel from './pages/presentation/carousel';
import CircleView from './pages/presentation/circle-view';
import Collapsible from './pages/presentation/collapsible';
import Divider from './pages/presentation/divider';
import LinearGradient from './pages/presentation/linear-gradient';
import Progress from './pages/presentation/progress';
import RadialGradient from './pages/presentation/radial-gradient';
import RotationView from './pages/presentation/rotation-view';
import TYFlatList from './pages/presentation/tyflat-list';
import TYListItem from './pages/presentation/tylist-item';
import TYSectionList from './pages/presentation/tysection-list';
import IconBackground from './pages/style/icon-background';

// Style
import SwitchCard from './pages/style/switch-card';
import BlockCard from './pages/style/block-card';
import EnumCard from './pages/style/enum-card';
import ButtonCard from './pages/style/button-card';
import DisplayCard from './pages/style/display-card';
import SliderCard from './pages/style/slider-card';
import DepictCard from './pages/style/depict-card';
import IconBlockCard from './pages/style/icon-card';
import EnumSliderCard from './pages/style/enum-slider-card';
import EnumTabsButtonCard from './pages/style/enum-tabs-button-card';
import ListCard from './pages/style/list-card';
import ArrowCard from './pages/style/arrow-card';

export const routes = [
  // style
  {
    name: 'enum card',
    href: '/style/enum-card',
    component: EnumCard,
  },
  {
    name: 'ButtonCard',
    href: '/style/button-card',
    component: ButtonCard,
  },
  {
    name: 'SliderCard',
    href: '/style/slider-card',
    component: SliderCard,
  },
  {
    name: 'EnumSliderCard',
    href: '/style/enum-slider-card',
    component: EnumSliderCard,
  },
  {
    name: 'EnumTabsButtonCard',
    href: '/style/enum-tabs-button-card',
    component: EnumTabsButtonCard,
  },
  // basic
  {
    name: Strings.getLang('battery'),
    href: '/basic/battery',
    component: Battery,
  },
  {
    name: Strings.getLang('brick_button'),
    href: '/basic/brick-button',
    component: BrickButton,
  },
  {
    name: Strings.getLang('button'),
    href: '/basic/button',
    component: Button,
  },
  {
    name: Strings.getLang('style_button'),
    href: '/basic/style-button',
    component: StyleButton,
  },
  {
    name: Strings.getLang('icon_background'),
    href: '/basic/icon-background',
    component: IconBackground,
  },
  {
    name: Strings.getLang('iconfont'),
    href: '/basic/icon-font',
    component: Iconfont,
  },
  {
    name: Strings.getLang('motion'),
    href: '/basic/motion',
    component: Motion,
  },
  {
    name: Strings.getLang('slider_progress'),
    href: '/basic/slider-progress',
    component: SliderProgress,
  },
  {
    name: Strings.getLang('tytext'),
    href: '/basic/tytext',
    component: TYText,
  },
  {
    name: Strings.getLang('unittext'),
    href: '/basic/unit-text',
    component: UnitText,
  },
  // data-entry
  {
    name: Strings.getLang('checkbox'),
    href: '/data-entry/checkbox',
    component: Checkbox,
  },
  {
    name: Strings.getLang('datepicker'),
    href: '/data-entry/date-picker',
    component: DatePicker,
  },
  {
    name: Strings.getLang('pickerview'),
    href: '/data-entry/picker-view',
    component: PickerView,
  },
  {
    name: Strings.getLang('slider'),
    href: '/data-entry/slider',
    component: Slider,
  },
  {
    name: Strings.getLang('slider_with_line'),
    href: '/data-entry/slider-with-line',
    component: SliderWithLine,
  },
  {
    name: Strings.getLang('stepper'),
    href: '/data-entry/stepper',
    component: Stepper,
  },
  {
    name: Strings.getLang('switchbutton'),
    href: '/data-entry/switch-button',
    component: SwitchButton,
  },
  {
    name: Strings.getLang('timepicker'),
    href: '/data-entry/timer-picker',
    component: TimerPicker,
  },
  // feedback
  {
    name: Strings.getLang('dialog'),
    href: '/feedback/dialog',
    component: Dialog,
  },
  {
    name: Strings.getLang('globaltoast'),
    href: '/feedback/global-toast',
    component: GlobalToast,
  },
  {
    name: Strings.getLang('modal'),
    href: '/feedback/modal',
    component: Modal,
  },
  {
    name: Strings.getLang('notification'),
    href: '/feedback/notification',
    component: Notification,
  },
  {
    name: Strings.getLang('notificationlegacy'),
    href: '/feedback/notification-legacy',
    component: NotificationLegacy,
  },
  {
    name: Strings.getLang('popup'),
    href: '/feedback/popup',
    component: Popup,
  },
  {
    name: Strings.getLang('swipeout'),
    href: '/feedback/swipeout',
    component: Swipeout,
  },
  {
    name: Strings.getLang('tips'),
    href: '/feedback/tips',
    component: Tips,
  },
  {
    name: Strings.getLang('toastview'),
    href: '/feedback/toast-view',
    component: ToastView,
  },
  // navigation
  {
    name: Strings.getLang('controllerbar'),
    href: '/navigation/controller-bar',
    component: ControllerBar,
  },
  {
    name: Strings.getLang('tab'),
    href: '/navigation/tab',
    component: Tab,
  },
  {
    name: Strings.getLang('tabbar'),
    href: '/navigation/tab-bar',
    component: TabBar,
  },
  {
    name: Strings.getLang('tabs'),
    href: '/navigation/tabs',
    component: Tabs,
  },
  {
    name: Strings.getLang('topbar'),
    href: '/navigation/top-bar',
    component: TopBar,
  },
  {
    name: Strings.getLang('carousel'),
    href: '/presentation/carousel',
    component: Carousel,
  },
  {
    name: Strings.getLang('circleview'),
    href: '/presentation/circle-view',
    component: CircleView,
  },
  {
    name: Strings.getLang('collapsible'),
    href: '/presentation/collapsible',
    component: Collapsible,
  },
  {
    name: Strings.getLang('divider'),
    href: '/presentation/divider',
    component: Divider,
  },
  {
    name: Strings.getLang('lineargradient'),
    href: '/presentation/linear-gradient',
    component: LinearGradient,
  },
  {
    name: Strings.getLang('progress'),
    href: '/presentation/progress',
    component: Progress,
  },
  {
    name: Strings.getLang('radialgradient'),
    href: '/presentation/radial-gradient',
    component: RadialGradient,
  },
  {
    name: Strings.getLang('rotationview'),
    href: '/presentation/rotation-view',
    component: RotationView,
  },
  {
    name: Strings.getLang('tyflatlist'),
    href: '/presentation/tyflat-list',
    component: TYFlatList,
  },
  {
    name: Strings.getLang('tylistitem'),
    href: '/presentation/tylist-item',
    component: TYListItem,
  },
  {
    name: Strings.getLang('tysectionlist'),
    href: '/presentation/tysection-list',
    component: TYSectionList,
  },
  // Style

  {
    name: Strings.getLang('switch_card'),
    href: '/style/switch-card',
    component: SwitchCard,
  },
  {
    name: Strings.getLang('block_card'),
    href: '/style/block-card',
    component: BlockCard,
  },
  {
    name: Strings.getLang('display_card'),
    href: '/style/display-card',
    component: DisplayCard,
  },
  {
    name: Strings.getLang('depict_card'),
    href: '/style/depict-card',
    component: DepictCard,
  },
  {
    name: Strings.getLang('icon_block_card'),
    href: '/style/icon-card',
    component: IconBlockCard,
  },
  {
    name: Strings.getLang('list_card'),
    href: '/style/list_card',
    component: ListCard,
  },
  {
    name: Strings.getLang('arrow_card'),
    href: '/style/arrow_card',
    component: ArrowCard,
  },
];
