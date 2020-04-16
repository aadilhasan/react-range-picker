import React, { Component } from 'react';
import DatePicker from '../components';

export default class App extends Component {
  render() {
    return (
      <div className="custom-placeholder">
        <h1> Placeholder </h1>
        <h2> With Custome Placeholder Text </h2>
        <DatePicker
          onDateSelected={this.onDateSelect}
          onClose={this.onClose}
          disableRange
          dateFormat="MMMM dd  YYYY @ h:mi A"
          placeholderText="Date of birth and time"
          selectTime
        />
        <h2> With Custom Placeholder </h2>
        <PickerWithCustomePlaceholder />
      </div>
    );
  }
}

const PickerWithCustomePlaceholder = () => {
  const placeholder = ({ startDate }) => {
    let _startDate = '';
    if (startDate) {
      _startDate = `${startDate.getDate()}/${startDate.getMonth() +
        1}/${startDate.getFullYear()}`;
    }

    return (
      <div>
        <div
          className="_placeholder"
          style={{ border: '1px solid gray', padding: '5px 10px' }}
        >
          {!_startDate ? 'click here to select a date ' : _startDate}
        </div>
      </div>
    );
  };
  return <DatePicker placeholder={placeholder} disableRange />;
};
