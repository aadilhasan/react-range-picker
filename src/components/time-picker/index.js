import React from 'react';
import Picker from './picker';

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
  timeType = ['AM', 'PM'];

  render() {
    return (
      <div>
        <Picker values={this.hours} />
        <Picker values={this.minutes} />
        <Picker values={this.timeType} />
      </div>
    );
  }
}

export default TimePicker;
