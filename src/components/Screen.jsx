import React from 'react';

import PolygonScreen from './PolygonScreen';
import PolygonScreenContainer from '../containers/PolygonScreenContainer';

const SCREEN_POLYGON = 'SCREEN_POLYGON';

export default function Screen(props) {
  const className = 'screen' + ((props.active) ? '' : ' screen-hide');

  function getContent() {
    switch (props.screenName) {
      case SCREEN_POLYGON:
        return <PolygonScreenContainer />;
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
