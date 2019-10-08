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

   placeholder (React Component) - if user wants custom placeholder, placeholder will recieve  these props 
      showTime (boolean) - user provided value
      startDate (object {dateObjet <new Date>, customDate <object> })
      endDate (object {dateObjet <new Date>, customDate <object> })
      
  footer (React Component) - if user wants custom placeholder, placeholder will recieve these props 
      showTime (boolean) - it user api value
      startDate (object {dateObjet <new Date>, customDate <object> })
      endDate (object {dateObjet <new Date>, customDate <object> })
      onToday (function) - to select today's date
      onOk (function) - closes the calendar and calls onOk API callback

 */

class DatePicker extends React.Component {
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

    const fDate = !!startDate ? startDate.dateObject : void 0;
    const lDate = !!endDate ? endDate.dateObject : void 0;
    this.props.onOk && this.props.onOk(fDate, lDate);
  };

  toggleCalendar = () => {
    const { showCalendar } = this.state;
    this.setState({
      showCalendar: !showCalendar
    });
  };

  onOk = (firstDate, lastDate) => {
    const { onOk } = this.props;
    this.toggleCalendar();
    if (onOk) {
      onOk(firstDate, lastDate);
    }
  };

  onDateSelected = (startDate, endDate) => {
    const { onDateSelected } = this.props;
    const dateObj1 = startDate ? startDate.dateObject : void 0;
    const dateObj2 = endDate ? endDate.dateObject : void 0;
    this.setState(
      {
        startDate,
        endDate
      },
      () => onDateSelected && onDateSelected(dateObj1, dateObj2)
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

export default DatePicker;
