import React from 'react';
const Day = ({
  day,
  currentDate,
  isToday,
  selected,
  selected2,
  hovered,
  hoveredPrev,
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
    (hoveredPrev
      ? currentDate < selected && currentDate > hovered
      : currentDate > selected && currentDate < hovered);
  const isInSelectedRanges =
    !!selected &&
    !!selected2 &&
    currentDate > selected &&
    currentDate < selected2;
  const showHoverEffect = isInSelectedRanges || isHovered;

  let dayContainerClass = 'day-container';
  dayContainerClass += isToday ? ' today' : '';
  dayContainerClass += isSelected ? ' selected' : '';
  dayContainerClass +=
    isSelected && (!!hovered || (!hovered && !!selected && !!selected2))
      ? ' first'
      : '';
  dayContainerClass += isSelected2 ? ' selected' : '';
  dayContainerClass +=
    isSelected2 || (isSelected && hoveredPrev) ? ' second' : '';

  dayContainerClass +=
    !!selected && !selected2 && hovered === currentDate
      ? ' active-hovered'
      : '';

  if (isSelected || isSelected2 || hovered === currentDate) {
    if (!!selected && !!selected2 && hovered) {
      dayContainerClass += ' next';
    } else {
      dayContainerClass += hoveredPrev ? ' prev' : ' next';
    }
  }

  dayContainerClass += showHoverEffect ? ' hovered' : '';

  return (
    <div
      key={day}
      className={dayContainerClass}
      onClick={e => onClick(currentDate)}
      onMouseEnter={e => onHover(currentDate)}
      onMouseLeave={offHover}
    >
      <div className="day">
        <span>{day}</span>
      </div>
    </div>
  );
};

export default Day;
