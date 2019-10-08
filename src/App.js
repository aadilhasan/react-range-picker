import React, { Component } from 'react';
import './App.css';
import DatePicker from './components';

class App extends Component {
  onDateSelect = (dateObject, dateCustomObject) => {
    console.log(' date selected ', dateObject, dateCustomObject);
  };

  onOk = (dateObject, dateCustomObject) => {
    console.log(' ok/select pressed ', dateObject, dateCustomObject);
  };

  render() {
    return (
      <div className="App">
        <DatePicker
          onDateSelected={this.onDateSelect}
          onOk={this.onOk}
          placeholder={(start, end) => (
            <div>
              {start ? start.getDate() : null}, {end ? end.getDate() : null}
            </div>
          )}
          // enableRange
          // rangeTillEndOfDay
          // selectTime
        />
      </div>
    );
  }
}

const Footer = () => {
  return <div> New Props </div>;
};

export default App;
