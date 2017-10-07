import React from 'react';

class CalendarBody extends React.Component {
  constructor(props) {
    super(props);

    let { year, monthNum, dayNum, monthNames } = props;

    const currentDay = new Date(year, monthNum, dayNum);

    this.state = {
      currentDay,
      selectedMonth: monthNum,
      selectedMonthName: monthNames[monthNum],
      selectedYear: year,
      slicedDaysArray: [],
      monthNames
    }

    this.fillDaysArray = this.fillDaysArray.bind(this);
    this.handleMonthIncrease = this.handleMonthIncrease.bind(this);
    this.handleMonthDecrease = this.handleMonthDecrease.bind(this);
  }

  componentDidMount() {
    this.fillDaysArray(this.state.currentDay);
  }

  handleMonthIncrease() {
    let selectedMonth = this.state.selectedMonth + 1;
    this.fillDaysArray(new Date(this.state.selectedYear, selectedMonth, 1));
  }

  handleMonthDecrease() {
    let selectedMonth = this.state.selectedMonth - 1;
    this.fillDaysArray(new Date(this.state.selectedYear, selectedMonth, 1));
  }

  fillDaysArray(day) {
    const today = this.state.currentDay;

    const month = day.getMonth();
    const year = day.getFullYear();
    const dayNum = day.getDate();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let prevMonthDays = getPrevMonthDays(firstDayOfMonth);
    let nextMonthDays = getNextMonthDays(lastDayOfMonth);

    let selectedMonthDays = createArrayOfDays(lastDayOfMonth.getDate(), 1, false);

    if ((today.getMonth() === month) && (today.getFullYear() === year)) {
      selectedMonthDays[today.getDate() - 1].isCurrentDay = true;
    }

    let daysArray = [...prevMonthDays, ...selectedMonthDays, ...nextMonthDays];
    let weeksCount = daysArray.length / 7;

    let slicedDaysArray = [];

    for (let i = 0; i < weeksCount; i++) {
      slicedDaysArray[i] = daysArray.slice(i * 7, i * 7 + 7);
    }

    let selectedMonthName = this.state.monthNames[month];

    this.setState({
      selectedMonth: month,
      selectedYear: year,
      selectedMonthName,
      slicedDaysArray
    })

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
  }

  render() {
    return (
      <div className="calendar-body">
        <svg className="paginator-svg" width="60" height="60" onClick={ this.handleMonthDecrease }>
          <g className="paginator">
            <circle cx="30" cy="30" r="30"></circle>
            <path className="paginator__arrow" d="M 37 17 L 22 30 L 37 43" stroke="white" strokeWidth="5"/>
          </g>
        </svg>
        <svg className="paginator-svg-right" width="60" height="60" onClick={ this.handleMonthIncrease }>
          <g className="paginator paginator-right">
            <circle cx="30" cy="30" r="30"></circle>
            <path className="paginator__arrow" d="M 23 17 L 38 30 L 23 43" stroke="white" strokeWidth="5"/>
          </g>
        </svg>
        <div className="calendar-widget__sub-header">
          <div className="calendar-widget__title">
            <span className="calendar-widget__month">{ this.state.selectedMonthName }</span> <span className="calendar-widget__year">{ this.state.selectedYear }</span>
          </div>
        </div>
        <table className="calendar-widget__table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="calendar-widget__week-end" />
            <col className="calendar-widget__week-end" />
          </colgroup>
          <thead>
            <tr>
              <th onClick={ this.handleMonthDecrease } scope="col" title="Понедельник">Пн</th>
              <th scope="col" title="Вторник">Вт</th>
              <th scope="col" title="Среда">Ср</th>
              <th scope="col" title="Четверг">Чт</th>
              <th scope="col" title="Пятница">Пт</th>
              <th scope="col" title="Суббота">Сб</th>
              <th onClick={ this.handleMonthIncrease } scope="col" title="Воскресенье">Вс</th>
            </tr>
          </thead>
          <tbody>
            { this.state.slicedDaysArray.map( (week, index) => {
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
      </div>
    )
  }
}

export default CalendarBody;
