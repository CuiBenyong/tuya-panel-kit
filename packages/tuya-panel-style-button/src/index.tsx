import React from 'react';
import { Utils } from 'tuya-panel-utils';
import { IButtonProps, IDefaultProps } from './interface';
import {
  StyledTouchableOpacity,
  StyledView,
  StyledText,
  StyledIconFont,
  StyleBlurView,
  StyledContentView,
} from './styled';

const { ThemeConsumer } = Utils.ThemeUtils;
const { isIos } = Utils.RatioUtils;

const StyleButton: React.FC<IButtonProps> = ({
  disabled,
  d,
  iconColor,
  text,
  onPress,
  onLongPress,
  theme: themeProps,
  children,
  isSupportAcrylic,
  blurAmount,
  blurType,
  milliseconds,
}) => {
  let timer;

  const _handlePressIn = () => {
    if (typeof onLongPress === 'function') {
      onLongPress && onLongPress();
      timer && clearInterval(timer);
      timer = setInterval(() => {
        onLongPress && onLongPress();
      }, milliseconds);
    }
  };

  const _handlePressOut = () => {
    timer && clearInterval(timer);
  };

  return (
    <ThemeConsumer>
      {globalTheme => {
        const theme = {
          ...globalTheme,
          styleButton: { ...globalTheme.styleButton, ...themeProps },
        };
        console.log(globalTheme, 'globalTheme');
        return (
          <StyledTouchableOpacity
            disabled={disabled}
            theme={theme}
            onPress={onPress}
            onPressIn={_handlePressIn}
            onPressOut={_handlePressOut}
            activeOpacity={isSupportAcrylic && !isIos ? 1 : 0.8}
          >
            {React.isValidElement(children) && children}
            {!React.isValidElement(children) && d && (
              <StyledContentView>
                <StyledView theme={theme}>
                  <StyledIconFont d={d} color={iconColor} theme={theme} />
                </StyledView>
                {isSupportAcrylic && (
                  <StyleBlurView
                    theme={theme}
                    blurType={blurType}
                    blurAmount={blurAmount}
                    overlayColor="transparent"
                  />
                )}
              </StyledContentView>
            )}
            {!React.isValidElement(children) && text && (
              <StyledText weight="400" theme={theme}>
                {text}
              </StyledText>
            )}
          </StyledTouchableOpacity>
        );
      }}
    </ThemeConsumer>
  );
};

StyleButton.defaultProps = IDefaultProps;

export default StyleButton;
