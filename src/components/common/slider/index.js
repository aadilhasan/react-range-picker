import React from 'react';
import './styles.scss';

export default function({
  visible: visibility,
  className,
  slideFrom = 'top',
  children
}) {
  return (
    <div
      className={`slider${visibility ? ' visible' : ' hidden'}${' ' +
        slideFrom}`}
    >
      <div className={`content${className ? ' ' + className : ''}`}>
        {children}
      </div>
    </div>
  );
}
