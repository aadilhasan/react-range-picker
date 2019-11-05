import { days } from 'const';

/*
FORMATS ==> 

dd - date
DD - day short
DDDD - day full
mm - month
MM - month short
MMMM - month full
yyyy/YYYY - full year
h - hours
mi - minutes
a - lowercase period (am),
A - capital period (AM)

*/

const dd = (str, date) => str.replace('dd', date.date);
const mm = (str, date) => str.replace('mm', date.month + 1);
const yyyy = (str, date) => str.replace('yyyy', date.year);

const DD = (str, date) => str.replace('DD', days[date.day].short);
const MM = (str, date) => str.replace('MM', date.monthNameShort);
const YYYY = (str, date) => str.replace('YYYY', date.year);

const DDDD = (str, date) => str.replace('DDDD', days[date.day].full);
const MMMM = (str, date) => str.replace('MMMM', date.monthNameFull);

const a = (str, date) => str.replace('a', date.period.toLowerCase());

const A = (str, date) => str.replace('A', date.period.toUpperCase());

const h = (str, date) => str.replace('h', date.hours);
const H = (str, date) => str.replace('H', date.hours);

const mi = (str, date) => str.replace('mi', date.minutes);
const MI = (str, date) => str.replace('MI', date.minutes);

// order of the formators matters
// as next formator may replace the characters in it
export const formators = [
  h,
  H,
  a,
  A,
  dd,
  mm,
  YYYY,
  DDDD,
  MMMM,
  yyyy,
  DD,
  MM,
  mi,
  MI
];
