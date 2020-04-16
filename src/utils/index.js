import {
  monthsShort,
  monthsFull,
  START_DATE_TIME,
  END_DATE_TIME,
  END_DATE_TIME_END_OF_DAY
} from 'const';
import { formators } from './date-formators.js';

export const getDays = (month, year) => {
  /** Month starts from index 0 so we add +1 to get next month.
      Day starts from index 1, if we give day = 0, it returns date of previous day.
      So here we are using next month of the given month with date = 0, so it returns last day of the given month
  **/

  if (typeof month !== 'number' || typeof year !== 'number') {
    const date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
  }
  return new Date(year, month + 1, 0).getDate();
};

export const getDaysArray = ({ month, year }) => {
  const days = getDays(month, year);
  const daysArray = [];
  let i = 1;
  for (i; i <= days; i += 1) {
    daysArray.push(i);
  }
  return daysArray;
};

export const getNewMonthFrom = (from, months = 0) => {
  const newInstance = new Date(from);
  newInstance.setMonth(newInstance.getMonth() + months);
  newInstance.setDate(1);
  return getCustomDateObject(newInstance);
};

export const noHandler = message => () => console.log(message);

export const getCustomDateObject = (date = new Date()) => {
  return {
    day: date.getDay(),
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  };
};

export const getTime = (format, date = new Date()) => {
  const tempHours = date.getHours();
  const hours = format === 12 && tempHours > 12 ? tempHours - 12 : tempHours;
  const period = format === 12 ? (tempHours > 12 ? 'PM' : 'AM') : '';
  return {
    hours,
    minutes: date.getMinutes(),
    period
  };
};

export const getActualDate = (intDate = '', timeObj = {}, format = 12) => {
  const strDate = (intDate || '').toString();
  let hours, minutes, period;
  if (!strDate || strDate.length !== 8) {
    return {};
  }
  const year = parseInt(strDate.substring(0, 4), 10);
  const month = parseInt(strDate.substring(4, 6), 10);
  const date = parseInt(strDate.substring(6, 8), 10);

  const newDate = new Date(year, month, date);

  if (!timeObj) {
    const time = getTime(format);
    hours = time.hours;
    minutes = time.minutes;
    period = time.period;
  } else if (typeof timeObj === 'object') {
    hours = parseInt(timeObj.hours, 10);
    minutes = timeObj.minutes;
    period = '' + timeObj.period;
    let dateHours = 0;
    // format date to 24 hours for date object
    if (period === 'PM') {
      dateHours = hours < 12 ? hours + 12 : hours;
    } else {
      dateHours = hours === 12 ? 0 : hours;
    }
    newDate.setHours(dateHours);
    newDate.setMinutes(minutes);
  }
  return {
    _date: newDate,
    _intDate: intDate,
    customObject: {
      minutes,
      hours,
      period,
      date,
      month,
      year,
      monthNameShort: monthsShort[month],
      monthNameFull: monthsFull[month],
      day: newDate.getDay()
    }
  };
};

export const dateToInt = date => {
  // make sure both month and day starts with 0 if single digit;
  const month = date.month < 10 ? '0' + date.month : date.month;
  const day = date.date < 10 ? '0' + date.date : date.date;
  return parseInt('' + date.year + month + day, 10);
};

export const formatDate = (format, date = new Date()) => {
  formators.forEach(formator => {
    const _f = formator(format, date);
    format = _f || format;
  });
  return format;
};

export const getTimesFromProvider = (provider, rangeTillEndOfDay) => {
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
};

export const getIntDatesFromProvider = provider => {
  return {
    selectedDate1: provider.startDate ? provider.startDate._intDate : '',
    selectedDate2: provider.endDate ? provider.endDate._intDate : ''
  };
};
