import React from 'react';
import './styles.scss';

const defaultVisible = {
  backgroundColor: '#0000003b',
  opacity: 1
};
const defaultHidden = {
  transitionDelay: '0.3s',
  opacity: 0
};

const slidDirections = {
  top: {
    visible: {
      slider: {
        transform: 'translateY(0%)',
        top: 0,
        left: 0,
        ...defaultVisible
      },
      content: {
        transform: 'translateY(0px)'
      }
    },
    hidden: {
      slider: {
        transform: 'translateY(-105%)',
        bottom: 0,
        left: 0,
        ...defaultHidden
      },
      content: {
        transform: 'translateY(-100%)'
      }
    }
  },
  bottom: {
    visible: {
      slider: {
        transform: 'translateY(0%)',
        ...defaultVisible
      },
      content: {
        bottom: 0,
        left: 0,
        transform: 'translateY(0px)'
      }
    },
    hidden: {
      slider: {
        transform: 'translateY(105%)',
        ...defaultHidden
      },
      content: {
        transform: 'translateY(100%)',
        bottom: 0,
        left: 0
      }
    }
  }
};

export default function({
  visible: visibility,
  className,
  slideFrom = 'bottom',
  children
}) {
  const { visible, hidden } = slidDirections[slideFrom];
  const sliderStyle = visibility ? visible['slider'] : hidden['slider'];
  const contentStyle = visibility ? visible['content'] : hidden['content'];
  return (
    <div
      className={`slider${visibility ? ' visible' : ' hidden'}`}
      style={sliderStyle}
    >
      <div
        className={`content${className ? ' ' + className : ''}`}
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  );
}
