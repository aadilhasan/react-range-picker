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
  offHover,
  rangeEnabled
}) => {
  const isSelected = !!selected && currentDate === selected;
  const isSelected2 = !!selected2 && currentDate === selected2;

  let dayContainerClass = 'day-container';
  dayContainerClass += isToday ? ' today' : '';
  dayContainerClass += isSelected ? ' selected' : '';
  if (rangeEnabled) {
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

    dayContainerClass += isSelected2 ? ' selected' : '';

    // if both dates are same don't add first/second class it will give weired effect at the selected date
    if (selected !== selected2) {
      dayContainerClass +=
        isSelected && (!!hovered || (!hovered && !!selected && !!selected2))
          ? ' first'
          : '';
      dayContainerClass +=
        isSelected2 || (isSelected && !selected2 && hoveredPrev)
          ? ' second'
          : '';
    }

    dayContainerClass +=
      !!selected && !selected2 && hovered === currentDate
        ? ' active-hovered'
        : '';

    if (isSelected || isSelected2 || (selected && hovered === currentDate)) {
      if (!!selected && !!selected2 && hovered) {
        dayContainerClass += ' next';
      } else {
        dayContainerClass += hoveredPrev
          ? ' prev'
          : hovered !== selected
            ? ' next'
            : '';
      }
    }
    dayContainerClass += showHoverEffect ? ' hovered' : '';
  }

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
