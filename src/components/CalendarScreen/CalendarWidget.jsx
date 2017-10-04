import React from 'react';

function CalendarWidget() {
  const date = new Date();
  const year = date.getFullYear();
  const monthNum = date.getMonth();
  const dayNum = date.getDate();
  const dayOfWeekNum = date.getDay();

  const dayOfWeekName = getWeekDayName(dayOfWeekNum);
  const monthName = getMonthName(monthNum);
  const modifiedMonthName = getMonthName(monthNum, true);

  function getWeekDayName(number) {
    return [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ][ number ];
  }

  function getMonthName(monthNum, modified = false) {
    let months = [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];
    let modifiedMonths = [ 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря' ];

    if (modified) {
      return modifiedMonths[ monthNum ];
    }

    return months[ monthNum ];
  }

  return (
    <div className="calendar-widget">
      <MaterialHeader
        year={ year }
        dayNum={ dayNum }
        monthName={ modifiedMonthName }
        dayName={ dayOfWeekName }
      />
      <div className="calendar-widget__sub-header">
        <div className="calendar-widget__title">
          <span className="calendar-widget__month">{ monthName }</span> <span className="calendar-widget__year">{ year }</span>
        </div>
      </div>
      <CalendarBody
        year={ year }
        monthNum={ monthNum }
        dayNum={ dayNum }
        />
    </div>
  )
}

export default CalendarWidget;

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

function CalendarBody({ year, monthNum, dayNum }) {
  const currentDay = new Date(year, monthNum, dayNum);
  const firstDayOfMonth = new Date(year, monthNum, 1);
  const lastDayOfMonth = new Date(year, monthNum + 1, 0);

  let currentMonthDays = createArrayOfDays(lastDayOfMonth.getDate(), 1, false);
  currentMonthDays[dayNum - 1].isCurrentDay = true;

  let prevMonthDays = getPrevMonthDays(firstDayOfMonth);
  let nextMonthDays = getNextMonthDays(lastDayOfMonth);

  let daysArray = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  let weeksCount = daysArray.length / 7;

  let slicedDaysArray = [];

  for (let i = 0; i < weeksCount; i++) {
    slicedDaysArray[i] = daysArray.slice(i * 7, i * 7 + 7);
  }

  function createArrayOfDays(daysCount, firstDayNum, isOtherMonth = true, isCurrentDay = false) {
    return Array.apply(null, Array(daysCount)).map((item, index) => {
      return {
        number: firstDayNum + index,
        isOtherMonth,
        isCurrentDay
      }
    });
  }

  function getPrevMonthDays(firstDayOfMonth) {
    const prevMonthDaysCount = ((firstDayOfMonth.getDay() || 7) - 1);
    const firstMonday = new Date(firstDayOfMonth - prevMonthDaysCount * 86400000);
    const dayNum = firstMonday.getDate();

    return createArrayOfDays(prevMonthDaysCount, dayNum);
  }

  function getNextMonthDays(lastDayOfMonth) {
    const nextMonthDaysCount = (7 - (lastDayOfMonth.getDay() || 7));

    return createArrayOfDays(nextMonthDaysCount, 1);
  }

  function getWeekNumber(d = currentDay) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));

    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);

    return weekNo;
  }

  return (
    <table className="calendar-widget__table">
        <CalendarColgroup />
        <CalendarTableHead />
        <tbody>
          { slicedDaysArray.map( (week, index) => {
            return (
              <tr key={ 'week_' + index }>
                { week.map( day => {
                  let otherMonth = "calendar-widget__other-month";
                  let currentDay = "calendar-widget__today";
                  let className = (day.isOtherMonth) ? otherMonth : (day.isCurrentDay) ? currentDay : "";

                  return (
                    <td key={ 'week_' + index + ' day ' + day.number } className={ className } >{ day.number }</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
  )
}

function CalendarColgroup() {
  return (
    <colgroup>
      <col />
      <col />
      <col />
      <col />
      <col />
      <col className="calendar-widget__week-end" />
      <col className="calendar-widget__week-end" />
    </colgroup>
  )
}

function CalendarTableHead() {
  return (
    <thead>
      <tr>
        <th scope="col" title="Понедельник">Пн</th>
        <th scope="col" title="Вторник">Вт</th>
        <th scope="col" title="Среда">Ср</th>
        <th scope="col" title="Четверг">Чт</th>
        <th scope="col" title="Пятница">Пт</th>
        <th scope="col" title="Суббота">Сб</th>
        <th scope="col" title="Воскресенье">Вс</th>
      </tr>
    </thead>
  )
}
