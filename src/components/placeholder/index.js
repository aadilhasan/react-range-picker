import React from 'react';

import './index.scss';

class Placeholder extends React.Component {
  render() {
    // const { year, years, sartYear, endYear } = this.state;
    const { firstDate, secondDate } = this.props;
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
    if (!fDate && !lDate)
      return (
        <div className="default-placeholder hint">Select a date/range</div>
      );
    return (
      <div className="default-placeholder">
        {!!fDate &&
          !lDate && <div className="single-date-heading"> Selcted Date </div>}
        <div className={`holder-wrapper${!lDate ? ' center-items' : ''}`}>
          {fDate && <DateHolder heading={!!lDate ? 'From' : ''} date={fDate} />}
          {lDate && <DateHolder heading="To" date={lDate} />}
        </div>
        <div className="buttons">
          <button className="today"> TODAY </button>
          <button className="select"> Select </button>
        </div>
      </div>
    );
  }
}

const DateHolder = ({ heading = '', date = '' }) => {
  return (
    <div className="date-holder">
      <div className="heading"> {heading} </div>
      <div className="date"> {date} </div>
    </div>
  );
};

export default Placeholder;
