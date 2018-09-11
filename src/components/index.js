import React from 'react';

import {
  getNewMonthFrom,
  getCustomDateObject,
  monthsFull,
  monthsShort,
  getActualDate,
  noHandler,
  dateToInt
} from 'utils';

import Calendar from './calendar';

class DatePicker extends React.Component {
  calendar_ref = React.createRef();
  user_placeholder_ref = React.createRef();
  state = {
    showCalendar: false
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = ({ target }) => {
    // if user clicked inside calendar or user-placeholder don't do anything and return
    if (
      this.calendar_ref &&
      this.user_placeholder_ref &&
      (this.calendar_ref.current.contains(target) ||
        this.user_placeholder_ref.current.contains(target))
    ) {
      // console.log(' clicked inside ');
      return;
    }

    // if user clicked outside of the calendar then hide it
    this.setState({
      showCalendar: false
    });
  };

  toggleCalendar = () => {
    const { showCalendar } = this.state;
    this.setState({
      showCalendar: !showCalendar
    });
  };

  onOk = (dateObject, customDateObj) => {
    const { onOk } = this.props;
    this.toggleCalendar();
    if (onOk) {
      onOk(dateObject, customDateObj);
    }
  };

  render() {
    const { showCalendar } = this.state;
    return (
      <div className="date-picker-app-wrapper">
        <div className="user-placeholder" ref={this.user_placeholder_ref}>
          {' '}
          <button onClick={this.toggleCalendar}> show calendar </button>{' '}
        </div>
        <div
          style={this.calanderPosition}
          className={'calendar' + (showCalendar ? ' visible' : '')}
          ref={this.calendar_ref}
        >
          <Calendar {...this.props} onOk={this.onOk} />
        </div>
      </div>
    );
  }
}

export default DatePicker;
