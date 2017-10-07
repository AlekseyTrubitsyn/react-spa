import React from 'react';

import MaterialHeader from './MaterialHeader';
import CalendarBody from './CalendarBody';

function CalendarWidget() {
  const monthNames = [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];
  const modifiedMonthNames = [ 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря' ];
  const weekDayName = [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];

  const date = new Date();
  const year = date.getFullYear();
  const monthNum = date.getMonth();
  const dayNum = date.getDate();
  const dayOfWeekNum = date.getDay();

  const dayOfWeekName = weekDayName[dayOfWeekNum];
  const monthName = monthNames[monthNum];
  const modifiedMonthName = modifiedMonthNames[monthNum];

  return (
    <div className="calendar-widget">
      <MaterialHeader
        year={ year }
        dayNum={ dayNum }
        monthName={ modifiedMonthName }
        dayName={ dayOfWeekName }
      />
      <CalendarBody
        year={ year }
        monthNum={ monthNum }
        dayNum={ dayNum }
        monthNames={ monthNames }
        />
    </div>
  )
}

export default CalendarWidget;
