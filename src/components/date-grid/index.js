import React, { Component } from 'react';
import { getDaysArray, getDays, getCustomDateObject, dateToInt } from 'utils';
import DaysNames from './days-names';
import Day from './day';
import Context from '../context';

import './index.scss';

class DateGrid extends Component {
  actualDate = new Date();
  daysPerPage = 42;
  state = { selected: null, selected2: null, hovered: null };
  onDateSelect = date => {
    const { onDateSelect } = this.props;
    const { selected } = this.state;
    const newState = !selected ? { selected: date } : { selected2: date };
    this.setState(newState, () => onDateSelect && onDateSelect(date));
  };
  onHover = date => {
    if (!this.props.rangeEnabled || !this.state.selected) return;
    this.setState({
      hovered: date
    });
  };

  offHover = () => {
    if (!this.props.rangeEnabled || !this.state.selected || !this.state.hovered)
      return;
    this.setState({
      hovered: null
    });
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

  getRemainingNextMonthDays = (days = 0) => {
    const remainingDays = this.daysPerPage - days,
      arr = [];
    let i = 1;
    for (i; i <= remainingDays; i += 1) {
      arr.push(i);
    }

    return arr;
  };

  render() {
    const { date, rangeEnabled, provider } = this.props;
    const { hovered } = this.state;
    const { startDate, endDate } = provider;
    const selected =
      startDate && startDate.customObject
        ? dateToInt(startDate.customObject)
        : null;
    const selected2 =
      endDate && endDate.customObject ? dateToInt(endDate.customObject) : null;
    let tempDate = date;
    if (!tempDate) {
      tempDate = new Date();
    }
    const dateObj = getCustomDateObject(tempDate);
    const { month, year } = dateObj;
    const actualDate = dateToInt(getCustomDateObject(this.actualDate));
    const days = getDaysArray(dateObj);
    const prevMonthDays = this.getRemainingPrevMonthDays(dateObj);
    const hoveredPrev = !!selected && !!hovered && hovered < selected;
    const nextMonthDays = this.getRemainingNextMonthDays(
      prevMonthDays.length + days.length
    );

    return (
      <div className="date-grid-container">
        <div className="date-grid days-names">
          <DaysNames />
        </div>
        <div className="date-grid">
          <PreviousMonthDays days={prevMonthDays} />
          {days.map((day, index) => {
            const currentDate = dateToInt({ date: day, month, year });
            return (
              <Day
                key={index}
                day={day}
                currentDate={currentDate}
                isToday={actualDate === currentDate}
                selected={selected}
                selected2={selected2}
                hovered={hovered}
                hoveredPrev={hoveredPrev}
                onClick={this.onDateSelect}
                onHover={this.onHover}
                offHover={this.offHover}
                rangeEnabled={rangeEnabled}
              />
            );
          })}
          <PreviousMonthDays days={nextMonthDays} />
        </div>
      </div>
    );
  }
}

const PreviousMonthDays = ({ days = [] }) => {
  return days.map((day, index) => (
    <div key={index} className="day-container prev-month-day">
      {' '}
      <div className="day">{day}</div>{' '}
    </div>
  ));
};

export default function(props) {
  return (
    <Context.Consumer>
      {provider => <DateGrid {...props} provider={provider} />}
    </Context.Consumer>
  );
}
