import React, { Component } from 'react';
import { getDaysArray, getDays, getCustomDateObject } from 'utils';
import DaysNames from './days-names';
import Day from './day';

import './index.scss';

class DateGrid extends Component {
  actualDate = new Date();
  state = { selected: null, selected2: null, hovered: null };
  onDateSelect = date => {
    const { onDateSelect } = this.props;
    const { selected } = this.state;
    const newState = !selected ? { selected: date } : { selected2: date };
    this.setState(newState, () => onDateSelect && onDateSelect(date));
  };
  onHover = date => {
    if (!this.state.selected) return;
    this.setState({
      hovered: date
    });
  };

  offHover = () => {
    if (!this.state.selected || !this.state.hovered) return;
    this.setState({
      hovered: null
    });
  };

  dateToInt = date => {
    // make sure both month and day starts with 0 if single digit;
    const month = date.month < 10 ? '0' + date.month : date.month;
    const day = date.date < 10 ? '0' + date.date : date.date;
    return parseInt('' + date.year + month + day);
  };

  hasSameMonthAndYear = (date1, date2) => {
    return (
      !!date1 &&
      !!date2 &&
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  };
  isDateInRange = (date, month, year, selected, selected2) => {
    if (!selected && !selected2) false;

    const y = year >= selected.year && year <= selected2.year;
    const m = month >= selected.month && month <= selected2.month;
    const d = date > selected.date && date < selected2.date;
    if (!y && !m && !d) return false;
    return {
      y,
      m,
      d
    };
  };

  getRemainingPrevMonthDays = ({ month, year, day }) => {
    // if first day of month is not sunday then make sure you append undefined values before actual days so that,
    // month starts from its exact day of week, else it will always start from sunday
    const daysArray = [];
    if (day > 0) {
      const prevMonthDays = getDays(month, year);
      let i = 1;
      for (i; i <= day; i += 1) {
        daysArray.push(prevMonthDays - day + i);
      }
    }
    return daysArray;
  };

  render() {
    const { date, selectedDate1, selectedDate2 } = this.props;
    const { hovered } = this.state;
    const selected = selectedDate1;
    const selected2 = selectedDate2;
    let tempDate = date;
    if (!tempDate) {
      tempDate = new Date();
    }
    const dateObj = getCustomDateObject(tempDate);
    const { month, year } = dateObj;
    const actualDate = this.dateToInt(getCustomDateObject(this.actualDate));
    const days = getDaysArray(dateObj);
    const prevMonthDays = this.getRemainingPrevMonthDays(dateObj);
    const hoveredSmaller = !!selected && !!hovered && hovered < selected;

    return (
      <div className="date-grid-container">
        <div className="date-grid days-names">
          <DaysNames />
        </div>
        <div className="date-grid">
          <PreviousMonthDays days={prevMonthDays} />
          {days.map(day => {
            const currentDate = this.dateToInt({ date: day, month, year });
            return (
              <Day
                day={day}
                currentDate={currentDate}
                isToday={actualDate === currentDate}
                selected={selected}
                selected2={selected2}
                hovered={hovered}
                hoveredSmaller={hoveredSmaller}
                onClick={this.onDateSelect}
                onHover={this.onHover}
                offHover={this.offHover}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const PreviousMonthDays = ({ days = [] }) => {
  return days.map(day => (
    <div className="day-container prev-month-day">
      {' '}
      <div className="day">{day}</div>{' '}
    </div>
  ));
};

export default DateGrid;
