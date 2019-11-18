import React from 'react';
import Picker from './picker';
import './index.scss';


const minutes = [...Array(60).keys()].map(minute => minute.toString().padStart(2, "0"));
const hours = [
  '12',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11'
];
const period = ['AM', 'PM'];

class TimePicker extends React.Component {
  visible = false;
  temp_state = {
    hours: '12',
    minutes: '00',
    period: 'AM'
  };

  onChange = (type, val) => {
    const { onChange } = this.props;
    this.temp_state[type] = val;
    if (onChange) {
      let { hours, minutes, period } = this.temp_state;
      onChange(hours, minutes, period);
    }
  };

  onDone = () => {
    const { onDone } = this.props;
    if (onDone) {
      let { hours, minutes, period } = this.temp_state;
      onDone(hours, minutes, period);
    }
  };

  render() {
    const { visible } = this.props;
    if (!!visible && visible !== this.visible) {
      this.temp_state = {
        hours: '12',
        minutes: '00',
        period: 'AM'
      };
    }
    this.visible = visible;
    return (
      <div
        className={`time-picker-container${!!visible ? ' visible' : ' hidden'}`}
        onClick={this.onDone}
      >
        <div className="time-picker" onClick={e => e.stopPropagation()}>
          <div key={visible}>
            <Picker onChange={this.onChange} values={hours} label="hours" />
            <Picker onChange={this.onChange} values={minutes} label="minutes" />
            <Picker onChange={this.onChange} values={period} label="period" />
            <div className="done">
              <button onClick={this.onDone}> Done </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimePicker;
