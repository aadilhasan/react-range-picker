import React from 'react';
import './styles.scss';

export default class Slider extends React.PureComponent {
  state = {
    isAnimating: false
  };
  componentWillReceiveProps({ visible }) {
    // make sure we set animation variable only if it was already visible and now it is about to hide
    // else isAnimating will be true on mount as visible will be false
    this.props.visible && !visible && this.setState({ isAnimating: true });
  }

  onTransitionEnd = () => {
    this.setState({ isAnimating: false });
  };

  render() {
    const {
      visible,
      className,
      slideFrom = 'top',
      unmountChildren = true,
      children
    } = this.props;

    const renderChildren = unmountChildren
      ? visible || (!visible && this.state.isAnimating)
      : true;

    return (
      <div
        className={`slider${visible ? ' visible' : ' hidden'}${' ' +
          slideFrom}`}
      >
        <div
          onTransitionEnd={this.onTransitionEnd}
          className={`content${className ? ' ' + className : ''}`}
        >
          {renderChildren && children}
        </div>
      </div>
    );
  }
}
