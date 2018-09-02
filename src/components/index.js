import React from 'react';

import { getNewMonthFrom, getCustomDateObject, monthsFull } from 'utils';

import Grids from './grids';
import Navigator from './navigator';
import './index.scss';

const ANIMATE_LEFT = 'move-left';
const ANIMATE_RIGHT = 'move-right';

class DatePicker extends React.Component {
  actualDate = new Date();
  //flag to prevent month change when the month slide animation is still running
  is_animating = false;
  state = {
    date: new Date(this.actualDate),
    animationClass: '',
    selectedDate1: null,
    selectedDate2: null
  };

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

  onDateSelect = date => {
    const { selectedDate1, selectedDate2 } = this.state;
    const newState = {};
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
  };

  render() {
    const { date, animationClass, selectedDate1, selectedDate2 } = this.state;
    const prevMonth = getNewMonthFrom(date, -1);
    const nextMonth = getNewMonthFrom(date, 1);
    const currentMonth = getNewMonthFrom(date, 0);
    const { month, year } = getCustomDateObject(date);
    return (
      <div className="date-picker">
        <Navigator
          month={monthsFull[month]}
          year={year}
          onMonthChange={this.onMonthChange}
        />
        <Grids
          prevMonth={prevMonth}
          currentMonth={currentMonth}
          nextMonth={nextMonth}
          animationClass={animationClass}
          onDateSelect={this.onDateSelect}
          selectedDate1={selectedDate1}
          selectedDate2={selectedDate2}
        />
      </div>
    );
  }
}

export default DatePicker;
