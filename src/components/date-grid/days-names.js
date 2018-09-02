import React from 'react';

const days = [
  {
    micro: 'S',
    short: 'Sun',
    full: 'Sunday'
  },
  {
    micro: 'M',
    short: 'Mon',
    full: 'Monday'
  },
  {
    micro: 'T',
    short: 'Tue',
    full: 'Tuesday'
  },
  {
    micro: 'W',
    short: 'Wed',
    full: 'Wednesday'
  },
  {
    micro: 'T',
    short: 'Thu',
    full: 'Thursday'
  },
  {
    micro: 'F',
    short: 'Fri',
    full: 'Friday'
  },
  {
    micro: 'S',
    short: 'Sat',
    full: 'Saturday'
  }
];

const DaysNames = () => {
  const format = 'micro';
  return days.map((day, index) => (
    <div key={day[format] + '-' + index}>
      <div className="day">{day[format]}</div>
    </div>
  ));
};

export default DaysNames;
