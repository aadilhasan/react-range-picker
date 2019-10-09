import React from 'react';
import { noHandler } from 'utils';
import './index.scss';

const Footer = ({
  startDate,
  endDate,
  onToday = noHandler(),
  onClose = noHandler(),
  showTime = false,
  customFooter
}) => {
  if (customFooter) {
    return customFooter({
      today: onToday,
      startDate: startDate ? startDate._date : null,
      endDate: endDate ? endDate._date : null,
      close: () => onClose(startDate, endDate)
    });
  }

  let fDate = '',
    fDateTime = '',
    lDate = '',
    lDateTime = '';
  if (!!startDate.customObject) {
    const {
      date,
      monthNameShort,
      year,
      hours,
      minutes,
      period
    } = startDate.customObject;
    fDate += date + ' ' + monthNameShort + ' ' + year;
    fDateTime = showTime ? hours + ':' + minutes + ' ' + period : '';
  }
  if (!!endDate.customObject) {
    const {
      date,
      monthNameShort,
      year,
      hours,
      minutes,
      period
    } = endDate.customObject;
    lDate += date + ' ' + monthNameShort + ' ' + year;
    lDateTime = showTime ? hours + ':' + minutes + ' ' + period : '';
  }
  return (
    <div className="default-footer">
      {!fDate && !lDate && <div className="hint">Select a date/range</div>}
      {!!fDate && (
        <div className="selected-dates">
          <div className="date-heading"> Selected Date </div>
          <div className={`holder-wrapper${!lDate ? ' center-items' : ''}`}>
            {fDate && (
              <DateHolder
                heading={!!lDate ? 'From' : ''}
                date={fDate}
                time={fDateTime}
              />
            )}
            {lDate && (
              <DateHolder
                extraClass="second"
                heading="To"
                date={lDate}
                time={lDateTime}
              />
            )}
          </div>
        </div>
      )}
      <Buttons
        disableSelect={!fDate && !lDate}
        onToday={onToday}
        onClose={e => onClose(startDate, endDate)}
      />
    </div>
  );
};

const Buttons = ({ disableSelect, onToday, onClose }) => {
  return (
    <div className="buttons">
      <button className="today" onClick={onToday}>
        {' '}
        TODAY{' '}
      </button>
      <button disabled={disableSelect} className="select" onClick={onClose}>
        {' '}
        Select{' '}
      </button>
    </div>
  );
};

const DateHolder = ({ heading = '', date = '', time, extraClass = '' }) => {
  return (
    <div className={'date-holder ' + extraClass}>
      <div className="heading"> {heading} </div>
      <div className="date">
        {' '}
        {date} <span className="time"> {time} </span>{' '}
      </div>
    </div>
  );
};

export default Footer;
