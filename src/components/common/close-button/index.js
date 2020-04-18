import React from 'react';
import './styles.scss';

export default function({ className, ...props }) {
  return (
    <button
      {...props}
      className={`picker-close-button${className ? ' ' + className : ''}`}
    >
      ×
    </button>
  );
}
