import React, { Component } from 'react';
import './App.css';
import DatePicker from './components';

class App extends Component {
  onDateSelect = (dateObject, dateCustomObject) => {
    console.log(' date selected ', dateObject, dateCustomObject);
  };

  onClose = (dateObject, dateCustomObject) => {
    console.log(' ok/select pressed ', dateObject, dateCustomObject);
  };

  render() {
    return (
      <div className="App">
        <div>
          <DatePicker
            onDateSelected={this.onDateSelect}
            onClose={this.onClose}
            // dateFormat="DD-MM-YYYY h:miA"
            // disableRange
            // rangeTillEndOfDay
            // selectTime
          />
        </div>
        <div>
          <h2> With custom footer</h2>
          <DatePicker
            onDateSelected={this.onDateSelect}
            onClose={this.onClose}
            disableRange
            // rangeTillEndOfDay
            selectTime
            footer={({ startDate, endDate, close, today }) => (
              <div
                style={{
                  border: '1px solid green',
                  padding: '2px, 10px',
                  minWidth: 200,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                {startDate ? startDate.getDate() : null}
                {endDate ? ', ' + endDate.getDate() : null}
                <button onClick={close}>OK</button>
                <button onClick={today}>Today</button>
              </div>
            )}
          />
        </div>
        <br />
        <div>
          <h2> With custom date format and placeholder text</h2>
          <DatePicker
            onDateSelected={this.onDateSelect}
            onClose={this.onClose}
            disableRange
            dateFormat="MMMM dd  YYYY @ h:mi A"
            placeholderText="Date of birth and time"
            selectTime
          />
        </div>
        <br />
        <PickerWithCustomePlaceholder />
      </div>
    );
  }
}

const PickerWithCustomePlaceholder = () => {
  const placeholder = ({ startDate, endDate }) => {
    let _startDate = '';
    let _endDate = '';
    if (startDate) {
      _startDate = `${startDate.getDate()}/${startDate.getMonth() +
        1}/${startDate.getFullYear()}`;
    }

    if (endDate) {
      _endDate = `${endDate.getDate()}/${endDate.getMonth() +
        1}/${endDate.getFullYear()}`;
    }
    return (
      <div>
        <div
          className="_placeholder"
          style={{ border: '1px solid gray', padding: '5px 10px' }}
        >
          {!_startDate ? 'click here ' : `${_startDate} - ${_endDate}`}
        </div>
      </div>
    );
  };
  return (
    <div>
      <br />
      <br />
      <h3>With custom placeholder</h3>
      <br />
      <DatePicker placeholder={placeholder} />
    </div>
  );
};

export default App;
