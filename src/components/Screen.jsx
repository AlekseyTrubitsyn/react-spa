import React from 'react';
import Polygon from './Polygon';
import PolygonContainer from '../containers/PolygonContainer';

function Screen(props) {
  const className = 'screen' + ((props.active) ? '' : ' screen-hide');
  const content = (props.id === 1) ? <PolygonContainer /> : '';

  return (
    <article className={className}>
      <h2>{props.title}</h2>
      {content}
    </article>
  )
}

export default Screen;
