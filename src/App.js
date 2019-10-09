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
            // disableRange
            // rangeTillEndOfDay
            // selectTime
          />
        </div>
        <div>
          <h2> With custom footer and placeholder</h2>
          <DatePicker
            onDateSelected={this.onDateSelect}
            onClose={this.onClose}
            placeholder={({ startDate, endDate }) => (
              <div
                style={{
                  border: '1px solid red',
                  padding: '2px, 10px',
                  minWidth: 200
                }}
              >
                {startDate ? startDate.getDate() : null},{' '}
                {endDate ? endDate.getDate() : null}
              </div>
            )}
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
                {startDate ? startDate.getDate() : null},{' '}
                {endDate ? endDate.getDate() : null}
                <button onClick={close}>OK</button>
                <button onClick={today}>Today</button>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

const Footer = () => {
  return <div> New Props </div>;
};

export default App;
