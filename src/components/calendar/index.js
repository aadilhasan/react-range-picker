import React from 'react';

import {
  getNewMonthFrom,
  getCustomDateObject,
  monthsFull,
  monthsShort,
  getActualDate,
  noHandler,
  dateToInt
} from 'utils';

import Grids from '../grids';
import Navigator from '../navigator';
import MonthPicker from '../month-picker';
import YearPicker from '../year-picker';
import Footer from '../footer';
import TimePicker from '../time-picker';
import './index.scss';

const ANIMATE_LEFT = 'move-left';
const ANIMATE_RIGHT = 'move-right';
const START_DATE_TIME = {
  hours: 12,
  minutes: 0,
  period: 'AM'
};
const END_DATE_TIME = {
  hours: 12,
  minutes: 0,
  period: 'AM'
};
const END_DATE_TIME_END_OF_DAY = {
  hours: 11,
  minutes: 59,
  period: 'PM'
};

class Calander extends React.Component {
  actualDate = new Date();
  actualIntDate = dateToInt(getCustomDateObject(this.actualDate));
  //flag to prevent month change when the month slide animation is still running
  is_animating = false;
  enable_range = false;
  state = {
    date: new Date(this.actualDate),
    animationClass: '',
    selectedDate1: null,
    selectedDate2: null,
    date1Time: { ...START_DATE_TIME },
    date2Time: !!this.props.rangeTillEndOfDay
      ? { ...END_DATE_TIME_END_OF_DAY }
      : { ...END_DATE_TIME },
    showMonthPopup: false,
    showYearPopup: false,
    showTimePopup: false
  };

  componentDidMount() {
    this.enable_range = !!this.props.enableRange;
  }

  componentWillReceiveProps({ enableRange, isVisible }) {
    this.enable_range = !!enableRange;
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

  monthChanged = (month, monthIndex) => {
    const { date } = this.state;
    date.setMonth(monthIndex);
    this.setState({
      date,
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
    this.setState({
      date,
      showYearPopup: false
    });
  };

  onDateSelect = date => {
    const {
      selectedDate1,
      selectedDate2,
      date1Time,
      date2Time,
      showTimePopup
    } = this.state;
    const { onDateSelected = noHandler(), selectTime } = this.props;
    const newState = {
      selectedDate1,
      selectedDate2
    };

    if (!this.enable_range && !!date) {
      this.setState({
        selectedDate1: date,
        showTimePopup: !!selectTime ? true : showTimePopup
      });
      onDateSelected(getActualDate(date, date1Time));
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
    this.setState(newState);
    const d1 = newState.selectedDate1,
      d2 = newState.selectedDate2;

    onDateSelected(getActualDate(d1, date1Time), getActualDate(d2, date2Time));

    if (!!selectTime) {
      this.showTime();
    }
  };

  selectToday = () => {
    // return if cards are animating
    if (this.is_animating === true) return;

    const { date } = this.state;
    const { selectTime } = this.props;
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
    // added timeout of same time as animation, so after the animation is done we can remove the animation class
    setTimeout(() => {
      this.setState(
        {
          animationClass: '',
          selectedDate1: this.actualIntDate,
          selectedDate2: this.actualIntDate,
          date: new Date(this.actualDate)
        },
        () => {
          this.is_animating = false;
          if (!!selectTime) {
            this.showTime();
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
    let { selectedDate1, selectedDate2, date1Time, date2Time } = this.state;
    const { onDateSelected, rangeTillEndOfDay } = this.props;
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
      showTimePopup: false,
      date1Time,
      date2Time
    });
    onDateSelected(
      getActualDate(selectedDate1, date1Time),
      !!selectedDate2 ? getActualDate(selectedDate2, date2Time) : void 0
    );
  };

  render() {
    const {
      date,
      animationClass,
      selectedDate1,
      selectedDate2,
      date1Time,
      date2Time,
      showMonthPopup,
      showYearPopup,
      showTimePopup
    } = this.state;
    const { onOk = noHandler(), footer, selectTime } = this.props;
    const prevMonth = getNewMonthFrom(date, -1);
    const nextMonth = getNewMonthFrom(date, 1);
    const currentMonth = getNewMonthFrom(date, 0);
    const { month, year } = getCustomDateObject(date);
    const firstDateObj = getActualDate(selectedDate1, date1Time);
    const secondDateObj = getActualDate(selectedDate2, date2Time);
    return (
      <div className="full-date-picker-container">
        <div>
          <div className="date-picker">
            <MonthPicker
              months={monthsShort}
              selected={month}
              visible={showMonthPopup}
              onChange={this.monthChanged}
            />
            <YearPicker
              year={year}
              visible={showYearPopup}
              onChange={this.yearChanged}
            />
            <TimePicker visible={showTimePopup} onDone={this.onTimeSelected} />
            <Navigator
              month={monthsFull[month]}
              year={year}
              onMonthChange={this.onMonthChange}
              onSelectMonth={this.onMonthSelect}
              onSelectYear={this.onYearSelect}
            />
            <Grids
              prevMonth={prevMonth}
              currentMonth={currentMonth}
              nextMonth={nextMonth}
              animationClass={animationClass}
              onDateSelect={this.onDateSelect}
              selectedDate1={selectedDate1}
              selectedDate2={selectedDate2}
              rangeEnabled={this.enable_range}
            />
          </div>
          {!!footer && footer.type ? (
            <footer.type
              {...footer.props}
              onToday={this.selectToday}
              startDate={firstDateObj}
              endDate={secondDateObj}
              onOk={onOk}
            />
          ) : (
            <Footer
              onToday={this.selectToday}
              startDate={firstDateObj}
              endDate={secondDateObj}
              onOk={onOk}
              showTime={!!selectTime}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Calander;
