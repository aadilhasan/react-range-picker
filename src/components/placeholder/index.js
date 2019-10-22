import React from 'react';
import './index.scss';

const Placeholder = ({
  startDate,
  endDate,
  showTime = false,
  customPlaceholder
}) => {
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
};

const DateAndTime = ({ date, showTime }) => {
  if (!date) return null;
  const dateStr = date.date + '-' + (date.month + 1) + '-' + date.year;
  const timeStr = !showTime
    ? ''
    : date.hours + ':' + date.minutes + ' ' + date.period;
  return (
    <React.Fragment>
      <span className="date"> {dateStr} </span>
      <span className="time"> {timeStr} </span>
    </React.Fragment>
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
