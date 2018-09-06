import React from 'react';
import { noHandler } from 'utils';

import './index.scss';

const MonthPicker = ({
  months = [],
  disabled = -1,
  selected = -1,
  visible = false,
  onChange = noHandler(' no change handler for month change')
}) => {
  return (
    <div className={`month-select${visible ? ' visible' : ' hidden'}`}>
      <div className="select-items">
        {months.map((month, index) => {
          const onClick = index !== disabled ? onChange : () => {};
          return (
            <div
              key={index}
              className={`select-item${index === disabled ? ' disabled' : ''}${
                index === selected ? ' selected' : ''
              }`}
              onClick={e => onClick(month, index)}
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
