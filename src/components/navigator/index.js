import React from 'react';
import { noHandler } from 'utils';

import './index.scss';

const Navigator = ({
  month = '',
  year = 2018,
  onMonthChange = noHandler('no month change handler'),
  onSelectMonth = noHandler(' no month select handler'),
  onSelectYear = noHandler(' no year select handler')
}) => {
  return (
    <div className="navigator">
      <button className="arrow prev" onClick={e => onMonthChange(-1)} />
      <button className="year" onClick={onSelectMonth}>
        {' '}
        {month}{' '}
      </button>
      <button className="year" onClick={onSelectYear}>
        {' '}
        {year}{' '}
      </button>
      <button className="arrow next" onClick={e => onMonthChange(1)} />
    </div>
  );
};

export default Navigator;
