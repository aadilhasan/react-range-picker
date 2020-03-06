import React from 'react';
import { noHandler } from 'utils';

import './index.scss';

const Navigator = ({
  month = '',
  monthName = '',
  year = 2018,
  min,
  onMonthChange = noHandler('no month change handler'),
  onSelectMonth = noHandler(' no month select handler'),
  onSelectYear = noHandler(' no year select handler')
}) => {
  return (
    <div className="navigator">
      {min.month < month ? (
        <button className="arrow prev" onClick={e => onMonthChange(-1)} />
      ) : (
        <div className="button-placeholder" />
      )}
      <div className="values">
        <button className="month" onClick={onSelectMonth}>
          {' '}
          {monthName}{' '}
        </button>
        <button className="year" onClick={onSelectYear}>
          {' '}
          {year}{' '}
        </button>
      </div>
      <button className="arrow next" onClick={e => onMonthChange(1)} />
    </div>
  );
};

export default Navigator;
