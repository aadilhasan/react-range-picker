import React from 'react';

import Placeholder from './placeholder';
import Calendar from './calendar';

/*
  apis ==>

   onDateSelected (function)  - 'gets called when a date/range is selected and time selected',
   onOk (function) - 'when your pressed ok/select button in footer'
   enableRange (boolean) - 'if true user can select single date or two dates'
   selectTime (boolean) - if true time picker will show up each time a date gets selected
   rangeTillEndOfDay (boolean) - if true end(last) date of range will have time of 11:59 PM(end of day) else it will have 12:00
   selectTime(boolean) - show time picker if true after very date selection

   placeholder (function which return a React Component) - if user wants custom placeholder, placeholder function will recieve following object as param
      {startDate (date object),
      endDate (date object)}
      
   footer (function which return a React Component) - if user wants custom footer, footer will recieve following object as param
      {startDate (date object)
      endDate (date object)
      today (function) - to select today's date
      ok (function) - closes the calendar and calls onOk API callback}

 */

class RangePicker extends React.Component {
  calendar_ref = React.createRef();
  user_placeholder_ref = React.createRef();
  state = {
    showCalendar: false,
    startDate: null,
    endDate: null
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = ({ target }) => {
    const { showCalendar, startDate, endDate } = this.state;

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

    // if calendar is hidden, return.
    if (!showCalendar) {
      return;
    }

    // if user clicked outside of the calendar then hide it
    this.setState({
      showCalendar: false
    });

    const firstDate = startDate ? startDate._date : null;
    const lastDate = endDate ? endDate._date : null;
    this.props.onOk && this.props.onOk(firstDate, lastDate);
  };

  toggleCalendar = () => {
    const { showCalendar } = this.state;
    this.setState({
      showCalendar: !showCalendar
    });
  };

  onOk = (startDate, endDate) => {
    const { onOk } = this.props;
    const firstDate = startDate ? startDate._date : null;
    const lastDate = endDate ? endDate._date : null;
    this.toggleCalendar();
    onOk && onOk(firstDate, lastDate);
  };

  onDateSelected = (startDate, endDate) => {
    const { onDateSelected } = this.props;
    const firstDate = startDate ? startDate._date : null;
    const lastDate = endDate ? endDate._date : null;
    this.setState(
      {
        startDate,
        endDate
      },
      () => onDateSelected && onDateSelected(firstDate, lastDate)
    );
  };

  render() {
    const { showCalendar, startDate, endDate } = this.state;
    const { placeholder } = this.props;
    return (
      <div className="date-picker-app-wrapper">
        <div
          className="user-placeholder"
          ref={this.user_placeholder_ref}
          onClick={this.toggleCalendar}
        >
          <Placeholder
            customPlaceholder={placeholder}
            startDate={startDate}
            endDate={endDate}
            showTime={this.props.selectTime}
          />
        </div>
        <div
          style={this.calanderPosition}
          className={'calendar' + (showCalendar ? ' visible' : '')}
          ref={this.calendar_ref}
        >
          <Calendar
            {...this.props}
            onDateSelected={this.onDateSelected}
            isVisible={showCalendar}
            onOk={this.onOk}
          />
        </div>
      </div>
    );
  }
}

export default RangePicker;
