import React from 'react';

class ControlledUpdate extends React.Component {
  shouldComponentUpdate({ shouldUpdate }) {
    return shouldUpdate;
  }
  render() {
    return this.props.children;
  }
}

export default ControlledUpdate;
