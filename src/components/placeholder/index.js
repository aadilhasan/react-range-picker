import React from 'react';
import { noHandler } from 'utils';
import './index.scss';

class Placeholder extends React.Component {
  render() {
    // const { year, years, sartYear, endYear } = this.state;
    const {
      firstDate,
      secondDate,
      onToday = noHandler(),
      onOk = noHandler()
    } = this.props;
    let fDate = '',
      lDate = '';
    if (!!firstDate.customObject) {
      const { date, monthNameShort, year } = firstDate.customObject;
      fDate += date + ' ' + monthNameShort + ' ' + year;
    }
    if (!!secondDate.customObject) {
      const { date, monthNameShort, year } = secondDate.customObject;
      lDate += date + ' ' + monthNameShort + ' ' + year;
    }
    return (
      <div className="default-placeholder">
        {!fDate && !lDate && <div className="hint">Select a date/range</div>}
        <div className="selected-dates">
          {!!fDate &&
            !lDate && <div className="single-date-heading"> Selcted Date </div>}
          <div className={`holder-wrapper${!lDate ? ' center-items' : ''}`}>
            {fDate && (
              <DateHolder heading={!!lDate ? 'From' : ''} date={fDate} />
            )}
            {lDate && <DateHolder heading="To" date={lDate} />}
          </div>
        </div>
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

const DateHolder = ({ heading = '', date = '' }) => {
  return (
    <div className="date-holder">
      <div className="heading"> {heading} </div>
      <div className="date"> {date} </div>
    </div>
  );
};

export default Placeholder;
