import React, { Component } from 'react';
import './App.css';
import DatePicker from './components';
import TimePicker from './components/time-picker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DatePicker />
        <br />
        <TimePicker />
      </div>
    );
  }
}

export default App;
