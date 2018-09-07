import React, { Component } from 'react';
import './App.css';
import DatePicker from './components';
import TimePicker from './components/time-picker';

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
          enableRange={true}
        />
        <br />
        <TimePicker />
      </div>
    );
  }
}

export default App;
