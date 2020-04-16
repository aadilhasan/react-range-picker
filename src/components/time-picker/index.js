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

function Option({ text, disabled, onClick }) {
  return (
    <div className="option-wrap">
      <button onClick={onClick} className="option" disabled={disabled}>
        {text}
      </button>
    </div>
  );
}

function Minutes({ options, optionsFor, onClick, min, max }) {
  return (
    <React.Fragment>
      {options.map((option, index) => {
        let disabled = index < min || index > max;
        return (
          <Option
            key={index}
            text={option}
            onClick={() => onClick(optionsFor, option)}
            disabled={disabled}
          />
        );
      })}
    </React.Fragment>
  );
}

function Hours({ options, optionsFor, onClick, period, min, max }) {
  let plusHour = period === 'AM' ? 0 : 12;
  return (
    <React.Fragment>
      {options.map((option, index) => {
        let disabled = index + plusHour < min || index + plusHour > max;
        return (
          <Option
            key={index}
            text={option}
            onClick={() => onClick(optionsFor, option)}
            disabled={disabled}
          />
        );
      })}
    </React.Fragment>
  );
}

class TimePicker extends React.Component {
  visible = false;
  selectedTime = {};
  state = {
    hours: '12',
    minutes: '00',
    period: 'AM',
    showHours: true
  };

  componentWillReceiveProps({
    visible,
    disableProps,
    rangeTillEndOfDay,
    provider,
    ...newState
  }) {
    if (visible) {
      console.log(' timepicker disableProps ', disableProps);
      let { date1Time, date2Time } = getTimesFromProvider(
        provider,
        rangeTillEndOfDay
      );
      const { selectedDate2 } = getIntDatesFromProvider(provider);
      const { lastSelectedDateIsFirst } = provider;
      debugger;
      let time =
        lastSelectedDateIsFirst || !selectedDate2 ? date1Time : date2Time;
      this.selectedTime = time;
      this.setState({ ...newState, ...time });
    } else {
      this.selectedTime = {};
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
    // if hours has been picked and then on change of period, reset to default
    // as it might lead to selection of a disabled date

    if (!this.state.showHours) {
      this.setState({
        ...this.selectedTime,
        showHours: true,
        period: checked ? 'PM' : 'AM'
      });
      return;
    }
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

    // if second selected date is the startDate (if it is smaller than first selected date)
    // then second selected time should go with the startDate (second selected date), so swap the dates
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
    const { visible, disableProps } = this.props;
    const {
      showHours,
      hours: selectedHours,
      minutes: selectedMinutes,
      period
    } = this.state;

    const { minDate, maxDate, disableMin, disableMax } = disableProps;
    let minHours = -1,
      minMinutes = -1,
      maxHours = Infinity,
      maxMinutes = Infinity;

    if (disableMin) {
      let _minHours =
        minDate.time.period === 'AM' && minDate.time.hours == 12
          ? 0
          : minDate.time.hours;
      minHours = minDate.time.period === 'AM' ? _minHours : _minHours + 12;
      minMinutes =
        period === minDate.time.period && selectedHours == _minHours
          ? minDate.time.minutes
          : -1;
    }

    if (disableMax) {
      let _maxHours =
        maxDate.time.period === 'AM' && maxDate.time.hours == 12
          ? 0
          : maxDate.time.hours;
      maxHours = maxDate.time.period === 'AM' ? _maxHours : _maxHours + 12;
      maxMinutes =
        period === maxDate.time.period && selectedHours == _maxHours
          ? maxDate.time.minutes
          : Infinity;
    }

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
              <Hours
                options={hours}
                optionsFor="hours"
                onClick={this.onChange}
                disable={disableProps}
                min={minHours}
                max={maxHours}
                period={period}
              />
            </div>
          ) : (
            <div className="options animate">
              <Minutes
                options={minutes}
                optionsFor="minutes"
                onClick={this.onChange}
                min={minMinutes}
                max={maxMinutes}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TimePicker;
