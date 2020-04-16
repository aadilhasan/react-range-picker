import React, { Component } from 'react';
import DatePicker from '../components';

export default class App extends Component {
  onDateSelect = (startDate, endDate) => {
    console.log(
      ' date selected: startDate => %s , endDate => %s',
      startDate,
      endDate
    );
  };

  onClose = (startDate, endDate) => {
    console.log(
      ' ok/select:  startDate => %s , endDate => %s ',
      startDate,
      endDate
    );
  };

  render() {
    const today = new Date();
    let maxDate = new Date(today);
    maxDate = new Date(maxDate.setDate(today.getDate() + 10));
    return (
      <div className="disabled">
        <h1> Disabled Dates </h1>
        <div>
          <h2> Max date disabled </h2>
          <DatePicker
            onDateSelected={this.onDateSelect}
            disableRange
            onClose={this.onClose}
            onOpen={() => console.log(' openend ')}
            maxDate={maxDate}
          />
        </div>
        <div>
          <h2> Min date disabled </h2>
          <DatePicker
            onDateSelected={this.onDateSelect}
            disableRange
            onClose={this.onClose}
            onOpen={() => console.log(' openend ')}
            minDate={today}
          />
        </div>
        <div>
          <h2> Min and Max date disabled </h2>
          <DatePicker
            onDateSelected={this.onDateSelect}
            onClose={this.onClose}
            onOpen={() => console.log(' openend ')}
            minDate={today}
            maxDate={new Date(new Date().setHours(today.getHours() + 12))}
            selectTime
          />
        </div>
      </div>
    );
  }
}
