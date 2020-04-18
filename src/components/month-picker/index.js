import React from 'react';
import { noHandler } from 'utils';
import CloseButton from '../common/close-button';
import Slider from '../common/slider';
import './index.scss';

const MonthPicker = ({
  months = [],
  selected = -1,
  visible = false,
  min,
  onChange = noHandler(' no change handler for month change')
}) => {
  return (
    <Slider visible={visible} slideFrom="top" className="month-select">
      <React.Fragment>
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
        <CloseButton className="close" onClick={() => onChange(null)} />
      </React.Fragment>
    </Slider>
  );
};

export default MonthPicker;
