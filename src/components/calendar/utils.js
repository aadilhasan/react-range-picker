import { getCustomDateObject, getActualDate, dateToInt, getTime } from 'utils';

export function getDefaultValues(date) {
  if (!date) return null;

  if (!date instanceof Date) {
    console.warn(
      ' start and end must be a valid date object in defaultValue prop '
    );
    return null;
  }

  let customDate = getCustomDateObject(date);
  let time = getTime(12, date);
  return getActualDate(dateToInt(customDate), time);
}

export function getMinDate(minDate, current) {
  let _date = {
    year: -1,
    month: -1,
    date: -1
  };
  if (!minDate) return _date;
  let { date, month, year } = minDate;
  _date.year = year;

  if (year === current.year) {
    _date = { ..._date, month };
    if (month === current.month) {
      _date = { ..._date, date };
    }
  }

  return _date;
}

export function getMaxDate(maxDate, current) {
  let _date = {
    year: Infinity,
    month: Infinity,
    date: Infinity
  };
  if (!maxDate) return _date;
  let { date, month, year } = maxDate;
  _date.year = year;

  if (year === current.year) {
    _date = { ..._date, month };
    if (month === current.month) {
      _date = { ..._date, date };
    }
  }

  return _date;
}

export function handleDisableDates(newDate, minDate, maxDate) {
  const date = dateToInt(getCustomDateObject(newDate));
  if (minDate) {
    const min = dateToInt(minDate);
    if (min > date) {
      return minDate;
    }
  }

  if (maxDate) {
    const max = dateToInt(maxDate);
    if (max < date) {
      return maxDate;
    }
  }

  return newDate;
}
