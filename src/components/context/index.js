import React from 'react';
import { monthsFull, monthsShort, dates, days, hours } from '../../constants';
import { getMinutes } from '../../utils';

export const english = {
  months: {
    full: monthsFull,
    short: monthsShort
  },
  days,
  dates,
  period: {
    am: 'AM',
    pm: 'PM',
    AM: 'AM',
    PM: 'PM'
  },
  minutes: getMinutes(),
  hours
};

const LanguageContext = React.createContext({ ...english });
export default LanguageContext;
