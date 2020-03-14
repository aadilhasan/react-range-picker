import React from 'react';
import { noHandler } from 'utils';

import './index.scss';

const MonthPicker = ({
  months = [],
  selected = -1,
  visible = false,
  min,
  onChange = noHandler(' no change handler for month change')
}) => {
  return (
    <div className={`month-select${visible ? ' visible' : ' hidden'}`}>
      <div className="select-items">
        {months.map((month, index) => {
          const onClick = index < min ? () => {} : onChange;
          return (
            <div
              key={index}
              className={`select-item${index < min ? ' disabled' : ''}${
                index === selected ? ' selected' : ''
              }`}
              onClick={() => onClick(index)}
            >
              {' '}
              {month}{' '}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthPicker;
