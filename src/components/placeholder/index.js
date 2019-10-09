import React from 'react';
import './index.scss';
import LanguageContext from '../context';

class Placeholder extends React.Component {
  getDateString = (obj, showTime) => {
    if (!obj) return '';

    return (
      obj.date +
      '-' +
      obj.month +
      '-' +
      obj.year +
      (showTime ? ' ' + obj.hours + ':' + obj.minutes + ' ' + obj.period : '')
    );
  };

  render() {
    const {
      startDate,
      endDate,
      showTime = false,
      customPlaceholder
    } = this.props;
    const s_date = startDate ? startDate.customObject : null,
      e_date = endDate ? endDate.customObject : null;

    if (customPlaceholder) {
      const { _date: _startDate } = startDate || {};
      const { _date: _endDate } = endDate || {};
      return customPlaceholder({ startDate: _startDate, endDate: _endDate });
    }

    return (
      <div className="default-placeholder">
        <div className="text">
          {!!s_date || !!e_date ? (
            <div className="dates-container">
              <DateAndTime date={s_date} showTime={showTime} />
              {!!e_date && <b> ~ </b>}
              <DateAndTime date={e_date} showTime={showTime} />
            </div>
          ) : (
            'Select Date / Date Range'
          )}
        </div>
        <CalendarIcon />
      </div>
    );
  }
}

const DateAndTime = ({ date, showTime }) => {
  if (!date) return null;

  return (
    <LanguageContext.Consumer>
      {({ dates, months }) => {
        const dateStr =
          dates[date.date - 1] + '-' + months[date.month] + '-' + date.year;
        const timeStr = !showTime
          ? ''
          : date.hours + ':' + date.minutes + ' ' + date.period;
        return (
          <React.Fragment>
            {console.log(months)}
            <span className="date">{dateStr}</span>
            <span className="time"> {timeStr} </span>
          </React.Fragment>
        );
      }}
    </LanguageContext.Consumer>
  );
};

const CalendarIcon = () => {
  const dateDots = new Array(5).fill('');
  return (
    <div className="icon">
      <div className="calendar-hooks">
        <div className="hook" />
        <div className="hook" />
      </div>
      <div className="date-dots">
        {dateDots.map((dot, index) => <div key={index} className="dot" />)}
      </div>
    </div>
  );
};

export default Placeholder;
