import React from 'react';
const Context = React.createContext({});

export class Provider extends React.Component {
  state = {
    today: new Date(),
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    lastSelectedDateIsFirst: false // flag to track when last selected date was smaller then first selected one
  };
  updateContext = partialState => {
    this.setState({ ...this.state, ...partialState });
  };
  render() {
    return (
      <Context.Provider
        value={{ ...this.state, updateContext: this.updateContext }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
