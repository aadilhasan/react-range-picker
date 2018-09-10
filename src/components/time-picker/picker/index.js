import React from 'react';
import './index.scss';

class Picker extends React.Component {
  state = {
    selected: 0,
    data: []
  };
  componentDidMount() {
    this.setState({
      data: this.props.values || []
    });
  }
  componentWillReceiveProps({ values }) {
    this.setState({
      data: values
    });
  }

  onChange = (incrementBy, e) => {
    e.stopPropagation();
    let { selected, data } = this.state;
    const { onChange, label = '' } = this.props;
    const len = data.length - 1;
    selected += incrementBy;
    if (selected < 0) {
      selected = len;
    } else if (selected > len) {
      selected = 0;
    }
    this.setState({
      selected
    });
    if (onChange) {
      onChange(label, data[selected]);
    }
  };

  render() {
    const { editable = false } = this.props;
    const { selected, data } = this.state;

    return (
      <div className="picker">
        <div className="arrow-wrapper" onClick={e => this.onChange(-1, e)}>
          <div className="arrow up"> </div>
        </div>
        {editable ? (
          <input className="value" value={data[selected]} />
        ) : (
          <div className="value"> {data[selected]} </div>
        )}
        <div className="arrow-wrapper" onClick={e => this.onChange(1, e)}>
          <div className="arrow down"> </div>
        </div>
      </div>
    );
  }
}

export default Picker;
