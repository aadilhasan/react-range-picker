import React from 'react';
import {
  getActualDate,
  getTimesFromProvider,
  getIntDatesFromProvider
} from 'utils';

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
const minutes = getMinutes();

function PeriodPicker({ checked, onChange }) {
  return (
    <div className="switch-wrap">
      <label>
        <span className="period">AM</span>
        <span className="switch">
          <input
            value="PM"
            type="checkbox"
            onChange={onChange}
            checked={checked}
          />
          <span className="slider round" />
        </span>
        <span className="period">PM</span>
      </label>
    </div>
  );
}

function Options({ options, optionsFor, onClick }) {
  return (
    <React.Fragment>
      {options.map((option, index) => (
        <div className="option-wrap" key={index}>
          <button
            onClick={() => onClick(optionsFor, option)}
            className="option"
          >
            {option}
          </button>
        </div>
      ))}
    </React.Fragment>
  );
}

class TimePicker extends React.Component {
  visible = false;
  state = {
    hours: '12',
    minutes: '00',
    period: 'AM',
    showHours: true
  };

  componentWillReceiveProps({ visible, ...newState }) {
    if (visible) {
      this.setState({ ...newState });
    } else {
      setTimeout(() => {
        this.setState({
          hours: '12',
          minutes: '00',
          period: 'AM',
          showHours: true
        });
      }, 200);
    }
  }

  onChange = (type, val) => {
    const { onChange } = this.props;
    const { showHours } = this.state;
    this.setState(
      {
        [type]: val,
        showHours: !showHours
      },
      () => {
        let { hours, minutes, period } = this.state;
        onChange && onChange(hours, minutes, period);
        type === 'minutes' && this.onDone();
      }
    );
  };

  onPeriodChange = ({ target: { checked } }) => {
    this.setState({
      period: checked ? 'PM' : 'AM'
    });
  };

  onDone = () => {
    let { hours, minutes, period } = this.state;
    const { rangeTillEndOfDay, provider, onDone } = this.props;
    let { date1Time, date2Time } = getTimesFromProvider(
      provider,
      rangeTillEndOfDay
    );
    const { selectedDate1, selectedDate2 } = getIntDatesFromProvider(provider);
    const { lastSelectedDateIsFirst } = provider;

    if (selectedDate2) {
      date2Time = {
        hours,
        minutes,
        period
      };
    } else {
      date1Time = {
        hours,
        minutes,
        period
      };
    }

    if (lastSelectedDateIsFirst) {
      let temp = date1Time;
      date1Time = date2Time;
      date2Time = temp;
    }

    const startDate = getActualDate(selectedDate1, date1Time);
    const endDate = !!selectedDate2
      ? getActualDate(selectedDate2, date2Time)
      : void 0;
    provider.updateContext({
      startDate,
      endDate
    });

    if (onDone) {
      onDone(startDate, endDate);
    }
  };

  render() {
    const { visible } = this.props;
    const {
      showHours,
      hours: selectedHours,
      minutes: selectedMinutes,
      period
    } = this.state;

    return (
      <div
        className={`time-picker-container${visible ? ' visible' : ' hidden'}`}
      >
        <div className="time-picker">
          <button className="close-btn" onClick={this.onDone}>
            ×
          </button>
          <div className="selected">
            {' '}
            <span
            >{`${selectedHours} : ${selectedMinutes} ${period}`}</span>{' '}
            <PeriodPicker
              onChange={this.onPeriodChange}
              checked={period === 'PM'}
            />
          </div>
          {
            <div className="open">
              {' '}
              Select {showHours ? 'Hours' : 'Minutes'}{' '}
            </div>
          }
          {showHours ? (
            <div className="options">
              <Options
                options={hours}
                optionsFor="hours"
                onClick={this.onChange}
              />
            </div>
          ) : (
            <div className="options animate">
              <Options
                options={minutes}
                optionsFor="minutes"
                onClick={this.onChange}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TimePicker;
