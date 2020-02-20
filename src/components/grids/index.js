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
      rangeEnabled
    } = this.props;
    return (
      <div className="grids">
        <div className={'animation-helper ' + animationClass}>
          <div className="month prev">
            <ControlledUpdate shouldUpdate={Boolean(animationClass)}>
              <DateGrid
                date={prevMonth}
                onDateSelect={onDateSelect}
                rangeEnabled={rangeEnabled}
              />
            </ControlledUpdate>
          </div>
          <div className="month current">
            <DateGrid
              date={currentMonth}
              onDateSelect={onDateSelect}
              rangeEnabled={rangeEnabled}
            />
          </div>
          <div className="month next">
            <ControlledUpdate shouldUpdate={Boolean(animationClass)}>
              <DateGrid
                date={nextMonth}
                onDateSelect={onDateSelect}
                rangeEnabled={rangeEnabled}
              />
            </ControlledUpdate>
          </div>
        </div>
      </div>
    );
  }
}

export default Grids;
