import React from 'react';

import PolygonScreenContainer from '../containers/PolygonScreenContainer';
import CalendarScreen from './CalendarScreen/CalendarWidget';

const SCREEN_POLYGON = 'SCREEN_POLYGON';
const SCREEN_CALENDAR = 'SCREEN_CALENDAR';

export default function Screen(props) {
  const className = 'screen' + ((props.active) ? '' : ' screen-hide');

  function getContent() {
    switch (props.screenName) {
      case SCREEN_POLYGON:
        return <PolygonScreenContainer />;
      case SCREEN_CALENDAR:
        return <CalendarScreen />
      default:
        return '';
    }
  }

  return (
    <article className={className}>
      <h2>{props.title}</h2>
      { getContent() }
    </article>
  )
}
