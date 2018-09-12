import React from 'react';
import { noHandler } from 'utils';
import './index.scss';

class Footer extends React.Component {
  render() {
    // const { year, years, sartYear, endYear } = this.state;
    const {
      firstDate,
      secondDate,
      onToday = noHandler(),
      onOk = noHandler(),
      showTime = false
    } = this.props;
    let fDate = '',
      fDateTime = '',
      lDate = '',
      lDateTime = '';
    if (!!firstDate.customObject) {
      const {
        date,
        monthNameShort,
        year,
        hours,
        minutes,
        period
      } = firstDate.customObject;
      fDate += date + ' ' + monthNameShort + ' ' + year;
      fDateTime = showTime ? hours + ':' + minutes + ' ' + period : '';
    }
    if (!!secondDate.customObject) {
      const {
        date,
        monthNameShort,
        year,
        hours,
        minutes,
        period
      } = secondDate.customObject;
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
          onOk={e => onOk(firstDate.dateObject, secondDate.dateObject)}
        />
      </div>
    );
  }
}

const Buttons = ({ disableSelect, onToday, onOk }) => {
  return (
    <div className="buttons">
      <button className="today" onClick={onToday}>
        {' '}
        TODAY{' '}
      </button>
      <button disabled={disableSelect} className="select" onClick={onOk}>
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
