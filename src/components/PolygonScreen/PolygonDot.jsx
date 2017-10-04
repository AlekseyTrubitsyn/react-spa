import React from 'react';

function PolygonDot(props) {
  function handlePointDrag(event) {
    event.preventDefault();
    props.onPointDrag(props.id, props.currentValue, props.basePoint, event);
  }

  return (
    <circle
      r="4"
      cx={ props.cx }
      cy={ props.cy }
      className={ props.className }
      fill={ props.fill }
      onMouseDown={ handlePointDrag }
    />
  )
}

export default PolygonDot;
