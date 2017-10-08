import React from 'react';

import PolygonScreenContainer from '../containers/PolygonScreenContainer';
import CalendarScreen from './CalendarScreen/CalendarWidget';
import CatalogScreen from './CatalogScreen';

const SCREEN_POLYGON = 'SCREEN_POLYGON';
const SCREEN_CALENDAR = 'SCREEN_CALENDAR';
const SCREEN_CATALOG = 'SCREEN_CATALOG';

export default function Screen(props) {
  const className = 'screen' + ((props.active) ? '' : ' screen-hide');

  function getContent() {
    switch (props.screenName) {
      case SCREEN_POLYGON:
        return <PolygonScreenContainer />;
      case SCREEN_CALENDAR:
        return <CalendarScreen />
      case SCREEN_CATALOG:
        return <CatalogScreen />
      default:
        return <p>Экран в разработке. Предложите свою идею!</p>;
    }
  }

  return (
    <article className={className}>
      <h2>{props.title}</h2>
      { getContent() }
    </article>
  )
}
