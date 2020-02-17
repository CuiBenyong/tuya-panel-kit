/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Motion from '../motion/index';

export const MOTION_TYPES = Object.keys(Motion)
  .concat('none')
  .filter(v => {
    return v !== 'Toast';
  });

const withMotion = WrapperComponent => {
  const wrapperName = WrapperComponent.displayName || WrapperComponent.name;
  class EnhancedComponent extends React.Component {
    static displayName = `withMotion(${wrapperName})`;
    static propTypes = {
      ...WrapperComponent.propTypes,
      motionType: PropTypes.oneOf(MOTION_TYPES),
      motionConfig: PropTypes.object,
    };

    static defaultProps = {
      ...WrapperComponent.defaultProps,
      motionType: 'none',
      motionConfig: {
        initScale: 0.5,
      },
    };

    constructor(props) {
      super(props);
      const { motionType } = props;
      if (MOTION_TYPES.indexOf(motionType) === -1) {
        console.error(
          `withMotion: motion type must be one of ${JSON.stringify(
            MOTION_TYPES
          )}, but receive ${motionType}`
        );
        return View;
      }
      this.state = {
        show: true,
      };
    }

    _handleHide = () => {
      typeof this.actionFn === 'function' && this.actionFn();
    };

    _handleCancel = () => {
      const { onCancel } = this.props;
      this.setState({ show: false });
      this.actionFn = () => typeof onCancel === 'function' && onCancel();
    };

    _handleConfirm = value => {
      const { onConfirm } = this.props;
      this.setState({ show: false });
      this.actionFn = () => typeof onConfirm === 'function' && onConfirm(value);
    };

    render() {
      const { motionType, motionConfig } = this.props;
      if (motionType === 'none') {
        return <WrapperComponent {...this.props} />;
      }
      const MotionComp = Motion[motionType];
      return (
        <MotionComp {...motionConfig} show={this.state.show} onHide={this._handleHide}>
          <WrapperComponent
            {...this.props}
            onCancel={this._handleCancel}
            onConfirm={this._handleConfirm}
          />
        </MotionComp>
      );
    }
  }
  return hoistNonReactStatics(EnhancedComponent, WrapperComponent);
};

export default withMotion;
