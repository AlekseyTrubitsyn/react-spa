import React from 'react';

function MaterialHeader({ dayName, dayNum, monthName, year }) {
  return (
    <div className="calendar-widget__header">
      <div className="calendar-widget__day-name">{ dayName }</div>
      <div className="calendar-widget__date">
        <div className="calendar-widget__day-num">{ dayNum }</div>
        <div className="calendar-widget__month">{ monthName }</div>
        <div className="calendar-widget__year">{ year }</div>
      </div>
    </div>
  )
}

export default MaterialHeader;
