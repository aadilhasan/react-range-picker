import React from 'react';
import Picker from './picker';
import './index.scss';

const getMinutes = () => {
  let i = 0,
    limit = 60,
    minutes = [];
  for (i; i < limit; i += 1) {
    minutes.push(i < 10 ? '0' + i : '' + i);
  }
  return minutes;
};

class TimePicker extends React.Component {
  hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  minutes = getMinutes();
  period = ['AM', 'PM'];

  temp_state = {
    hours: 12,
    minutes: 0,
    period: 'AM'
  };

  onChange = (type, val) => {
    const { onChange } = this.props;
    this.temp_state[type] = val;
    if (onChange) {
      let { hours, minutes, period } = this.temp_state;
      if (period === 'PM') {
        hours = hours < 12 ? hours + 12 : hours;
      } else {
        hours = hours === 12 ? 0 : hours;
      }
      onChange(hours, minutes);
    }
  };

  onDone = () => {
    const { onDone } = this.props;
    if (onDone) {
      let { hours, minutes, period } = this.temp_state;
      if (period === 'PM') {
        hours += hours < 12 ? 12 : hours;
      } else {
        hours += hours === 12 ? 0 : hours;
      }
      onDone(hours, minutes);
    }
  };

  render() {
    const { visible } = this.props;
    return (
      <div
        className={`date-picker-container${!!visible ? ' visible' : ' hidden'}`}
        onClick={this.onDone}
      >
        <div className="date-picker" onClick={e => e.stopPropagation()}>
          <Picker onChange={this.onChange} values={this.hours} label="hours" />
          <Picker
            onChange={this.onChange}
            values={this.minutes}
            label="minutes"
          />
          <Picker
            onChange={this.onChange}
            values={this.period}
            label="period"
          />
          <div className="done">
            <button onClick={this.onDone}> Done </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TimePicker;
