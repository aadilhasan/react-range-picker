import React, { Component } from 'react';
import './App.css';
import DatePicker from './components';
import Disabled from './examples/Disabled';
import CustomPlaceHolder from './examples/CustomPlaceHolder';
import DateEnabled from './examples/DateEnabled';

class App extends Component {
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
    return (
      <div className="App">
        <h1 style={{ color: 'red' }}>
          {' '}
          FEAT: Add close button in month and year selector{' '}
        </h1>
        <div>
          <DatePicker
            onDateSelected={this.onDateSelect}
            defaultValue={{
              startDate: new Date('2020-04-05'),
              endDate: ''
            }}
            onClose={this.onClose}
            onOpen={() => console.log(' openend ')}
            minDate={new Date()}
            maxDate={new Date('2020-04-15')}
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
          <h2> Close onSelect </h2>
          <DatePicker
            onDateSelected={this.onDateSelect}
            onClose={this.onClose}
            disableRange
            dateFormat="MMMM dd  YYYY @ h:mi A"
            placeholderText="Date of birth and time"
            // selectTime
            closeOnSelect
          />
        </div>
        <br />
        <div>
          <h1> Controlled visibility </h1>
          {/* <ControlledVisibility /> */}
        </div>
        <DateEnabled />
        <br />
        <CustomPlaceHolder />
        <br />
        <Disabled />
      </div>
    );
  }
}

class ControlledVisibility extends Component {
  state = { visible: true };
  onDateSelect = (f, l) => console.log(' date selecred ', f, l);
  render() {
    return (
      <DatePicker
        onDateSelected={this.onDateSelect}
        defaultValue={{
          startDate: new Date('2020-01-05'),
          endDate: ''
        }}
        onClose={() => this.setState({ visible: false })}
        onOpen={() => this.setState({ visible: true })}
        visible={this.state.visible}
        closeOnOutsideClick={false}
        // dateFormat="DD-MM-YYYY h:miA"
        // disableRange
        // rangeTillEndOfDay
        // selectTime
      />
    );
  }
}

export default App;
