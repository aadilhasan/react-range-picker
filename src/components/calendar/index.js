import React from 'react';

import {
  getNewMonthFrom,
  getCustomDateObject,
  getActualDate,
  noHandler,
  dateToInt
} from 'utils';

import { monthsFull, monthsShort } from 'const';

import Grids from '../grids';
import Navigator from '../navigator';
import MonthPicker from '../month-picker';
import YearPicker from '../year-picker';
import Footer from '../footer';
import TimePicker from '../time-picker';
import Context from '../context';

import {
  getDefaultValues,
  getMaxDate,
  getMinDate,
  handleDisableDates
} from './utils';

import './index.scss';

const ANIMATE_LEFT = 'move-left';
const ANIMATE_RIGHT = 'move-right';
const START_DATE_TIME = {
  hours: '12',
  minutes: '00',
  period: 'AM'
};
const END_DATE_TIME = {
  hours: '12',
  minutes: '00',
  period: 'AM'
};
const END_DATE_TIME_END_OF_DAY = {
  hours: '11',
  minutes: '59',
  period: 'PM'
};

class Calander extends React.Component {
  actualDate = new Date();
  actualIntDate = dateToInt(getCustomDateObject(this.actualDate));
  //flag to prevent month change when the month slide animation is still running
  is_animating = false;
  enable_range = false;
  minDate = null;
  maxDate = null;
  state = {
    date: new Date(this.actualDate),
    animationClass: '',
    showMonthPopup: false,
    showYearPopup: false,
    showTimePopup: false
  };

  componentDidMount() {
    const {
      defaultValue,
      disableRange,
      provider,
      minDate,
      maxDate
    } = this.props;
    let state = {};
    this.enable_range = disableRange !== true;

    /**
     * if start date or end date are not Date instance
     * getDefaultValues will log a warning so no need to handle that
     **/

    let startDate = getDefaultValues(
      defaultValue ? defaultValue.startDate : null
    );
    let endDate = getDefaultValues(defaultValue ? defaultValue.endDate : null);

    if (endDate && !startDate) {
      console.warn(
        ' defaultValue prop must have a startDate if there is an endDate '
      );
    } else if (startDate) {
      provider.updateContext({
        startDate,
        endDate
      });
      state = { date: startDate._date };
    }

    if (minDate instanceof Date) {
      this.minDate = new Date(minDate);

      /**
       * if current date is less then min, then show min date as first month
       * if start date is more then the min then show that as first month
       */

      let date = handleDisableDates(this.actualDate, this.minDate, null);

      state.date = startDate
        ? handleDisableDates(startDate._date, date, null)
        : date;
    }

    if (maxDate instanceof Date) {
      this.maxDate = new Date(maxDate);
    }

    this.setState({ ...this.state, ...state });
  }

  componentWillReceiveProps({ disableRange, isVisible }) {
    this.enable_range = disableRange !== true;
    if (!isVisible && this.props.isVisible !== isVisible) {
      // if calendar is hiding, make sure all the popup hide as well
      // so user dont see them next time when calendar is visible
      // using time-out with 300ms so hiding of popup transition is not visible to user when hide animation is running
      setTimeout(
        () =>
          this.setState({
            showMonthPopup: false,
            showYearPopup: false,
            showTimePopup: false
          }),
        300
      );
    }
  }

  onMonthChange = increment => {
    if (this.is_animating) return;
    if (increment === 1) {
      this.setState({
        animationClass: ANIMATE_RIGHT
      });
    } else {
      this.setState({
        animationClass: ANIMATE_LEFT
      });
    }
    this.is_animating = true;
    // added timeout of same time as animation, so after the animation is done we can remove the animation class
    setTimeout(() => {
      const { date } = this.state;
      date.setMonth(date.getMonth() + increment);
      this.setState(
        {
          animationClass: '',
          date: date
        },
        () => (this.is_animating = false)
      );
    }, 500);
  };

  onMonthSelect = () => {
    this.setState({
      showMonthPopup: true
    });
  };

  monthChanged = month => {
    const { date } = this.state;
    date.setMonth(month);
    let updatedDate = handleDisableDates(date, this.minDate, this.maxDate);
    this.setState({
      date: updatedDate,
      showMonthPopup: false
    });
  };

  onYearSelect = () => {
    this.setState({
      showYearPopup: true
    });
  };

  yearChanged = year => {
    const { date } = this.state;
    date.setFullYear(year);
    let updatedDate = handleDisableDates(date, this.minDate, this.maxDate);
    this.setState({
      date: updatedDate,
      showYearPopup: false
    });
  };

  onDateSelect = date => {
    const {
      onDateSelected = noHandler(),
      selectTime,
      provider,
      rangeTillEndOfDay,
      onClose,
      closeOnSelect
    } = this.props;
    const { showTimePopup } = this.state;
    const { date1Time, date2Time } = getTimes(provider, rangeTillEndOfDay);
    const { selectedDate1, selectedDate2 } = getIntDates(provider);
    const newState = {
      selectedDate1,
      selectedDate2
    };

    if (!this.enable_range && !!date) {
      this.setState({
        showTimePopup: !!selectTime ? true : showTimePopup
      });
      provider.updateContext({
        startDate: getActualDate(date, date1Time)
      });
      onDateSelected(getActualDate(date, date1Time));
      !selectTime && closeOnSelect && onClose();
      return;
    }

    if (!selectedDate1) {
      newState.selectedDate1 = date;
      newState.selectedDate2 = null;
    } else if (!!selectedDate1 && !selectedDate2) {
      // make sure selectedDate1 is always smaller then selectedDate2
      if (date < selectedDate1) {
        newState.selectedDate1 = date;
        newState.selectedDate2 = selectedDate1;
      } else {
        newState.selectedDate2 = date;
      }
    } else if (!!selectedDate1 && !!selectedDate2) {
      newState.selectedDate1 = date;
      newState.selectedDate2 = null;
    }

    const d1 = newState.selectedDate1,
      d2 = newState.selectedDate2;

    newState.date2Time =
      d1 === d2 ? { ...END_DATE_TIME_END_OF_DAY } : date2Time;

    this.setState(newState);
    const _startDate = getActualDate(d1, date1Time);
    const _endDate = getActualDate(d2, date2Time);

    provider.updateContext({
      startDate: _startDate,
      endDate: _endDate
    });

    onDateSelected(_startDate, _endDate);
    if (!!selectTime) {
      this.showTime();
    } else if (!selectTime && d2) {
      closeOnSelect && onClose();
    }
  };

  selectToday = () => {
    // return if cards are animating
    if (this.is_animating === true) return;

    const { date } = this.state;
    const {
      selectTime,
      onDateSelected,
      provider,
      onClose,
      closeOnSelect
    } = this.props;
    const savedDate = getCustomDateObject(date);
    const currentDate = getCustomDateObject(new Date(this.actualDate));

    if (date === this.actualIntDate) {
      this.onDateSelect();
    }

    const goingBack =
      currentDate.year < savedDate.year ||
      (currentDate.year === savedDate.year &&
        currentDate.month < savedDate.month)
        ? true
        : false;
    if (goingBack) {
      this.setState({
        animationClass: ANIMATE_LEFT
      });
    } else if (currentDate.month > savedDate.month) {
      this.setState({
        animationClass: ANIMATE_RIGHT
      });
    }

    const fDate = getActualDate(this.actualIntDate, { ...START_DATE_TIME });
    const lDate = this.enable_range
      ? getActualDate(this.actualIntDate, {
          ...END_DATE_TIME_END_OF_DAY
        })
      : null;
    provider.updateContext({
      startDate: fDate,
      endDate: lDate
    });

    if (onDateSelected) {
      onDateSelected(fDate, lDate);
      closeOnSelect && onClose();
    }

    // added timeout of same time as animation, so after the animation is done we can remove the animation class
    setTimeout(() => {
      this.setState(
        {
          animationClass: '',
          date: new Date(this.actualDate)
        },
        () => {
          this.is_animating = false;
          if (!this.enable_range && !!selectTime) {
            // this.showTime();
          }
        }
      );
    }, 500);
  };

  showTime = () => {
    this.setState({
      showTimePopup: true
    });
  };

  closeTime = () => {
    this.setState({
      showTimePopup: false
    });
  };

  onTimeSelected = (hours, minutes, period) => {
    const {
      onDateSelected,
      rangeTillEndOfDay,
      provider,
      closeOnSelect,
      onClose
    } = this.props;
    let { date1Time, date2Time } = getTimes(provider, rangeTillEndOfDay);
    const { selectedDate1, selectedDate2 } = getIntDates(provider);

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
      date2Time = !!rangeTillEndOfDay
        ? { ...END_DATE_TIME_END_OF_DAY }
        : { ...END_DATE_TIME };
    }
    this.setState({
      showTimePopup: false
    });
    const _startDate = getActualDate(selectedDate1, date1Time);
    const _endDate = !!selectedDate2
      ? getActualDate(selectedDate2, date2Time)
      : void 0;
    provider.updateContext({
      startDate: _startDate,
      endDate: _endDate
    });
    onDateSelected(_startDate, _endDate);
    if (closeOnSelect && this.enable_range && _endDate) {
      onClose();
    } else if (closeOnSelect && !this.enable_range) {
      onClose();
    }
  };

  render() {
    const {
      date,
      animationClass,
      showMonthPopup,
      showYearPopup,
      showTimePopup
    } = this.state;
    const {
      onClose = noHandler(),
      footer,
      selectTime,
      minDate: minFullDate,
      maxDate: maxFullDate
    } = this.props;
    const prevMonth = getNewMonthFrom(date, -1);
    const nextMonth = getNewMonthFrom(date, 1);
    const currentMonth = getNewMonthFrom(date, 0);
    const selectedMonth = getCustomDateObject(date);
    const { month, year } = selectedMonth;
    const _minDate = getMinDate(minFullDate, selectedMonth);
    const _maxDate = getMaxDate(maxFullDate, selectedMonth);
    const { month: minMonth, year: minYear } = _minDate;
    const { month: maxMonth, year: maxYear } = _maxDate;
    return (
      <div className="full-date-picker-container">
        <div>
          <div className="date-picker">
            <MonthPicker
              months={monthsShort}
              selected={month}
              visible={showMonthPopup}
              onChange={this.monthChanged}
              min={minMonth}
              max={maxMonth}
            />
            <YearPicker
              year={year}
              visible={showYearPopup}
              onChange={this.yearChanged}
              min={minYear}
              max={maxYear}
            />
            <TimePicker visible={showTimePopup} onDone={this.onTimeSelected} />
            <Navigator
              monthName={monthsFull[month]}
              month={month}
              year={year}
              onMonthChange={this.onMonthChange}
              onSelectMonth={this.onMonthSelect}
              onSelectYear={this.onYearSelect}
              min={_minDate}
              max={_maxDate}
            />
            <Grids
              prevMonth={prevMonth}
              currentMonth={currentMonth}
              nextMonth={nextMonth}
              animationClass={animationClass}
              onDateSelect={this.onDateSelect}
              rangeEnabled={this.enable_range}
              min={_minDate}
              max={_maxDate}
            />
          </div>
          <Footer
            customFooter={footer}
            onToday={this.selectToday}
            onClose={onClose}
            showTime={!!selectTime}
          />
        </div>
      </div>
    );
  }
}

function getIntDates(provider) {
  return {
    selectedDate1: provider.startDate ? provider.startDate._intDate : '',
    selectedDate2: provider.endDate ? provider.endDate._intDate : ''
  };
}

function getTimes(provider, rangeTillEndOfDay) {
  const { startDate, endDate } = provider;
  let date1Time = { ...START_DATE_TIME };
  let date2Time = rangeTillEndOfDay
    ? { ...END_DATE_TIME_END_OF_DAY }
    : { ...END_DATE_TIME };
  if (startDate && startDate.customObject) {
    const { hours, minutes, period } = startDate.customObject;
    date1Time = { hours, minutes, period };
  }
  if (endDate && endDate.customObject) {
    const { hours, minutes, period } = endDate.customObject;
    date2Time = { hours, minutes, period };
  }
  return {
    date1Time,
    date2Time
  };
}

export default function(props) {
  return (
    <Context.Consumer>
      {provider => <Calander {...props} provider={provider} />}
    </Context.Consumer>
  );
}
