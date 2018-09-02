import React from 'react';
const Day = ({
  day,
  currentDate,
  isToday,
  selected,
  selected2,
  hovered,
  hoveredSmaller,
  onClick,
  onHover,
  offHover
}) => {
  const isSelected = !!selected && currentDate === selected;
  const isSelected2 = !!selected2 && currentDate === selected2;
  const isHovered =
    !!selected &&
    !selected2 &&
    !!hovered &&
    (hoveredSmaller
      ? currentDate < selected && currentDate > hovered
      : currentDate > selected && currentDate < hovered);
  const isInSelectedRanges =
    !!selected &&
    !!selected2 &&
    currentDate > selected &&
    currentDate < selected2;
  const showHoverEffect = isInSelectedRanges || isHovered;

  return (
    <div
      key={day}
      className={`day-container${isToday ? ' today' : ''}${
        isSelected || isSelected2 ? ' selected' : ''
      }${showHoverEffect ? ' hovered' : ''}`}
      onClick={e => onClick(currentDate)}
      onMouseEnter={e => onHover(currentDate)}
      onMouseLeave={offHover}
    >
      <div className="day">{day}</div>
    </div>
  );
};

export default Day;
