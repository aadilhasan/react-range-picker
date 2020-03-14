import React from 'react';
import DateGrid from '../date-grid';
import ControlledUpdate from '../controlled-update';
import './index.scss';

class Grids extends React.Component {
  state = {};
  render() {
    const {
      prevMonth,
      currentMonth,
      nextMonth,
      animationClass = '',
      onDateSelect,
      rangeEnabled,
      min,
      max
    } = this.props;
    const prevMin = prevMonth.month === min.month ? min.date : -1;
    const prevMax = prevMonth.month === max.month ? max.date : 31;

    const nextMin = nextMonth.month === min.month ? min.date : -1;
    const nextMax = nextMonth.month === max.month ? max.date : 31;

    return (
      <div className="grids">
        <div className={'animation-helper ' + animationClass}>
          <div className="month prev">
            <ControlledUpdate shouldUpdate={Boolean(animationClass)}>
              <DateGrid
                date={prevMonth}
                onDateSelect={onDateSelect}
                rangeEnabled={rangeEnabled}
                min={prevMin}
                max={prevMax}
              />
            </ControlledUpdate>
          </div>
          <div className="month current">
            <DateGrid
              date={currentMonth}
              onDateSelect={onDateSelect}
              rangeEnabled={rangeEnabled}
              min={min.date}
              max={max.date}
              enableDateSelection
            />
          </div>
          <div className="month next">
            <ControlledUpdate shouldUpdate={Boolean(animationClass)}>
              <DateGrid
                date={nextMonth}
                onDateSelect={onDateSelect}
                rangeEnabled={rangeEnabled}
                min={nextMin}
                max={nextMax}
              />
            </ControlledUpdate>
          </div>
        </div>
      </div>
    );
  }
}

export default Grids;
