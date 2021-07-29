import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Utils } from 'tuya-panel-utils';
import { Carousel } from 'tuya-panel-kit';
import IconBackground from 'tuya-panel-icon-background';
import { NordicDefaultProps, AcrylicDefaultProps } from './theme';
import { defaultProps, IEnumCardProps } from './interface';

const MAX_PAGE_COUNT = 4;

const { convertX: cx } = Utils.RatioUtils;
const EnumCard: React.FC<IEnumCardProps> = ({
  list = [],
  width,
  style, // content容器 样式  优先级最高
  textStyle, // 枚举项里面文字样式 优先级最高
  titleStyle, // 标题的样式 优先级最高
  padding,
  // icon属性
  iconColor,
  activeIconColor,
  iconSize,
  // icon bg属性
  iconBgColor,
  activeIconBgColor,
  iconBgSize,
  iconBgRadius,
  showIconBg,
  // 每项文字属性
  showText,
  textColor,
  activeTextColor,
  textFontSize,
  // title属性
  title,
  showTitle,
  titleFontSize,
  titleColor,
  // 背景属性
  backgroundColor,
  radius,
  // 轮播原点属性
  dotSize,
  dotColor,
  activeDotColor,
  // 选中的key 传了就是受控组件
  activeKey,
  defaultActiveKey,
  contentStyle,
}) => {
  const [_activeKey, _setActiveKey] = useState(activeKey || defaultActiveKey || '');
  const [defaultPageIndex, setDefaultPageIndex] = useState(() => {
    if (list.length <= MAX_PAGE_COUNT) return 0;
    let index = 0;
    for (let i = 0; i < list.length; i++) {
      const data = list[i];
      if (data.key === _activeKey) {
        index = Math.floor(i / MAX_PAGE_COUNT);
        return index;
      }
    }
    return index;
  });

  useEffect(() => {
    if (activeKey) {
      _setActiveKey(activeKey);
    }
  }, [activeKey]);

  const renderPageCard = () => {
    const pageCount = Math.ceil(list.length / MAX_PAGE_COUNT);
    const ret = [];
    const isCarousel = list.length > MAX_PAGE_COUNT;

    for (let i = 0; i < pageCount; i++) {
      const startIndex = i * MAX_PAGE_COUNT;
      let endIndex = startIndex + MAX_PAGE_COUNT - 1;
      endIndex = endIndex >= list.length ? list.length - 1 : endIndex;
      const contentView = (
        <View style={[{ paddingBottom: isCarousel ? 20 : 0 }, styles.pageBox]} key={i}>
          {renderItem(startIndex, endIndex)}
        </View>
      );
      ret.push(contentView);
    }

    return ret;
  };

  const handClick = (key: string) => {
    if (!activeKey) {
      _setActiveKey(key);
    }
  };

  const renderItem = (startIndex, endIndex) => {
    const ret = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const data = list[i];
      const realIconColor = data.key === _activeKey ? activeIconColor : iconColor;
      const realIconBgColor = data.key === _activeKey ? activeIconBgColor : iconBgColor;
      const realTextColor = data.key === _activeKey ? activeTextColor : textColor;
      const item = (
        <TouchableOpacity
          style={styles.itemBox}
          key={i}
          activeOpacity={0.8}
          onPress={() => handClick(data.key)}
        >
          <IconBackground
            icon={data.isImage ? '' : data.icon}
            image={data.icon}
            iconSize={iconSize}
            iconBgSize={iconBgSize}
            iconColor={realIconColor}
            iconBgColor={realIconBgColor}
            iconBgRadius={iconBgRadius}
            showIconBg={showIconBg}
          />
          {data.label && showText && (
            <Text
              style={[{ color: realTextColor, fontSize: textFontSize }, styles.itemText, textStyle]}
            >
              {data.label}
            </Text>
          )}
        </TouchableOpacity>
      );
      ret.push(item);
    }
    return ret;
  };

  return (
    <View
      style={[
        {
          paddingTop: padding[0],
          paddingRight: padding[1],
          paddingBottom: padding[2],
          paddingLeft: padding[3],
          backgroundColor,
          borderRadius: radius,
          width,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {showTitle && Boolean(title) && (
        <View>
          <Text style={[{ fontSize: titleFontSize, color: titleColor }, titleStyle]}>{title}</Text>
        </View>
      )}
      <View style={[styles.contentBox, contentStyle]}>
        {list.length > MAX_PAGE_COUNT ? (
          <Carousel
            selectedIndex={defaultPageIndex}
            dotWrapperStyle={{
              bottom: -10,
            }}
            dotStyle={{
              backgroundColor: dotColor,
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize,
            }}
            dotActiveStyle={{ backgroundColor: activeDotColor }}
          >
            {renderPageCard()}
          </Carousel>
        ) : (
          <View style={[styles.pageBox, { justifyContent: 'space-between' }]}>
            {renderItem(0, list.length - 1)}
          </View>
        )}
      </View>
    </View>
  );
};

EnumCard.defaultProps = defaultProps;

const styles = StyleSheet.create({
  contentBox: {
    flex: 1,
    marginTop: cx(12),
  },
  itemBox: {
    alignItems: 'center',
    display: 'flex',
    flex: 1 / MAX_PAGE_COUNT,
  },
  itemText: {
    marginTop: 8,
  },
  pageBox: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export const ClassicEnumCard = props => <EnumCard {...props} />;

export const NordicEnumCard = props => <EnumCard {...props} {...NordicDefaultProps} />;

export const AcrylicEnumCard = props => <EnumCard {...props} {...AcrylicDefaultProps} />;
